/**
 * Railgun API Client
 *
 * Handles all communication with the Railgun API.
 * Manages JWT tokens in memory (never localStorage — XSS protection).
 * Auto-refreshes expired access tokens using the refresh token.
 *
 * SECURITY:
 * - Tokens stored in memory only (cleared on tab close)
 * - Refresh token rotation on every refresh
 * - No token in URL parameters
 * - All requests over HTTPS
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://railgun-api.fly.dev/api/v1';

// ─── Token Storage (in-memory only) ───────────────────────────────
let accessToken: string | null = null;
let refreshToken: string | null = null;
let tokenExpiresAt: number = 0;

// ─── Token Management ─────────────────────────────────────────────

export function setTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;

  // Decode JWT to get expiry (no verification needed — server validates)
  try {
    const payload = JSON.parse(atob(access.split('.')[1]));
    // Refresh 60s before actual expiry
    tokenExpiresAt = (payload.exp || 0) * 1000 - 60_000;
  } catch {
    tokenExpiresAt = Date.now() + 14 * 60 * 1000; // fallback: 14 min
  }
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
  tokenExpiresAt = 0;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function isAuthenticated(): boolean {
  return !!accessToken;
}

// ─── Token Refresh ────────────────────────────────────────────────

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  if (!refreshToken) return false;

  // Deduplicate concurrent refresh attempts
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        clearTokens();
        return false;
      }

      const data = await res.json();
      setTokens(data.accessToken, data.refreshToken);
      return true;
    } catch {
      clearTokens();
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ─── API Fetch Wrapper ────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  skipAuth?: boolean;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, skipAuth, ...init } = options;

  // Auto-refresh if token is about to expire
  if (!skipAuth && accessToken && Date.now() >= tokenExpiresAt) {
    await refreshAccessToken();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  };

  if (!skipAuth && accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...init,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Handle 401 — try refresh once
  if (res.status === 401 && !skipAuth && refreshToken) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      const retryRes = await fetch(url, {
        ...init,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!retryRes.ok) {
        const errData = await retryRes.json().catch(() => ({}));
        throw new ApiError(retryRes.status, errData.message || retryRes.statusText, errData);
      }

      return retryRes.json();
    }

    // Refresh failed — redirect to login
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new ApiError(401, 'Session expired');
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new ApiError(res.status, errData.message || res.statusText, errData);
  }

  // Handle 204 No Content
  if (res.status === 204) return {} as T;

  return res.json();
}

// ─── Auth API ─────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterResponse {
  user: AuthUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  recoveryCodes: string[];
}

export const authApi = {
  login: (username: string, password: string) =>
    apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { username, password },
      skipAuth: true,
    }),

  register: (username: string, password: string, email?: string, displayName?: string) =>
    apiFetch<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: { username, password, email, displayName },
      skipAuth: true,
    }),

  logout: () =>
    apiFetch('/auth/logout', { method: 'POST' }),

  refresh: () => refreshAccessToken(),
};

// ─── Mail API ─────────────────────────────────────────────────────

export interface MailAddress {
  address: string | null;
  isActive: boolean;
}

export interface MailMessage {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  isRead?: boolean;
  isInternal?: boolean;
  threadId?: string;
  status?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SendMailDto {
  to: string;
  subject: string;
  body: string;
  replyToMessageId?: string;
}

export const mailApi = {
  getAddress: () =>
    apiFetch<MailAddress>('/mail/address'),

  claimAddress: (username: string) =>
    apiFetch<{ address: string }>('/mail/address', {
      method: 'POST',
      body: { username },
    }),

  getInbox: (limit = 50, before?: string) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (before) params.set('before', before);
    return apiFetch<{ messages: MailMessage[] }>(`/mail/inbox?${params}`);
  },

  getSent: (limit = 50, before?: string) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (before) params.set('before', before);
    return apiFetch<{ messages: MailMessage[] }>(`/mail/sent?${params}`);
  },

  getMessage: (id: string) =>
    apiFetch<MailMessage>(`/mail/messages/${id}`),

  getThread: (threadId: string) =>
    apiFetch<{ messages: MailMessage[] }>(`/mail/threads/${threadId}`),

  send: (dto: SendMailDto) =>
    apiFetch<{ id: string; status: string; isInternal: boolean; threadId: string }>(
      '/mail/send',
      { method: 'POST', body: dto },
    ),
};

// ─── Realtime API (Supabase Broadcast transport) ──────────────────

export interface SendMessageDto {
  channelId?: string;
  recipientId?: string;
  encryptedEnvelope?: string;
  clientNonce: string;
  protocolVersion?: number;
  replyToId?: string;
  deviceEnvelopes?: { deviceId: number; encryptedEnvelope: string }[];
}

export interface SendMessageResponse {
  success: boolean;
  messageId: string;
  conversationId?: string;
  conversationType?: string;
  status: string;
  duplicate?: boolean;
  createdAt?: string;
}

export const realtimeApi = {
  /** Send a message (server relays + broadcasts via Supabase) */
  send: (dto: SendMessageDto) =>
    apiFetch<SendMessageResponse>('/realtime/send', {
      method: 'POST',
      body: dto,
    }),

  /** Send typing indicator */
  typing: (channelId?: string, conversationId?: string, isTyping = true) =>
    apiFetch<{ success: boolean }>('/realtime/typing', {
      method: 'POST',
      body: { channelId, conversationId, isTyping },
    }),

  /** Update presence status */
  presence: (status: string) =>
    apiFetch<{ success: boolean }>('/realtime/presence', {
      method: 'POST',
      body: { status },
    }),
};

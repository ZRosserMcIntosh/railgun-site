/**
 * Supabase Realtime Client — Broadcast-Only Transport
 *
 * This module provides the client-side Supabase Realtime connection for
 * receiving real-time messages via Broadcast channels.
 *
 * PRIVACY:
 * - Uses Broadcast-only (no Postgres Changes subscriptions)
 * - All payloads are E2E encrypted envelopes
 * - Channel topics use opaque HMAC-derived IDs
 * - Supabase sees transport metadata only
 *
 * ARCHITECTURE:
 * - Client subscribes to their user topic + active conversation/channel topics
 * - Server pushes messages via Supabase REST Broadcast
 * - Messages arrive instantly via WebSocket from Supabase servers
 * - No Socket.IO dependency required
 */
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';

// ─── Configuration ────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// ─── Singleton Client ─────────────────────────────────────────────

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase Realtime not configured — NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      realtime: {
        params: {
          apikey: SUPABASE_ANON_KEY,
        },
      },
    });
  }

  return supabaseClient;
}

// ─── Broadcast Event Types ────────────────────────────────────────

export enum BroadcastEvent {
  MESSAGE = 'message',
  MESSAGE_ACK = 'message:ack',
  TYPING_START = 'typing:start',
  TYPING_STOP = 'typing:stop',
  PRESENCE_UPDATE = 'presence:update',
  MESSAGE_DELETE = 'message:delete',
  MESSAGE_PIN = 'message:pin',
  MESSAGE_UNPIN = 'message:unpin',
  REACTION_ADD = 'reaction:add',
  REACTION_REMOVE = 'reaction:remove',
  CALL_INITIATE = 'call:initiate',
  CALL_OFFER = 'call:offer',
  CALL_ANSWER = 'call:answer',
  CALL_ICE_CANDIDATE = 'call:ice',
  CALL_REJECT = 'call:reject',
  CALL_END = 'call:end',
  CALL_RINGING = 'call:ringing',
  CALL_MUTE_TOGGLE = 'call:mute',
  CALL_VIDEO_TOGGLE = 'call:video',
  DC_OFFER = 'dc:offer',
  DC_ANSWER = 'dc:answer',
  DC_ICE_CANDIDATE = 'dc:ice',
  MAIL_NEW = 'mail:new',
  MAIL_STATUS = 'mail:status',
  SYNC_MESSAGES = 'sync:messages',
}

// ─── Topic Helpers ────────────────────────────────────────────────

/** DM conversation topic */
export function dmTopic(conversationId: string): string {
  return `dm:${conversationId}`;
}

/** Channel topic */
export function channelTopic(channelId: string): string {
  return `ch:${channelId}`;
}

/** User-specific topic (for direct-to-user events) */
export function userTopic(userId: string): string {
  return `user:${userId}`;
}

/** Device-specific topic */
export function deviceTopic(userId: string, deviceId: number): string {
  return `device:${userId}:${deviceId}`;
}

// ─── Channel Manager ──────────────────────────────────────────────

type EventHandler = (payload: { event: string; payload: Record<string, unknown> }) => void;

/** Active channel subscriptions */
const activeChannels: Map<string, RealtimeChannel> = new Map();

/**
 * Subscribe to a Supabase Realtime Broadcast channel.
 *
 * @param topic - Channel topic (e.g., "user:abc", "dm:xyz", "ch:123")
 * @param events - Map of event names to handlers
 * @returns Cleanup function to unsubscribe
 */
export function subscribeToBroadcast(
  topic: string,
  events: Record<string, EventHandler>,
): () => void {
  const client = getSupabaseClient();
  if (!client) {
    return () => {};
  }

  // Don't duplicate subscriptions
  if (activeChannels.has(topic)) {
    return () => unsubscribeFromBroadcast(topic);
  }

  const channel = client.channel(topic);

  // Register event handlers
  for (const [event, handler] of Object.entries(events)) {
    channel.on('broadcast', { event }, handler);
  }

  // Subscribe
  channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log(`[Realtime] Subscribed to ${topic}`);
    } else if (status === 'CHANNEL_ERROR') {
      console.error(`[Realtime] Error subscribing to ${topic}`);
    }
  });

  activeChannels.set(topic, channel);

  return () => unsubscribeFromBroadcast(topic);
}

/**
 * Unsubscribe from a Broadcast channel.
 */
export function unsubscribeFromBroadcast(topic: string): void {
  const client = getSupabaseClient();
  const channel = activeChannels.get(topic);

  if (client && channel) {
    client.removeChannel(channel);
    activeChannels.delete(topic);
    console.log(`[Realtime] Unsubscribed from ${topic}`);
  }
}

/**
 * Unsubscribe from all active channels.
 * Call this on logout or page unload.
 */
export function unsubscribeAll(): void {
  const client = getSupabaseClient();
  if (!client) return;

  activeChannels.forEach((channel, topic) => {
    client.removeChannel(channel);
    console.log(`[Realtime] Unsubscribed from ${topic}`);
  });
  activeChannels.clear();
}

/**
 * Get the number of active channel subscriptions.
 */
export function getActiveChannelCount(): number {
  return activeChannels.size;
}

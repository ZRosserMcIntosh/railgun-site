/**
 * Railgun Auth Context
 *
 * Provides authentication state to the entire app.
 * Tokens are stored in memory only — never localStorage.
 *
 * SECURITY:
 * - No persistent token storage (XSS cannot steal tokens)
 * - Session ends when tab closes (by design)
 * - Automatic token refresh before expiry
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  authApi,
  setTokens,
  clearTokens,
  isAuthenticated as checkAuth,
  type AuthUser,
  type RegisterResponse,
} from '@/lib/api';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    email?: string,
    displayName?: string,
  ) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check if we have tokens in memory on mount
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isAuthenticated: checkAuth(),
    }));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await authApi.login(username, password);
    setTokens(res.tokens.accessToken, res.tokens.refreshToken);
    setState({
      user: res.user,
      isLoading: false,
      isAuthenticated: true,
    });
  }, []);

  const register = useCallback(
    async (
      username: string,
      password: string,
      email?: string,
      displayName?: string,
    ) => {
      const res = await authApi.register(username, password, email, displayName);
      setTokens(res.tokens.accessToken, res.tokens.refreshToken);
      setState({
        user: res.user,
        isLoading: false,
        isAuthenticated: true,
      });
      return res;
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors — we clear tokens regardless
    }
    clearTokens();
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

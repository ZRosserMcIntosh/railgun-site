'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ApiError } from '@/lib/api';
import {
  Shield,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Recovery codes modal state
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [acknowledgedCodes, setAcknowledgedCodes] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,32}$/.test(username)) {
      setError(
        'Username must be 3-32 characters, alphanumeric and underscores only.',
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await register(
        username,
        password,
        email || undefined,
        undefined,
      );
      setRecoveryCodes(res.recoveryCodes);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          setError('Username is already taken.');
        } else if (err.status === 429) {
          setError('Too many attempts. Please wait and try again.');
        } else {
          setError(err.message || 'Registration failed. Please try again.');
        }
      } else {
        setError('Unable to connect. Check your internet connection.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopyCodes() {
    if (!recoveryCodes) return;
    await navigator.clipboard.writeText(recoveryCodes.join('\n'));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  }

  function handleContinue() {
    router.push('/app/mail/inbox');
  }

  // ─── Recovery Codes Modal ───────────────────────────────────
  if (recoveryCodes) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-primary px-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/20">
              <Shield className="h-8 w-8 text-warning" />
            </div>
            <h1 className="text-2xl font-bold">Save Your Recovery Codes</h1>
            <p className="mt-2 text-sm text-foreground-secondary">
              These codes are the <strong>only way</strong> to recover your
              account if you lose your password. They will{' '}
              <strong>never be shown again</strong>.
            </p>
          </div>

          <div className="rounded-lg border border-foreground-secondary/20 bg-background-secondary p-4">
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              {recoveryCodes.map((code, i) => (
                <div
                  key={i}
                  className="rounded bg-background-primary px-3 py-2 text-center"
                >
                  {code}
                </div>
              ))}
            </div>

            <button
              onClick={handleCopyCodes}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-foreground-secondary/20 py-2 text-sm text-foreground-secondary transition-colors hover:bg-background-elevated"
            >
              {copiedCodes ? (
                <>
                  <Check className="h-4 w-4 text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy all codes
                </>
              )}
            </button>
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={acknowledgedCodes}
              onChange={(e) => setAcknowledgedCodes(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-foreground-secondary/30 accent-accent"
            />
            <span className="text-sm text-foreground-secondary">
              I have saved these recovery codes in a secure location. I
              understand that if I lose them and my password, my account is
              permanently unrecoverable.
            </span>
          </label>

          <button
            onClick={handleContinue}
            disabled={!acknowledgedCodes}
            className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              Continue to Mail
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    );
  }

  // ─── Registration Form ──────────────────────────────────────
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-primary px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-foreground-secondary">
            End-to-end encrypted from day one
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-4 text-sm text-error">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-medium text-foreground-secondary"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              autoFocus
              pattern="[a-zA-Z0-9_]{3,32}"
              className="w-full rounded-lg border border-foreground-secondary/20 bg-background-secondary px-4 py-3 text-foreground-primary placeholder-foreground-tertiary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="your_username"
            />
            <p className="mt-1 text-xs text-foreground-tertiary">
              3-32 characters, letters, numbers, and underscores
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground-secondary"
            >
              Email{' '}
              <span className="text-foreground-tertiary">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-lg border border-foreground-secondary/20 bg-background-secondary px-4 py-3 text-foreground-primary placeholder-foreground-tertiary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="you@example.com"
            />
            <p className="mt-1 text-xs text-foreground-tertiary">
              Only needed for password reset. We never sell or share it.
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground-secondary"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-lg border border-foreground-secondary/20 bg-background-secondary px-4 py-3 pr-12 text-foreground-primary placeholder-foreground-tertiary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-tertiary hover:text-foreground-secondary"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-foreground-secondary"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-foreground-secondary/20 bg-background-secondary px-4 py-3 text-foreground-primary placeholder-foreground-tertiary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !password || !confirmPassword}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Creating account…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-foreground-secondary">
          <p>
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-accent hover:text-accent-light"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-foreground-secondary/10 bg-background-secondary/50 p-4 text-center text-xs text-foreground-tertiary">
          <Shield className="mx-auto mb-2 h-4 w-4" />
          No phone number required. Email is optional.
          <br />
          Your password never leaves your device — we use Argon2id hashing.
        </div>
      </div>
    </div>
  );
}

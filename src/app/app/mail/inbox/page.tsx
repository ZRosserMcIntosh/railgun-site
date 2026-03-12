'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { mailApi, type MailMessage, type MailAddress, ApiError } from '@/lib/api';
import {
  Inbox,
  RefreshCw,
  Mail,
  MailOpen,
  Clock,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InboxPage() {
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [address, setAddress] = useState<MailAddress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [needsAddress, setNeedsAddress] = useState(false);
  const [claimUsername, setClaimUsername] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);

  const loadInbox = useCallback(async () => {
    try {
      const [addrRes, inboxRes] = await Promise.all([
        mailApi.getAddress(),
        mailApi.getInbox(),
      ]);

      setAddress(addrRes);

      if (!addrRes.address) {
        setNeedsAddress(true);
      } else {
        setMessages(inboxRes.messages);
        setNeedsAddress(false);
      }

      setError('');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load inbox.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadInbox();
  }, [loadInbox]);

  function handleRefresh() {
    setIsRefreshing(true);
    loadInbox();
  }

  async function handleClaimAddress() {
    if (!claimUsername.trim()) return;
    setIsClaiming(true);
    setError('');

    try {
      const res = await mailApi.claimAddress(claimUsername.trim());
      setAddress({ address: res.address, isActive: true });
      setNeedsAddress(false);
      const inboxRes = await mailApi.getInbox();
      setMessages(inboxRes.messages);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to claim address.');
      }
    } finally {
      setIsClaiming(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // ─── Claim Address Flow ─────────────────────────────────────
  if (needsAddress) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
            <Mail className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold">Claim Your Email Address</h2>
          <p className="mt-2 text-foreground-secondary">
            Choose your @railgun.chat email address
          </p>

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-4 text-left text-sm text-error">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={claimUsername}
                onChange={(e) => setClaimUsername(e.target.value)}
                placeholder="yourname"
                className="w-full rounded-lg border border-foreground-secondary/20 bg-background-secondary px-4 py-3 pr-28 text-foreground-primary placeholder-foreground-tertiary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                onKeyDown={(e) => e.key === 'Enter' && handleClaimAddress()}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground-tertiary">
                @railgun.chat
              </span>
            </div>
          </div>

          <button
            onClick={handleClaimAddress}
            disabled={isClaiming || !claimUsername.trim()}
            className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isClaiming ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Claim Address
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ─── Inbox View ─────────────────────────────────────────────
  return (
    <div className="h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-foreground-secondary/10 bg-background-primary/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Inbox className="h-5 w-5 text-accent" />
          <h1 className="text-xl font-bold">Inbox</h1>
          {address?.address && (
            <span className="rounded-md bg-background-secondary px-2 py-1 text-xs text-foreground-tertiary">
              {address.address}
            </span>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="rounded-lg p-2 text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground-primary"
          title="Refresh inbox"
          aria-label="Refresh inbox"
        >
          <RefreshCw
            className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
          />
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-6 mt-4 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-4 text-sm text-error">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Messages */}
      {messages.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center text-foreground-tertiary">
          <MailOpen className="mb-4 h-12 w-12" />
          <p className="text-lg font-medium">Your inbox is empty</p>
          <p className="mt-1 text-sm">
            Messages sent to {address?.address} will appear here.
          </p>
          <Link href="/app/mail/compose" className="btn-primary mt-6">
            <span className="flex items-center gap-2">
              Compose your first email
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-foreground-secondary/10">
          {messages.map((msg) => (
            <Link
              key={msg.id}
              href={`/app/mail/message/${msg.id}`}
              className={cn(
                'flex items-start gap-4 px-6 py-4 transition-colors hover:bg-background-secondary/50',
                !msg.isRead && 'bg-accent/5',
              )}
            >
              <div className="mt-1 flex-shrink-0">
                {msg.isRead ? (
                  <MailOpen className="h-4 w-4 text-foreground-tertiary" />
                ) : (
                  <Mail className="h-4 w-4 text-accent" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'truncate text-sm',
                      !msg.isRead
                        ? 'font-semibold text-foreground-primary'
                        : 'text-foreground-secondary',
                    )}
                  >
                    {msg.from}
                  </span>
                  <span className="flex flex-shrink-0 items-center gap-1 text-xs text-foreground-tertiary">
                    <Clock className="h-3 w-3" />
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
                <p
                  className={cn(
                    'mt-0.5 truncate text-sm',
                    !msg.isRead
                      ? 'font-medium text-foreground-primary'
                      : 'text-foreground-secondary',
                  )}
                >
                  {msg.subject || '(no subject)'}
                </p>
                <p className="mt-0.5 truncate text-xs text-foreground-tertiary">
                  {stripHtml(msg.body).slice(0, 120)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;

  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function stripHtml(html: string): string {
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
  }
  return html.replace(/<[^>]*>/g, '');
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { mailApi, type MailMessage, ApiError } from '@/lib/api';
import {
  Send,
  RefreshCw,
  MailOpen,
  Clock,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SentPage() {
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  async function loadSent() {
    try {
      const res = await mailApi.getSent();
      setMessages(res.messages);
      setError('');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load sent messages.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadSent();
  }, []);

  function handleRefresh() {
    setIsRefreshing(true);
    loadSent();
  }

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-foreground-secondary/10 bg-background-primary/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Send className="h-5 w-5 text-accent" />
          <h1 className="text-xl font-bold">Sent</h1>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="rounded-lg p-2 text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground-primary"
          title="Refresh sent"
          aria-label="Refresh sent"
        >
          <RefreshCw
            className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
          />
        </button>
      </div>

      {error && (
        <div className="mx-6 mt-4 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-4 text-sm text-error">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center text-foreground-tertiary">
          <MailOpen className="mb-4 h-12 w-12" />
          <p className="text-lg font-medium">No sent messages</p>
          <p className="mt-1 text-sm">Emails you send will appear here.</p>
          <Link href="/app/mail/compose" className="btn-primary mt-6">
            <span className="flex items-center gap-2">
              Compose an email
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
              className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-background-secondary/50"
            >
              <div className="mt-1 flex-shrink-0">
                <Send className="h-4 w-4 text-foreground-tertiary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm text-foreground-secondary">
                    To: {msg.to}
                  </span>
                  <span className="flex flex-shrink-0 items-center gap-1 text-xs text-foreground-tertiary">
                    <Clock className="h-3 w-3" />
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-foreground-primary">
                  {msg.subject || '(no subject)'}
                </p>
                <p className="mt-0.5 truncate text-xs text-foreground-tertiary">
                  {stripHtml(msg.body).slice(0, 120)}
                </p>
                {msg.status && (
                  <span
                    className={cn(
                      'mt-1 inline-block rounded-md px-1.5 py-0.5 text-xs font-medium',
                      msg.status === 'delivered'
                        ? 'bg-success/10 text-success'
                        : msg.status === 'failed'
                          ? 'bg-error/10 text-error'
                          : 'bg-warning/10 text-warning',
                    )}
                  >
                    {msg.status}
                  </span>
                )}
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

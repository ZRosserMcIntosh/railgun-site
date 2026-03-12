'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mailApi, type MailMessage, ApiError } from '@/lib/api';
import DOMPurify from 'dompurify';
import {
  ArrowLeft,
  Reply,
  Clock,
  Shield,
  AlertCircle,
  Loader2,
  Mail,
} from 'lucide-react';

export default function MessagePage() {
  const params = useParams();
  const router = useRouter();
  const messageId = params.id as string;

  const [message, setMessage] = useState<MailMessage | null>(null);
  const [thread, setThread] = useState<MailMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const msg = await mailApi.getMessage(messageId);
        setMessage(msg);

        if (msg.threadId) {
          const threadRes = await mailApi.getThread(msg.threadId);
          setThread(threadRes.messages);
        }

        setError('');
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 404) {
            setError('Message not found.');
          } else {
            setError(err.message);
          }
        } else {
          setError('Failed to load message.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [messageId]);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-error" />
          <p className="text-lg font-medium text-error">{error}</p>
          <button
            onClick={() => router.back()}
            className="btn-secondary mt-4"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!message) return null;

  const isInternal =
    message.from?.endsWith('@railgun.chat') &&
    message.to?.endsWith('@railgun.chat');

  return (
    <div className="h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-foreground-secondary/10 bg-background-primary/80 px-6 py-4 backdrop-blur-xl">
        <button
          onClick={() => router.back()}
          className="rounded-lg p-2 text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground-primary"
          title="Go back"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold">
            {message.subject || '(no subject)'}
          </h1>
        </div>
        <Link
          href={`/app/mail/compose?to=${encodeURIComponent(message.from)}&subject=${encodeURIComponent('Re: ' + (message.subject || ''))}&replyTo=${message.id}`}
          className="btn-primary text-sm"
        >
          <Reply className="h-4 w-4" />
          Reply
        </Link>
      </div>

      {/* Message */}
      <div className="mx-auto max-w-3xl px-6 py-6">
        {/* Encryption badge */}
        {isInternal && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-xs text-success">
            <Shield className="h-3.5 w-3.5" />
            End-to-end encrypted — Railgun internal mail
          </div>
        )}

        {/* Metadata */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">{message.from}</p>
              <p className="text-xs text-foreground-tertiary">
                To: {message.to}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-xs text-foreground-tertiary">
              <Clock className="h-3 w-3" />
              {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          className="prose prose-invert max-w-none text-sm leading-relaxed text-foreground-primary"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.body) }}
        />

        {/* Thread */}
        {thread.length > 1 && (
          <div className="mt-8 border-t border-foreground-secondary/10 pt-6">
            <h3 className="mb-4 text-sm font-medium text-foreground-secondary">
              Thread ({thread.length} messages)
            </h3>
            <div className="space-y-4">
              {thread
                .filter((m) => m.id !== message.id)
                .map((m) => (
                  <Link
                    key={m.id}
                    href={`/app/mail/message/${m.id}`}
                    className="block rounded-lg border border-foreground-secondary/10 p-4 transition-colors hover:bg-background-secondary/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{m.from}</span>
                      <span className="text-xs text-foreground-tertiary">
                        {new Date(m.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-foreground-tertiary">
                      {m.subject || '(no subject)'}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * HTML sanitization for email body display using DOMPurify.
 *
 * SECURITY: DOMPurify is the industry-standard HTML sanitizer.
 * Strips all XSS vectors including script injection, event handlers,
 * data: URIs, javascript: URIs, and dangerous tags.
 */
function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // SSR fallback — strip all HTML tags
    return html.replace(/<[^>]*>/g, '');
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'u', 'em', 'strong', 'a', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span', 'div',
      'img', 'sup', 'sub', 'small',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'width', 'height',
      'class', 'style', 'colspan', 'rowspan',
    ],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'],
    // Force all links to open in new tab
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}

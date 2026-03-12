'use client';

import { useState, type FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mailApi, ApiError } from '@/lib/api';
import {
  PenSquare,
  Send,
  AlertCircle,
  Loader2,
  CheckCircle,
} from 'lucide-react';

function ComposeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [to, setTo] = useState(searchParams.get('to') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [body, setBody] = useState(searchParams.get('body') || '');
  const replyToMessageId = searchParams.get('replyTo') || undefined;

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!to.trim()) {
      setError('Recipient is required.');
      return;
    }

    if (!body.trim()) {
      setError('Message body cannot be empty.');
      return;
    }

    setIsSending(true);

    try {
      await mailApi.send({
        to: to.trim(),
        subject: subject.trim(),
        body: body.trim(),
        replyToMessageId,
      });
      setSent(true);
      setTimeout(() => router.push('/app/mail/sent'), 1500);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to send. Please try again.');
      }
    } finally {
      setIsSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-success" />
          <h2 className="text-xl font-bold">Message Sent</h2>
          <p className="mt-1 text-sm text-foreground-secondary">
            Redirecting to sent folder…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-foreground-secondary/10 bg-background-primary/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <PenSquare className="h-5 w-5 text-accent" />
          <h1 className="text-xl font-bold">Compose</h1>
        </div>
      </div>

      <form onSubmit={handleSend} className="mx-auto max-w-3xl px-6 py-6">
        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-4 text-sm text-error">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center border-b border-foreground-secondary/10 py-3">
          <label
            htmlFor="to"
            className="w-16 flex-shrink-0 text-sm font-medium text-foreground-secondary"
          >
            To
          </label>
          <input
            id="to"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            autoFocus
            className="flex-1 bg-transparent text-sm text-foreground-primary placeholder-foreground-tertiary outline-none"
            placeholder="user@railgun.chat or user@example.com"
          />
        </div>

        <div className="flex items-center border-b border-foreground-secondary/10 py-3">
          <label
            htmlFor="subject"
            className="w-16 flex-shrink-0 text-sm font-medium text-foreground-secondary"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground-primary placeholder-foreground-tertiary outline-none"
            placeholder="Subject"
          />
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={16}
          className="mt-4 w-full resize-none bg-transparent text-sm leading-relaxed text-foreground-primary placeholder-foreground-tertiary outline-none"
          placeholder="Write your message…"
        />

        <div className="flex items-center justify-end gap-4 border-t border-foreground-secondary/10 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg px-4 py-2 text-sm text-foreground-secondary transition-colors hover:bg-background-secondary"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isSending || !to.trim() || !body.trim()}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ComposePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      }
    >
      <ComposeForm />
    </Suspense>
  );
}

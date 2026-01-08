'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from '@/i18n/provider';

export function Waitlist() {
  const { t } = useTranslations('waitlist');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      return;
    }

    // TODO: Replace with your actual API endpoint or service
    // For now, we'll simulate a successful submission
    try {
      // Example: await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email }) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="waitlist" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent-light">
            <Mail className="h-4 w-4" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">
            {t('subtitle')}
          </p>

          {/* Waitlist Form */}
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="mx-auto max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  disabled={status === 'loading' || status === 'success'}
                  className="flex-1 rounded-lg border border-foreground-secondary/20 bg-background-secondary px-4 py-3 text-foreground-primary placeholder:text-foreground-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="btn-primary whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'loading' ? t('submitting') : t('submit')}
                </button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{t('success')}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{t('error')}</span>
                </div>
              )}
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-foreground-secondary/10 bg-background-secondary p-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="font-semibold">Request Access</h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                Join the waitlist to get on our radar
              </p>
            </div>
            <div className="rounded-xl border border-foreground-secondary/10 bg-background-secondary p-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="font-semibold">Receive Invitation</h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                We&apos;ll send you an invite code via email
              </p>
            </div>
            <div className="rounded-xl border border-foreground-secondary/10 bg-background-secondary p-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="font-semibold">Get Started</h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                Download and start messaging securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

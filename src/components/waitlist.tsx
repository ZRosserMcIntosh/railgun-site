'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    // TODO: Replace with your actual API endpoint or service
    // For now, we'll simulate a successful submission
    try {
      // Example: await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email }) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thanks! You\'re on the waitlist. We\'ll be in touch soon.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="waitlist" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent-light">
            <Mail className="h-4 w-4" />
            <span>Invitation Only</span>
          </div>

          <h2 className="section-title">Join the Waitlist</h2>
          <p className="section-subtitle">
            Rail Gun is currently in private beta. Enter your email to request
            early access and be notified when we&apos;re ready for you.
          </p>

          {/* Waitlist Form */}
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="mx-auto max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === 'loading' || status === 'success'}
                  className="flex-1 rounded-lg border border-foreground-secondary/20 bg-background-secondary px-4 py-3 text-foreground-primary placeholder:text-foreground-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="btn-primary whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{message}</span>
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

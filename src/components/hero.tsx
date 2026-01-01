'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, Zap } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[128px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent-light">
            <Shield className="h-4 w-4" />
            <span>Signal Protocol + Curve25519 + ChaCha20-Poly1305</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Private messaging.
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Zero compromises.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-foreground-secondary sm:text-xl">
            Rail Gun is an end-to-end encrypted messaging app that keeps your
            conversations private. Your keys never leave your device.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#download"
              className="btn-primary group w-full sm:w-auto"
            >
              Download Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={siteConfig.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              Open Web App
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <Lock className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">X3DH + Double Ratchet</span>
              <span className="text-sm text-foreground-secondary">
                Signal Protocol key exchange
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">Curve25519</span>
              <span className="text-sm text-foreground-secondary">
                Modern elliptic curve cryptography
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">ChaCha20-Poly1305</span>
              <span className="text-sm text-foreground-secondary">
                AEAD authenticated encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function Cta() {
  return (
    <section className="bg-gradient-to-b from-background-primary to-accent/10 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-accent px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent-hover/50 via-transparent to-accent-hover/50" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />

          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready for private messaging?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Join our exclusive waitlist for early access. Be among the first to 
              experience truly private communications.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-accent transition-all hover:bg-white/90"
              >
                Request Early Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#security"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

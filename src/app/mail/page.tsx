import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, Shield, Eye, EyeOff, Lock, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Railgun Mail — Encrypted Email',
  description:
    'Get an @railgun.chat encrypted email address. Zero tracking for internal mail, tracking protection for external. Included with Railgun+ Pro.',
  alternates: {
    canonical: 'https://railgun.app/mail',
  },
  openGraph: {
    title: 'Railgun Mail — Encrypted Email',
    description:
      'Your @railgun.chat address. End-to-end encrypted email with tracking protection.',
    url: 'https://railgun.app/mail',
  },
};

const features = [
  {
    icon: Lock,
    title: 'End-to-End Encrypted',
    description:
      'Railgun-to-Railgun emails are encrypted with the same Signal Protocol used in chat. The server never sees plaintext.',
  },
  {
    icon: EyeOff,
    title: 'Zero Internal Tracking',
    description:
      'Messages between @railgun.chat addresses have zero tracking pixels, zero link wrapping, zero metadata leakage.',
  },
  {
    icon: Eye,
    title: 'External Mail Tracking Protection',
    description:
      'When you receive email from the outside world, Railgun strips tracking pixels and rewrites tracker links — so senders can\'t spy on you.',
  },
  {
    icon: Shield,
    title: 'Pseudonymous Identity',
    description:
      'Your @railgun.chat address doesn\'t need to be tied to your real name. Communicate without exposing your identity.',
  },
  {
    icon: Zap,
    title: 'Built Into the App',
    description:
      'No separate email client needed. Send, receive, and search encrypted email right from the Railgun desktop app.',
  },
  {
    icon: Mail,
    title: 'Real Email, Real Interoperability',
    description:
      'Send and receive from any email address — Gmail, Outlook, ProtonMail, anything. Your @railgun.chat address is a real SMTP/IMAP address.',
  },
];

const comparisonData = [
  { feature: 'E2E Encrypted (internal)', railgun: true, gmail: false, protonmail: true, outlook: false },
  { feature: 'Zero tracking pixels (internal)', railgun: true, gmail: false, protonmail: true, outlook: false },
  { feature: 'Tracking pixel stripping (external)', railgun: true, gmail: false, protonmail: true, outlook: false },
  { feature: 'No real name required', railgun: true, gmail: false, protonmail: true, outlook: false },
  { feature: 'Integrated with E2EE chat', railgun: true, gmail: false, protonmail: false, outlook: false },
  { feature: 'Pseudonymous billing', railgun: true, gmail: false, protonmail: false, outlook: false },
  { feature: 'Open source client', railgun: true, gmail: false, protonmail: true, outlook: false },
];

export default function MailPage() {
  return (
    <main className="min-h-screen bg-background-primary py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm text-brand">
            <Mail className="h-4 w-4" />
            <span>Included with Railgun+ Pro</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight">
            Railgun Mail
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
            Your <span className="font-mono text-foreground-primary">@railgun.chat</span> encrypted
            email address. Same app, same encryption, no compromises.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-lg bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand/90"
            >
              Get Railgun+ Pro
            </Link>
            <Link
              href="/download"
              className="rounded-lg border border-border px-6 py-3 font-medium text-foreground-primary transition-colors hover:bg-background-secondary"
            >
              Download Railgun
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Email, but private
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-background-secondary p-6"
              >
                <feature.icon className="mb-4 h-8 w-8 text-brand" />
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-foreground-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold">How it works</h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Subscribe to Railgun+ Pro',
                desc: 'Pseudonymous billing — Stripe never sees your username or email.',
              },
              {
                step: '2',
                title: 'Choose your @railgun.chat address',
                desc: 'Pick any available username. No phone number or real name required.',
              },
              {
                step: '3',
                title: 'Send & receive encrypted email',
                desc: 'Internal: full E2E encryption. External: tracking protection + TLS.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 rounded-xl border border-border bg-background-secondary p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-foreground-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold">
            How Railgun Mail compares
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background-secondary">
                  <th className="px-4 py-3 text-left font-medium text-foreground-secondary">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-brand">
                    Railgun Mail
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-foreground-secondary">
                    Gmail
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-foreground-secondary">
                    ProtonMail
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-foreground-secondary">
                    Outlook
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground-primary">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.railgun ? (
                        <CheckCircle className="mx-auto h-5 w-5 text-success" />
                      ) : (
                        <span className="text-foreground-secondary">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.gmail ? (
                        <CheckCircle className="mx-auto h-5 w-5 text-success" />
                      ) : (
                        <span className="text-foreground-secondary">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.protonmail ? (
                        <CheckCircle className="mx-auto h-5 w-5 text-success" />
                      ) : (
                        <span className="text-foreground-secondary">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.outlook ? (
                        <CheckCircle className="mx-auto h-5 w-5 text-success" />
                      ) : (
                        <span className="text-foreground-secondary">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-brand/20 to-brand/5 p-12">
            <h2 className="text-3xl font-bold">Ready for private email?</h2>
            <p className="mx-auto mt-3 max-w-xl text-foreground-secondary">
              Get your @railgun.chat address today. Included with every Railgun+ Pro subscription.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-block rounded-lg bg-brand px-8 py-3 font-medium text-white transition-colors hover:bg-brand/90"
            >
              See Pricing
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

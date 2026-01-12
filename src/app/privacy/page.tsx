import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Rail Gun Privacy Policy - How we protect your data and privacy.',
  alternates: {
    canonical: 'https://railgun.app/privacy',
  },
  openGraph: {
    url: 'https://railgun.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background-primary py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-foreground-secondary">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-invert mt-12 max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
            <p className="text-foreground-secondary">
              Rail Gun is built with privacy as a core principle. We use end-to-end
              encryption to ensure that your messages can only be read by you and
              your intended recipients. We cannot read your messages, and we
              minimize the data we collect.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">What We Don&apos;t Collect</h2>
            <ul className="list-disc space-y-2 pl-6 text-foreground-secondary">
              <li>Message content (end-to-end encrypted)</li>
              <li>Contact lists</li>
              <li>Group membership details</li>
              <li>Profile information beyond what you share</li>
              <li>Location data</li>
              <li>Phone numbers (not required)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">What We May Collect</h2>
            <ul className="list-disc space-y-2 pl-6 text-foreground-secondary">
              <li>Account identifiers (username, device IDs)</li>
              <li>Encrypted message routing metadata</li>
              <li>IP addresses (temporarily, for rate limiting)</li>
              <li>Crash reports (opt-in, anonymized)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Encryption</h2>
            <p className="text-foreground-secondary">
              Rail Gun uses the Signal Protocol for end-to-end encryption. This
              means your messages are encrypted on your device before being sent
              and can only be decrypted by the intended recipient. Your encryption
              keys are generated and stored locally on your device—they never
              leave your device.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Data Retention</h2>
            <p className="text-foreground-secondary">
              We retain encrypted messages on our servers only until they are
              delivered to all recipients. Undelivered messages are automatically
              deleted after 30 days. Account data is retained until you delete
              your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
            <p className="text-foreground-secondary">
              You can delete your account and all associated data at any time from
              the app settings. Upon deletion, we remove your account identifiers
              and any stored encrypted messages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
            <p className="text-foreground-secondary">
              For privacy-related questions, please contact us at{' '}
              <a
                href="mailto:privacy@railgun.app"
                className="text-accent hover:underline"
              >
                privacy@railgun.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

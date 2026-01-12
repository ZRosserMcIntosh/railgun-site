import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Rail Gun Terms of Service - Guidelines for using our service.',
  alternates: {
    canonical: 'https://railgun.app/terms',
  },
  openGraph: {
    url: 'https://railgun.app/terms',
  },
};

export default function TermsPage() {
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

        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-foreground-secondary">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-invert mt-12 max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Acceptance of Terms</h2>
            <p className="text-foreground-secondary">
              By using Rail Gun, you agree to these Terms of Service. If you do not
              agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Use of Service</h2>
            <p className="text-foreground-secondary">
              Rail Gun is a secure messaging platform. You agree to use the service
              only for lawful purposes and in accordance with these terms. You are
              responsible for all activity that occurs under your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Prohibited Activities</h2>
            <p className="mb-4 text-foreground-secondary">You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6 text-foreground-secondary">
              <li>Use the service for any illegal purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to circumvent security measures</li>
              <li>Distribute malware or harmful content</li>
              <li>Impersonate others or create false identities</li>
              <li>Spam or send unsolicited messages</li>
              <li>Violate the rights of others</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Account Security</h2>
            <p className="text-foreground-secondary">
              You are responsible for maintaining the security of your account and
              devices. Rail Gun uses end-to-end encryption, which means your
              encryption keys are stored on your device. If you lose access to your
              device and keys, we cannot recover your messages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Intellectual Property</h2>
            <p className="text-foreground-secondary">
              Rail Gun and its original content, features, and functionality are
              owned by Rail Gun and are protected by international copyright,
              trademark, and other intellectual property laws. The Rail Gun client
              applications are open source under their respective licenses.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Disclaimer</h2>
            <p className="text-foreground-secondary">
              Rail Gun is provided &quot;as is&quot; without warranty of any kind. We do not
              guarantee that the service will be uninterrupted, secure, or error-free.
              Use of the service is at your own risk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
            <p className="text-foreground-secondary">
              To the fullest extent permitted by law, Rail Gun shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use of the service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Changes to Terms</h2>
            <p className="text-foreground-secondary">
              We may update these terms from time to time. We will notify users of
              any material changes. Continued use of the service after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
            <p className="text-foreground-secondary">
              For questions about these terms, please contact us at{' '}
              <a
                href="mailto:legal@railgun.app"
                className="text-accent hover:underline"
              >
                legal@railgun.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

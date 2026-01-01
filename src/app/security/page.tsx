import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Security',
  description: 'Rail Gun Security - Learn about our security practices and how to report vulnerabilities.',
};

export default function SecurityPage() {
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

        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm text-success">
          <Shield className="h-4 w-4" />
          <span>Security First</span>
        </div>

        <h1 className="text-4xl font-bold">Security</h1>
        <p className="mt-4 text-foreground-secondary">
          Security is at the core of everything we build at Rail Gun.
        </p>

        <div className="prose prose-invert mt-12 max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Encryption Protocol</h2>
            <p className="mb-4 text-foreground-secondary">
              Rail Gun uses the Signal Protocol, the same encryption standard
              trusted by billions of users worldwide. The protocol provides:
            </p>
            <ul className="space-y-3">
              {[
                'End-to-end encryption for all messages',
                'Perfect Forward Secrecy (PFS)',
                'Deniable authentication',
                'Future secrecy (post-compromise security)',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                  <span className="text-foreground-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Key Management</h2>
            <p className="text-foreground-secondary">
              Your identity keys are generated locally on your device using
              cryptographically secure random number generators. Private keys never
              leave your device and are stored in secure storage (Keychain on macOS,
              Credential Manager on Windows, libsecret on Linux).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Open Source</h2>
            <p className="mb-4 text-foreground-secondary">
              Rail Gun is open source, allowing security researchers and the
              community to audit our code. We believe transparency is essential
              for trust.
            </p>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              View on GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Reporting Vulnerabilities</h2>
            <p className="mb-4 text-foreground-secondary">
              We take security vulnerabilities seriously. If you discover a
              vulnerability, please report it responsibly:
            </p>
            <div className="rounded-lg bg-background-secondary p-6">
              <p className="mb-2 font-medium">Email:</p>
              <a
                href="mailto:security@railgun.app"
                className="text-accent hover:underline"
              >
                security@railgun.app
              </a>
              <p className="mt-4 text-sm text-foreground-secondary">
                Please include a detailed description of the vulnerability and steps
                to reproduce. We aim to respond within 48 hours and will work with
                you to resolve the issue.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Security Audits</h2>
            <p className="text-foreground-secondary">
              We are committed to regular security audits by independent third
              parties. Audit reports will be published here as they become
              available.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Best Practices</h2>
            <p className="mb-4 text-foreground-secondary">
              To maximize your security when using Rail Gun:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-foreground-secondary">
              <li>Always download Rail Gun from official sources</li>
              <li>Verify download checksums before installation</li>
              <li>Keep your operating system and Rail Gun updated</li>
              <li>Use strong device passwords/biometrics</li>
              <li>Verify safety numbers with your contacts</li>
              <li>Be cautious of phishing attempts</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

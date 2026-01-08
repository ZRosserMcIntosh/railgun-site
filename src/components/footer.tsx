import Link from 'next/link';
import { Shield, Github, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const footerLinks = {
  product: [
    { label: 'Download', href: '#download' },
    { label: 'Web App', href: siteConfig.webAppUrl, external: true },
    { label: 'Features', href: '#features' },
    { label: 'Security', href: '#security' },
  ],
  resources: [
    { label: 'Charter', href: '/charter' },
    { label: 'Documentation', href: siteConfig.links.docs, external: true },
    { label: 'Release Notes', href: siteConfig.links.releases, external: true },
    { label: 'Report Issues', href: siteConfig.links.issues, external: true },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-foreground-secondary/10 bg-background-primary">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-foreground-secondary">
              End-to-end encrypted with Signal Protocol (X3DH + Double Ratchet),
              Curve25519, and ChaCha20-Poly1305. Your keys, your privacy.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary transition-colors hover:text-foreground-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1 text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1 text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-foreground-secondary/10 pt-8">
          <p className="text-center text-sm text-foreground-secondary">
            © {new Date().getFullYear()} Rail Gun. Open source software. Not
            affiliated with Signal Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
}

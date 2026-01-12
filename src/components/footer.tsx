'use client';

import Link from 'next/link';
import { Shield, Github, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { useTranslations } from '@/i18n/provider';

export function Footer() {
  const { t } = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: t('links.download'), href: '/#download' },
      { label: t('links.webApp'), href: siteConfig.webAppUrl, external: true },
      { label: t('links.features'), href: '/#features' },
      { label: t('links.security'), href: '/#security' },
    ],
    resources: [
      { label: t('links.charter'), href: '/charter' },
      { label: t('links.documentation'), href: siteConfig.links.docs, external: true },
      { label: t('links.releaseNotes'), href: siteConfig.links.releases, external: true },
      { label: t('links.reportIssues'), href: siteConfig.links.issues, external: true },
    ],
    legal: [
      { label: t('links.privacy'), href: '/privacy' },
      { label: t('links.terms'), href: '/terms' },
      { label: t('links.security'), href: '/security' },
    ],
  };

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
              {t('description')}
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
            <h3 className="mb-4 text-sm font-semibold">{t('product')}</h3>
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
            <h3 className="mb-4 text-sm font-semibold">{t('resources')}</h3>
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
            <h3 className="mb-4 text-sm font-semibold">{t('legal')}</h3>
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
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LogIn, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from '@/i18n/provider';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const { t } = useTranslations('nav');
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#download', label: 'Download' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/mail', label: 'Mail' },
    { href: '/charter', label: t('charter') },
    { href: '/node-mode', label: t('nodeMode') },
    { href: '/#features', label: t('features') },
    { href: '/#infrastructure', label: t('infrastructure') },
    { href: '/#security', label: t('security') },
    { href: '/encryption', label: 'Crypto' },
    { href: '/threat-detection', label: 'Threat Shield' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-foreground-secondary/10 bg-background-primary/80 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent p-1.5">
            <Image
              src="/logo.png"
              alt="Rail Gun"
              width={32}
              height={32}
              className="h-full w-full brightness-0 invert"
              priority
            />
          </div>
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          {isAuthenticated ? (
            <Link
              href="/app/mail/inbox"
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <Mail className="h-4 w-4" />
              Open Mail
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-foreground-secondary transition-colors hover:bg-background-secondary md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-foreground-secondary/10 bg-background-primary/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-foreground-secondary transition-colors hover:text-foreground-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher className="w-full" />
            {isAuthenticated ? (
              <Link
                href="/app/mail/inbox"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Mail className="h-4 w-4" />
                Open Mail
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

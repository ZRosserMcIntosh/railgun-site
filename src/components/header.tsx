'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  LogIn,
  Mail,
  ChevronDown,
  Shield,
  Radio,
  Lock,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from '@/i18n/provider';
import { useAuth } from '@/lib/auth-context';

const featureItems = [
  { href: '/mail', label: 'Mail', icon: Mail, desc: 'Encrypted email' },
  { href: '/threat-detection', label: 'Threat Shield', icon: Shield, desc: 'AI threat detection' },
  { href: '/node-mode', label: 'Node Mode', icon: Radio, desc: 'P2P mesh network' },
  { href: '/encryption', label: 'Crypto', icon: Lock, desc: 'Signal Protocol + X3DH' },
  { href: '/#infrastructure', label: 'Infrastructure', icon: Server, desc: 'Horizontal scaling' },
  { href: '/#security', label: 'Security', icon: ShieldCheck, desc: 'Zero-trust architecture' },
];

export function Header() {
  const { t } = useTranslations('nav');
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { href: '/#download', label: 'Download' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/charter', label: t('charter') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
        setIsFeaturesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleFeaturesEnter() {
    if (featuresTimeoutRef.current) clearTimeout(featuresTimeoutRef.current);
    setIsFeaturesOpen(true);
  }

  function handleFeaturesLeave() {
    featuresTimeoutRef.current = setTimeout(() => setIsFeaturesOpen(false), 150);
  }

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-foreground-secondary/10 bg-background-primary/80 backdrop-blur-xl'
          : 'bg-transparent',
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
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
            >
              {link.label}
            </Link>
          ))}

          {/* Features Dropdown */}
          <div
            ref={featuresRef}
            className="relative"
            onMouseEnter={handleFeaturesEnter}
            onMouseLeave={handleFeaturesLeave}
          >
            <button
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              className="flex items-center gap-1 text-sm text-foreground-secondary transition-colors hover:text-foreground-primary"
              aria-expanded={isFeaturesOpen}
              aria-haspopup="true"
            >
              Features
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isFeaturesOpen && 'rotate-180',
                )}
              />
            </button>

            {/* Dropdown panel */}
            {isFeaturesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border border-foreground-secondary/10 bg-background-primary/95 p-2 shadow-xl backdrop-blur-xl">
                {featureItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsFeaturesOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-background-secondary"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground-primary">
                        {item.label}
                      </p>
                      <p className="text-xs text-foreground-tertiary">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

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
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Features Accordion */}
            <button
              onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground-primary"
            >
              Features
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isMobileFeaturesOpen && 'rotate-180',
                )}
              />
            </button>

            {isMobileFeaturesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-foreground-secondary/10 pl-3">
                {featureItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground-primary"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileFeaturesOpen(false);
                    }}
                  >
                    <item.icon className="h-4 w-4 text-accent" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-2 border-t border-foreground-secondary/10 pt-3">
              <LanguageSwitcher className="w-full" />
            </div>

            <div className="mt-2">
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
        </div>
      )}
    </header>
  );
}

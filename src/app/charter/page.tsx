'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Shield, Scale, Users, Lock, Globe, Eye, Heart, FileText, Lightbulb, Target } from 'lucide-react';
import { useTranslations } from '@/i18n/provider';

const iconMap = {
  Heart,
  Globe,
  FileText,
  Lock,
  Shield,
  Scale,
  Target,
  Eye,
  Lightbulb,
  Users,
};

const principleIcons = [Heart, Globe, FileText, Lock, Shield, Scale, Target, Eye, Lightbulb, Users];

export default function CharterPage() {
  const { t } = useTranslations('charter');

  const principles = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    icon: principleIcons[i],
    title: t(`principles.${i + 1}.title`),
    description: t(`principles.${i + 1}.description`),
  }));

  const whatWeAreNotItems = [
    t('whatWeAreNot.items.0'),
    t('whatWeAreNot.items.1'),
    t('whatWeAreNot.items.2'),
    t('whatWeAreNot.items.3'),
    t('whatWeAreNot.items.4'),
  ];

  const commitments = [
    {
      title: t('commitments.items.audit.title'),
      description: t('commitments.items.audit.description'),
    },
    {
      title: t('commitments.items.transparency.title'),
      description: t('commitments.items.transparency.description'),
    },
    {
      title: t('commitments.items.marketing.title'),
      description: t('commitments.items.marketing.description'),
    },
    {
      title: t('commitments.items.governance.title'),
      description: t('commitments.items.governance.description'),
    },
  ];

  return (
    <main className="relative">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
            <Shield className="h-4 w-4" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg text-foreground-secondary sm:text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Preamble */}
      <section className="py-12 sm:py-16 bg-background-secondary">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-invert mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t('preamble.title')}</h2>
            <p className="text-foreground-secondary leading-relaxed">
              {t('preamble.p1')}
            </p>
            <p className="text-foreground-secondary leading-relaxed mt-4">
              {t('preamble.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('principlesTitle')}
            </h2>
            <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
              {t('principlesSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="card group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <principle.icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-foreground-tertiary">
                        {String(principle.number).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-semibold">{principle.title}</h3>
                    </div>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Are Not */}
      <section className="py-16 sm:py-24 bg-background-secondary">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('whatWeAreNot.title')}</h2>
          <div className="space-y-4">
            {whatWeAreNotItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-foreground-secondary">
                <div className="h-1.5 w-1.5 rounded-full bg-error flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('commitments.title')}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {commitments.map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-background-elevated p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-background-secondary">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-foreground-secondary italic mb-8">
            &ldquo;{t('closing')}&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://github.com/ZRosserMcIntosh/railgun/blob/main/docs/CHARTER.md"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t('viewOnGithub')}
            </Link>
            <Link
              href="/security"
              className="btn-secondary"
            >
              {t('securityDetails')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

'use client';

import { Monitor, Smartphone, Globe } from 'lucide-react';
import { useTranslations } from '@/i18n/provider';

export function Platforms() {
  const { t } = useTranslations('platforms');

  const platforms = [
    {
      icon: Monitor,
      title: t('mac'),
      description: `macOS, Windows, Linux`,
      status: t('download'),
      statusColor: 'text-success',
      available: true,
    },
    {
      icon: Globe,
      title: t('web'),
      description: t('web'),
      status: t('comingSoon'),
      statusColor: 'text-warning',
      available: false,
    },
    {
      icon: Smartphone,
      title: `${t('ios')} & ${t('android')}`,
      description: `${t('ios')}, ${t('android')}`,
      status: t('comingSoon'),
      statusColor: 'text-foreground-secondary',
      available: false,
    },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">
            {t('subtitle')}
          </p>
        </div>

        {/* Platform Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.title}
                className={`card text-center ${
                  !platform.available ? 'opacity-75' : ''
                }`}
              >
                <div className="mx-auto mb-4 inline-flex rounded-xl bg-background-elevated p-4">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{platform.title}</h3>
                <p className="mb-4 text-sm text-foreground-secondary">
                  {platform.description}
                </p>
                <span className={`text-sm font-medium ${platform.statusColor}`}>
                  {platform.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

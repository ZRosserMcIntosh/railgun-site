'use client';

import {
  Shield,
  Lock,
  Users,
  MessageSquare,
  Monitor,
  Code,
  Key,
  Eye,
} from 'lucide-react';
import { useTranslations } from '@/i18n/provider';

const featureIcons = {
  signal: Shield,
  curve: Key,
  chacha: Lock,
  group: Users,
  pfs: MessageSquare,
  opensource: Code,
  blind: Eye,
  desktop: Monitor,
};

export function Features() {
  const { t } = useTranslations('features');

  const features = [
    {
      icon: Shield,
      title: t('items.signal.title'),
      description: t('items.signal.description'),
    },
    {
      icon: Key,
      title: t('items.curve.title'),
      description: t('items.curve.description'),
    },
    {
      icon: Lock,
      title: t('items.chacha.title'),
      description: t('items.chacha.description'),
    },
    {
      icon: Users,
      title: t('items.group.title'),
      description: t('items.group.description'),
    },
    {
      icon: MessageSquare,
      title: t('items.pfs.title'),
      description: t('items.pfs.description'),
    },
    {
      icon: Code,
      title: t('items.opensource.title'),
      description: t('items.opensource.description'),
    },
    {
      icon: Eye,
      title: t('items.blind.title'),
      description: t('items.blind.description'),
    },
    {
      icon: Monitor,
      title: t('items.desktop.title'),
      description: t('items.desktop.description'),
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">
            {t('subtitle')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card group hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-foreground-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

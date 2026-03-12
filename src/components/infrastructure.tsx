'use client';

import {
  Server,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Network,
  Radio,
  Bell,
  GitBranch,
  CreditCard,
} from 'lucide-react';
import { useTranslations } from '@/i18n/provider';

export function Infrastructure() {
  const { t } = useTranslations('infrastructure');

  const features = [
    {
      icon: Network,
      title: t('items.nats.title'),
      description: t('items.nats.description'),
    },
    {
      icon: Server,
      title: t('items.gateway.title'),
      description: t('items.gateway.description'),
    },
    {
      icon: Globe,
      title: t('items.multiRegion.title'),
      description: t('items.multiRegion.description'),
    },
    {
      icon: Radio,
      title: t('items.p2p.title'),
      description: t('items.p2p.description'),
    },
    {
      icon: BarChart3,
      title: t('items.observability.title'),
      description: t('items.observability.description'),
    },
    {
      icon: Zap,
      title: t('items.autoScale.title'),
      description: t('items.autoScale.description'),
    },
    {
      icon: Bell,
      title: t('items.push.title'),
      description: t('items.push.description'),
    },
    {
      icon: Shield,
      title: t('items.loadTested.title'),
      description: t('items.loadTested.description'),
    },
    {
      icon: GitBranch,
      title: t('items.cicd.title'),
      description: t('items.cicd.description'),
    },
    {
      icon: CreditCard,
      title: t('items.billing.title'),
      description: t('items.billing.description'),
    },
  ];

  const stats = [
    { value: '100K+', label: t('stats.connections') },
    { value: '10M+', label: t('stats.messagesPerSec') },
    { value: '<100ms', label: t('stats.p95Latency') },
    { value: '99.99%', label: t('stats.uptime') },
  ];

  return (
    <section id="infrastructure" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
            <Server className="h-4 w-4" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card text-center"
            >
              <div className="text-2xl font-bold text-accent">{stat.value}</div>
              <div className="mt-1 text-sm text-foreground-secondary">
                {stat.label}
              </div>
            </div>
          ))}
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

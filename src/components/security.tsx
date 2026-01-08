'use client';

import { Shield, CheckCircle, AlertTriangle, Terminal } from 'lucide-react';
import { useTranslations } from '@/i18n/provider';

export function Security() {
  const { t } = useTranslations('security');

  const securityFeatures = t('features') as unknown as string[];

  return (
    <section id="security" className="bg-background-secondary py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Security Overview */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm text-success">
              <Shield className="h-4 w-4" />
              <span>{t('badge')}</span>
            </div>
            <h2 className="section-title">
              {t('title')}
            </h2>
            <p className="section-subtitle">
              {t('subtitle')}
            </p>

            <ul className="mt-8 space-y-3">
              {securityFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                  <span className="text-foreground-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Verify Downloads */}
          <div className="rounded-xl bg-background-primary p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">{t('verify.title')}</h3>
            </div>
            <p className="text-sm text-foreground-secondary">
              {t('verify.description')}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  {t('verify.step1.title')}
                </p>
                <div className="overflow-x-auto rounded-lg bg-background-elevated p-3">
                  <code className="font-mono text-xs text-foreground-secondary">
                    {t('verify.step1.command')}
                  </code>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">
                  {t('verify.step2.title')}
                </p>
                <div className="overflow-x-auto rounded-lg bg-background-elevated p-3">
                  <code className="font-mono text-xs text-foreground-secondary">
                    {t('verify.step2.command')}
                  </code>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">
                  {t('verify.step3.title')}
                </p>
                <div className="overflow-x-auto rounded-lg bg-background-elevated p-3">
                  <code className="font-mono text-xs text-foreground-secondary whitespace-pre">
                    {t('verify.step3.macLinux')}
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-foreground-secondary">
              <Terminal className="h-4 w-4" />
              <span>
                {t('verify.checksums')}{' '}
                <a href="/SHA256SUMS.txt" className="text-accent hover:underline">
                  SHA256SUMS.txt
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useTranslations } from '@/i18n/provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { 
  Wifi, 
  WifiOff, 
  Radio, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Battery, 
  Lock,
  ArrowRight,
  Signal,
  Smartphone,
  Laptop,
  Share2,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';

export default function NodeModePage() {
  const { t } = useTranslations('nodeMode');

  const useCases = [
    { icon: Users, key: 'protests' },
    { icon: Globe, key: 'disasters' },
    { icon: WifiOff, key: 'remote' },
    { icon: Shield, key: 'censorship' },
    { icon: Zap, key: 'infrastructure' },
    { icon: Lock, key: 'privacy' },
  ];

  const howItWorks = [
    { icon: Radio, key: 'discovery' },
    { icon: Share2, key: 'mesh' },
    { icon: RefreshCw, key: 'storeForward' },
    { icon: Signal, key: 'gateway' },
  ];

  const techFeatures = [
    { icon: Lock, key: 'e2ee' },
    { icon: EyeOff, key: 'metadata' },
    { icon: Battery, key: 'battery' },
    { icon: Shield, key: 'abuse' },
    { icon: Smartphone, key: 'crossPlatform' },
    { icon: Laptop, key: 'superNodes' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background-primary to-background-secondary py-20 sm:py-32">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
          </div>
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Radio className="h-4 w-4" />
                {t('badge')}
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground-primary sm:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              
              <p className="mb-8 text-lg text-foreground-secondary sm:text-xl">
                {t('subtitle')}
              </p>

              {/* Visual Indicator */}
              <div className="mx-auto mb-12 flex max-w-md items-center justify-center gap-4 rounded-2xl bg-background-elevated p-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                    <WifiOff className="h-8 w-8 text-red-400" />
                  </div>
                  <span className="text-sm text-foreground-secondary">{t('noInternet')}</span>
                </div>
                <ArrowRight className="h-6 w-6 text-foreground-secondary" />
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                    <Radio className="h-8 w-8 text-accent" />
                  </div>
                  <span className="text-sm text-foreground-secondary">{t('meshActive')}</span>
                </div>
                <ArrowRight className="h-6 w-6 text-foreground-secondary" />
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <Shield className="h-8 w-8 text-green-400" />
                  </div>
                  <span className="text-sm text-foreground-secondary">{t('stillSecure')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Node Mode */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold text-foreground-primary sm:text-4xl">
                {t('whatIs.title')}
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-foreground-secondary">
                  {t('whatIs.description1')}
                </p>
                <p className="text-foreground-secondary">
                  {t('whatIs.description2')}
                </p>
                <p className="text-foreground-secondary">
                  {t('whatIs.description3')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-background-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-3xl font-bold text-foreground-primary sm:text-4xl">
                {t('useCases.title')}
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-foreground-secondary">
                {t('useCases.subtitle')}
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.map(({ icon: Icon, key }) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-foreground-secondary/10 bg-background-primary p-6 transition-all hover:border-accent/30"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground-primary">
                      {t(`useCases.${key}.title`)}
                    </h3>
                    <p className="text-sm text-foreground-secondary">
                      {t(`useCases.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-3xl font-bold text-foreground-primary sm:text-4xl">
                {t('howItWorks.title')}
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-foreground-secondary">
                {t('howItWorks.subtitle')}
              </p>

              <div className="grid gap-8 lg:grid-cols-4">
                {howItWorks.map(({ icon: Icon, key }, index) => (
                  <div key={key} className="relative">
                    {index < howItWorks.length - 1 && (
                      <div className="absolute right-0 top-12 hidden h-0.5 w-full bg-gradient-to-r from-accent/50 to-transparent lg:block" style={{ left: '60%', width: '80%' }} />
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5">
                        <Icon className="h-10 w-10 text-accent" />
                      </div>
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-background-primary">
                        {index + 1}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground-primary">
                        {t(`howItWorks.${key}.title`)}
                      </h3>
                      <p className="text-sm text-foreground-secondary">
                        {t(`howItWorks.${key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gateway Explanation */}
        <section className="bg-gradient-to-b from-background-secondary to-background-primary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl border border-accent/20 bg-accent/5 p-8 sm:p-12">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20">
                    <Wifi className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground-primary sm:text-3xl">
                    {t('gateway.title')}
                  </h2>
                </div>
                <p className="mb-6 text-lg text-foreground-secondary">
                  {t('gateway.description1')}
                </p>
                <p className="mb-6 text-foreground-secondary">
                  {t('gateway.description2')}
                </p>
                <div className="rounded-xl bg-background-primary/50 p-6">
                  <h4 className="mb-4 font-semibold text-foreground-primary">
                    {t('gateway.priorityTitle')}
                  </h4>
                  <ol className="space-y-2 text-sm text-foreground-secondary">
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-400">1</span>
                      {t('gateway.priority1')}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">2</span>
                      {t('gateway.priority2')}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/20 text-xs font-bold text-yellow-400">3</span>
                      {t('gateway.priority3')}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-400">4</span>
                      {t('gateway.priority4')}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">5</span>
                      {t('gateway.priority5')}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-3xl font-bold text-foreground-primary sm:text-4xl">
                {t('technical.title')}
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-foreground-secondary">
                {t('technical.subtitle')}
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {techFeatures.map(({ icon: Icon, key }) => (
                  <div
                    key={key}
                    className="group rounded-2xl border border-foreground-secondary/10 bg-background-secondary p-6 transition-all hover:border-accent/30 hover:bg-background-elevated"
                  >
                    <Icon className="mb-4 h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground-primary">
                      {t(`technical.${key}.title`)}
                    </h3>
                    <p className="text-sm text-foreground-secondary">
                      {t(`technical.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="bg-background-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Eye className="mx-auto mb-6 h-12 w-12 text-accent" />
              <h2 className="mb-6 text-3xl font-bold text-foreground-primary sm:text-4xl">
                {t('transparency.title')}
              </h2>
              <p className="mb-6 text-foreground-secondary">
                {t('transparency.description1')}
              </p>
              <p className="mb-8 text-foreground-secondary">
                {t('transparency.description2')}
              </p>
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6">
                <h4 className="mb-3 font-semibold text-yellow-400">
                  {t('transparency.limitationsTitle')}
                </h4>
                <ul className="space-y-2 text-left text-sm text-foreground-secondary">
                  <li>• {t('transparency.limitation1')}</li>
                  <li>• {t('transparency.limitation2')}</li>
                  <li>• {t('transparency.limitation3')}</li>
                  <li>• {t('transparency.limitation4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-foreground-primary sm:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mb-8 text-lg text-foreground-secondary">
                {t('cta.description')}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-background-primary transition-all hover:bg-accent/90"
                >
                  {t('cta.joinWaitlist')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/charter"
                  className="inline-flex items-center gap-2 rounded-xl border border-foreground-secondary/20 bg-background-secondary px-8 py-4 font-semibold text-foreground-primary transition-all hover:border-accent/30"
                >
                  {t('cta.readCharter')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

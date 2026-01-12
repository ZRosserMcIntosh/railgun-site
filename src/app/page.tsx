import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Downloads } from '@/components/downloads';
import { Features } from '@/components/features';
import { Security } from '@/components/security';
import { Platforms } from '@/components/platforms';
import { Cta } from '@/components/cta';
import { Footer } from '@/components/footer';

// Removed force-dynamic - home page can be statically generated
// Client-side i18n hydration happens via I18nClientWrapper in layout

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://railgun.app',
  },
  openGraph: {
    url: 'https://railgun.app',
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Downloads />
      <Features />
      <Security />
      <Platforms />
      <Cta />
      <Footer />
    </main>
  );
}

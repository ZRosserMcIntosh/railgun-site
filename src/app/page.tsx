import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Downloads } from '@/components/downloads';
import { Features } from '@/components/features';
import { Infrastructure } from '@/components/infrastructure';
import { Security } from '@/components/security';
import { Platforms } from '@/components/platforms';
import { Cta } from '@/components/cta';
import { Footer } from '@/components/footer';

// Removed force-dynamic - home page can be statically generated
// Client-side i18n hydration happens via I18nClientWrapper in layout

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://railgun.chat',
  },
  openGraph: {
    url: 'https://railgun.chat',
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Downloads />
      <Features />
      <Infrastructure />
      <Security />
      <Platforms />
      <Cta />
      <Footer />
    </main>
  );
}

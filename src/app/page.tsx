import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Downloads } from '@/components/downloads';
import { Features } from '@/components/features';
import { Security } from '@/components/security';
import { Platforms } from '@/components/platforms';
import { Cta } from '@/components/cta';
import { Footer } from '@/components/footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Features />
      <Downloads />
      <Security />
      <Platforms />
      <Cta />
      <Footer />
    </main>
  );
}

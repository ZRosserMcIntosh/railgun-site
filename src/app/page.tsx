import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Waitlist } from '@/components/waitlist';
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
      <Waitlist />
      <Security />
      <Platforms />
      <Cta />
      <Footer />
    </main>
  );
}

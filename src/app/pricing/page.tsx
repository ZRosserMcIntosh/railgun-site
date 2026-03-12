import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Pricing } from '@/components/pricing';

export const metadata: Metadata = {
  title: 'Pricing — Rail Gun',
  description: 'Rail Gun Pro: End-to-end encrypted messaging with HD media, encrypted email, Threat Shield, and more. Plans starting at $9/month.',
  openGraph: {
    title: 'Pricing — Rail Gun',
    description: 'Unlock HD media, encrypted email, and Threat Shield with Rail Gun Pro.',
  },
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="pt-24">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}

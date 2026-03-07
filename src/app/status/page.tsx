import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { StatusDashboard } from '@/components/status-dashboard';

export const metadata: Metadata = {
  title: 'System Status — Rail Gun',
  description:
    'Real-time health checks across all Rail Gun services: API, database, Redis, WebSocket, billing, mail, and more.',
  alternates: {
    canonical: 'https://railgun.chat/status',
  },
  openGraph: {
    title: 'System Status — Rail Gun',
    description:
      'Live infrastructure health dashboard for Rail Gun encrypted messaging.',
    url: 'https://railgun.chat/status',
  },
};

export default function StatusPage() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="pt-24">
        <StatusDashboard />
      </div>
      <Footer />
    </main>
  );
}

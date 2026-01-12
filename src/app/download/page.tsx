'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Downloads } from '@/components/downloads';

export default function DownloadPage() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="pt-24">
        <Downloads />
      </div>
      <Footer />
    </main>
  );
}

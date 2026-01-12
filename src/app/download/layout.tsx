import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download Rail Gun for macOS, Windows, and Linux. Secure, end-to-end encrypted messaging with Signal Protocol.',
  alternates: {
    canonical: 'https://railgun.app/download',
  },
  openGraph: {
    url: 'https://railgun.app/download',
    title: 'Download | Rail Gun',
    description: 'Download Rail Gun for macOS, Windows, and Linux. Secure, end-to-end encrypted messaging.',
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

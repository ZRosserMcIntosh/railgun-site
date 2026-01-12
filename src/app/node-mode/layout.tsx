import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Node Mode - Mesh Networking',
  description: 'Node Mode enables secure communication without internet. Mesh networking for protests, disasters, and censored regions.',
  alternates: {
    canonical: 'https://railgun.app/node-mode',
  },
  openGraph: {
    url: 'https://railgun.app/node-mode',
    title: 'Node Mode - Mesh Networking | Rail Gun',
    description: 'Stay connected when they cut the cord. Node Mode enables secure communication without internet through mesh networking.',
  },
};

export default function NodeModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

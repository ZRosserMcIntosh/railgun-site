import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charter',
  description: 'Rail Gun Charter - Our principles, values, and commitment to secure, private communication for everyone.',
  alternates: {
    canonical: 'https://railgun.app/charter',
  },
  openGraph: {
    url: 'https://railgun.app/charter',
    title: 'Charter | Rail Gun',
    description: 'Our principles, values, and commitment to secure, private communication for everyone.',
  },
};

export default function CharterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

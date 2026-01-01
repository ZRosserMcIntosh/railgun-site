import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Rail Gun - Secure Private Messaging',
    template: '%s | Rail Gun',
  },
  description:
    'Rail Gun is an end-to-end encrypted messaging app with Signal Protocol (X3DH + Double Ratchet), Curve25519, and ChaCha20-Poly1305. Download for macOS, Windows, Linux, or use on the web.',
  keywords: [
    'encrypted messaging',
    'secure chat',
    'Signal protocol',
    'X3DH',
    'Double Ratchet',
    'Curve25519',
    'ChaCha20-Poly1305',
    'end-to-end encryption',
    'perfect forward secrecy',
    'private messaging',
    'desktop chat app',
    'secure communications',
  ],
  authors: [{ name: 'Rail Gun Team' }],
  creator: 'Rail Gun',
  publisher: 'Rail Gun',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://railgun.app',
    siteName: 'Rail Gun',
    title: 'Rail Gun - Secure Private Messaging',
    description:
      'End-to-end encrypted with Signal Protocol (X3DH + Double Ratchet), Curve25519, and ChaCha20-Poly1305. Your keys, your privacy.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rail Gun - Secure Private Messaging',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rail Gun - Secure Private Messaging',
    description:
      'End-to-end encrypted with Signal Protocol (X3DH + Double Ratchet), Curve25519, and ChaCha20-Poly1305. Your keys, your privacy.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://railgun.app'),
};

export const viewport: Viewport = {
  themeColor: '#0f0f10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { I18nClientWrapper } from '@/i18n/client-wrapper';
import { StructuredData } from '@/components/structured-data';
import { locales } from '@/i18n/config';
import './globals.css';

// Generate hreflang alternate links for all supported languages
const languages = Object.fromEntries(
  locales.map((locale) => [locale, `https://railgun.app?locale=${locale}`])
);

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
    'mesh network messaging',
    'offline messaging',
    'censorship resistant',
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
  alternates: {
    canonical: 'https://railgun.app',
    languages,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'pt_BR', 'fr_FR', 'de_DE', 'it_IT', 'uk_UA', 'ru_RU', 'pl_PL', 'hu_HU', 'ko_KR', 'ja_JP', 'zh_CN', 'fa_IR', 'ar_SA'],
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
  verification: {
    // Add your verification codes here when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-background-primary font-sans antialiased">
        <I18nClientWrapper>
          {children}
        </I18nClientWrapper>
      </body>
    </html>
  );
}

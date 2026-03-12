import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { I18nClientWrapper } from '@/i18n/client-wrapper';
import { StructuredData } from '@/components/structured-data';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';

// Note: hreflang/alternates removed because locale switching is client-side only
// (via cookie, not URL-based). Adding hreflang for ?locale=xx URLs that only
// set a cookie would mislead search engines. To properly support i18n SEO,
// implement path-based locale routing (e.g., /fr/, /de/) in the future.

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
  // Canonical and OG URL are set per-page via generateMetadata, not here
  // This prevents all pages from canonicalizing to the homepage
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
  metadataBase: new URL('https://railgun.chat'),
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QX1MVLYRD9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QX1MVLYRD9');
          `}
        </Script>

        <I18nClientWrapper>
          <AuthProvider>
            {children}
          </AuthProvider>
        </I18nClientWrapper>
      </body>
    </html>
  );
}

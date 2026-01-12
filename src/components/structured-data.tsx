/**
 * JSON-LD Structured Data for SEO
 * Provides rich snippets in search results
 */

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rail Gun',
    url: 'https://railgun.app',
    logo: 'https://railgun.app/logo.png',
    description: 'End-to-end encrypted messaging with Signal Protocol. Censorship-resistant communication for everyone.',
    sameAs: [
      'https://github.com/nickolasvl/Railgun',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Rail Gun',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: ['macOS', 'Windows', 'Linux', 'iOS', 'Android'],
    description: 'Secure end-to-end encrypted messaging app with Signal Protocol, mesh networking support, and censorship-resistant communication.',
    url: 'https://railgun.app',
    downloadUrl: 'https://railgun.app',
    screenshot: 'https://railgun.app/og-image.png',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'End-to-end encryption',
      'Signal Protocol (X3DH + Double Ratchet)',
      'Perfect Forward Secrecy',
      'Mesh networking (Node Mode)',
      'Offline messaging',
      'Censorship resistant',
      'Open source',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rail Gun',
    url: 'https://railgun.app',
    description: 'End-to-end encrypted messaging with Signal Protocol. Censorship-resistant communication for everyone.',
    inLanguage: [
      'en', 'es', 'pt', 'fr', 'de', 'it', 'uk', 'ru', 'pl', 'hu', 'ko', 'ja', 'zh', 'fa', 'ar'
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://railgun.app?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Rail Gun?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rail Gun is an end-to-end encrypted messaging application built with Signal Protocol (X3DH + Double Ratchet), Curve25519, and ChaCha20-Poly1305. It provides secure, private communication with features like mesh networking for offline messaging.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Node Mode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Node Mode is a mesh networking feature that allows Rail Gun users to communicate without internet connectivity. Devices form a decentralized network, passing encrypted messages between each other using Bluetooth and WiFi Direct.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Rail Gun open source?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Rail Gun is fully open source and auditable on GitHub. All cryptographic implementations can be reviewed by security experts.',
        },
      },
      {
        '@type': 'Question',
        name: 'What platforms does Rail Gun support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rail Gun is available for macOS, Windows, Linux, iOS, and Android. The desktop app is built with Electron and provides native performance with local key storage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Rail Gun work without internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, with Node Mode enabled, Rail Gun can send and receive messages using mesh networking technology (Bluetooth and WiFi Direct) without any internet connection.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined component for the main page
export function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <WebsiteSchema />
      <FAQSchema />
    </>
  );
}

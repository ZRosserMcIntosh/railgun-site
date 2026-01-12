/**
 * JSON-LD Structured Data for SEO
 * Only includes schemas that comply with Google's guidelines
 * and are backed by visible on-page content.
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
    // Only list currently available platforms
    operatingSystem: ['macOS', 'Windows', 'Linux'],
    description: 'Secure end-to-end encrypted messaging app with Signal Protocol and censorship-resistant communication.',
    url: 'https://railgun.app',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    // Removed aggregateRating - no real user ratings yet
    featureList: [
      'End-to-end encryption',
      'Signal Protocol (X3DH + Double Ratchet)',
      'Perfect Forward Secrecy',
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
    // Removed SearchAction - no real search endpoint
    // Removed inLanguage array - locale switching is client-side only
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Removed FAQSchema - FAQ content not visible on pages

// Combined component for the main page only
export function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <WebsiteSchema />
    </>
  );
}

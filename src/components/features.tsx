import {
  Shield,
  Lock,
  Users,
  MessageSquare,
  Monitor,
  Code,
  Key,
  Eye,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Signal Protocol',
    description:
      'Double Ratchet (KDF chains) + X3DH key exchange. Industry-standard end-to-end encryption with libsignal',
  },
  {
    icon: Key,
    title: 'Curve25519 Encryption',
    description:
      'Modern elliptic curve cryptography (Curve25519) for key exchange and signatures via NaCl',
  },
  {
    icon: Lock,
    title: 'ChaCha20-Poly1305',
    description:
      'AEAD cipher providing authenticated encryption with associated data (AEAD) for message confidentiality',
  },
  {
    icon: Users,
    title: 'Group Encryption',
    description:
      'Communities with encrypted channels using Signal Protocol group sessions and per-recipient keys',
  },
  {
    icon: MessageSquare,
    title: 'Perfect Forward Secrecy',
    description:
      'Each message uses ephemeral keys. Compromised long-term keys cannot decrypt past messages',
  },
  {
    icon: Code,
    title: 'Open Source & Auditable',
    description:
      'Full transparency on GitHub. Cryptographic implementations reviewed and auditable by security experts',
  },
  {
    icon: Eye,
    title: 'Server Blindness',
    description:
      'Backend sees only encrypted blobs (ChaCha20-Poly1305) and routing metadata. Content never exposed',
  },
  {
    icon: Monitor,
    title: 'Desktop-First Client',
    description:
      'Native Electron app for macOS, Windows, Linux with local key storage and OS-level encryption',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Why Rail Gun?</h2>
          <p className="section-subtitle">
            Built from the ground up with privacy and security as the foundation,
            not an afterthought.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card group hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-foreground-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

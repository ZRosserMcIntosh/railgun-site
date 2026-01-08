import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Shield, Scale, Users, Lock, Globe, Eye, Heart, FileText, Lightbulb, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Charter | Rail Gun',
  description: 'The ten principles that govern Rail Gun — non-violence, sovereignty, and survivability as civic infrastructure.',
};

const principles = [
  {
    number: 1,
    icon: Heart,
    title: 'Non-Violence Is Non-Negotiable',
    description: 'Rail Gun never advocates, facilitates, or enables violence, coercion, or physical harm. We design to reduce the conditions that lead to violence by making peaceful alternatives viable.',
  },
  {
    number: 2,
    icon: Globe,
    title: 'Infrastructure, Not Agitation',
    description: 'We build roads, not barricades. Printing presses, not weapons. Our purpose is to provide neutral, durable infrastructure that any community can use for lawful purposes.',
  },
  {
    number: 3,
    icon: FileText,
    title: 'Truth Without Permission',
    description: 'Every person has the right to communicate, to publish evidence, and to coordinate with others—without requiring approval from any central authority.',
  },
  {
    number: 4,
    icon: Lock,
    title: 'Sovereignty At The Edge',
    description: 'Users control their own keys, their own data, and their own relationships. Rail Gun operators cannot read messages or identify users beyond minimal routing metadata.',
  },
  {
    number: 5,
    icon: Shield,
    title: 'The Protocol Survives The Operator',
    description: 'The core protocol must remain functional even if Rail Gun is compromised, acquired, or shut down. No single point of failure. No kill switch.',
  },
  {
    number: 6,
    icon: Scale,
    title: 'Layered Separation Protects Legitimacy',
    description: 'The Sovereign Core (protocol) is neutral. The Services Layer (enterprise, compliance) is where business happens. These layers are architecturally separate.',
  },
  {
    number: 7,
    icon: Target,
    title: 'Safe Defaults, Deliberate Power',
    description: 'Default settings are safe and appropriate for ordinary communication. Features with elevated risk require explicit user intent and informed consent.',
  },
  {
    number: 8,
    icon: Eye,
    title: 'Minimal Retention, Maximum Deletion',
    description: 'We retain the minimum data necessary for routing and never longer than required. Users can delete their data completely.',
  },
  {
    number: 9,
    icon: Lightbulb,
    title: 'Legitimacy Through Transparency',
    description: 'Rail Gun publishes its protocols, audits its code, discloses its funding, and operates in the open. Legitimacy is earned through accountability.',
  },
  {
    number: 10,
    icon: Users,
    title: 'No Enemies, Only Problems',
    description: 'We do not personalize adversaries or name targets. We describe problems and build solutions. The goal is a world where everyone can communicate safely.',
  },
];

export default function CharterPage() {
  return (
    <main className="relative">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
            <Shield className="h-4 w-4" />
            <span>Foundational Document</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The Rail Gun Charter
          </h1>
          <p className="mt-6 text-lg text-foreground-secondary sm:text-xl max-w-2xl mx-auto">
            Rail Gun is civic infrastructure. It exists to lower the cost of truth, 
            protect communication without permission, and enable peaceful coordination at scale.
          </p>
        </div>
      </section>

      {/* Preamble */}
      <section className="py-12 sm:py-16 bg-background-secondary">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-invert mx-auto">
            <h2 className="text-2xl font-bold mb-4">Preamble</h2>
            <p className="text-foreground-secondary leading-relaxed">
              Rail Gun is not a weapon. It is a road, a printing press, a public utility for 
              the information age. We build infrastructure that makes violence unnecessary 
              by making truth accessible, lies expensive, and peaceful self-correction possible.
            </p>
            <p className="text-foreground-secondary leading-relaxed mt-4">
              We succeed when a journalist can publish evidence without fear, when families 
              can communicate across hostile borders, when communities can organize mutual aid 
              without surveillance, and when societies can correct themselves without bloodshed.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Ten Principles
            </h2>
            <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
              These principles are non-negotiable. Every product decision, every feature, 
              every communication must align with them.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="card group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <principle.icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-foreground-tertiary">
                        {String(principle.number).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-semibold">{principle.title}</h3>
                    </div>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Are Not */}
      <section className="py-16 sm:py-24 bg-background-secondary">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">What Rail Gun Is Not</h2>
          <div className="space-y-4">
            {[
              'Not a tool for harassment, doxxing, or stalking',
              'Not a platform for coordinating illegal violence',
              'Not a weapon against any person, institution, or government',
              'Not a promise of immunity from consequences',
              'Not an ideology—it is infrastructure',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-foreground-secondary">
                <div className="h-1.5 w-1.5 rounded-full bg-error flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Operational Commitments</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Annual Ethics Audit',
                description: 'Independent review of product decisions against this Charter.',
              },
              {
                title: 'Transparency Reports',
                description: 'Quarterly disclosure of government requests and compliance actions.',
              },
              {
                title: 'No Deceptive Marketing',
                description: 'All claims about security and privacy must be technically verifiable.',
              },
              {
                title: 'Community Governance',
                description: 'Protocol changes require open deliberation and rough consensus.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-background-elevated p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-background-secondary">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-foreground-secondary italic mb-8">
            &ldquo;This Charter is a living document. Amendments require public deliberation, 
            community consent, and alignment with the principle of non-violence.&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://github.com/ZRosserMcIntosh/railgun/blob/main/docs/CHARTER.md"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View on GitHub
            </Link>
            <Link
              href="/security"
              className="btn-secondary"
            >
              Security Details
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

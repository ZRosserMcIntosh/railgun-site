import { Monitor, Smartphone, Globe } from 'lucide-react';

const platforms = [
  {
    icon: Monitor,
    title: 'Desktop',
    description: 'Native apps for macOS, Windows, and Linux',
    status: 'Available Now',
    statusColor: 'text-success',
    available: true,
  },
  {
    icon: Globe,
    title: 'Web',
    description: 'Access from any browser with QR code sign-in',
    status: 'Coming Soon',
    statusColor: 'text-warning',
    available: false,
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    description: 'iOS and Android apps with seamless sync',
    status: 'In Development',
    statusColor: 'text-foreground-secondary',
    available: false,
  },
];

export function Platforms() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Available Everywhere</h2>
          <p className="section-subtitle">
            Use Rail Gun on your favorite platform. Your encrypted messages sync
            securely across all your devices.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.title}
                className={`card text-center ${
                  !platform.available ? 'opacity-75' : ''
                }`}
              >
                <div className="mx-auto mb-4 inline-flex rounded-xl bg-background-elevated p-4">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{platform.title}</h3>
                <p className="mb-4 text-sm text-foreground-secondary">
                  {platform.description}
                </p>
                <span className={`text-sm font-medium ${platform.statusColor}`}>
                  {platform.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

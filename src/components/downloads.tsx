'use client';

import { useEffect, useState } from 'react';
import { Apple, Monitor, Download, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/config';

type Platform = 'mac' | 'windows' | 'linux' | 'unknown';

const platforms = [
  {
    id: 'mac' as Platform,
    name: 'macOS',
    description: 'macOS 11+ (Intel & Apple Silicon)',
    icon: Apple,
    downloadUrl: siteConfig.downloads.mac.dmg,
    fileName: `Rail-Gun-${siteConfig.version}-mac-universal.dmg`,
  },
  {
    id: 'windows' as Platform,
    name: 'Windows',
    description: 'Windows 10+ (64-bit)',
    icon: Monitor,
    downloadUrl: siteConfig.downloads.windows.exe,
    fileName: `Rail-Gun-${siteConfig.version}-win-x64.exe`,
  },
  {
    id: 'linux' as Platform,
    name: 'Linux',
    description: 'Debian, Ubuntu, Fedora, AppImage',
    icon: Monitor,
    downloadUrl: siteConfig.downloads.linux.appImage,
    fileName: `Rail-Gun-${siteConfig.version}-linux-x86_64.AppImage`,
  },
];

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown';
  
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (platform.includes('mac') || userAgent.includes('mac')) return 'mac';
  if (platform.includes('win') || userAgent.includes('win')) return 'windows';
  if (platform.includes('linux') || userAgent.includes('linux')) return 'linux';
  
  return 'unknown';
}

export function Downloads() {
  const [detectedPlatform, setDetectedPlatform] = useState<Platform>('unknown');

  useEffect(() => {
    setDetectedPlatform(detectPlatform());
  }, []);

  return (
    <section id="download" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Download Rail Gun</h2>
          <p className="section-subtitle">
            Get Rail Gun for your platform and start messaging securely.
          </p>
        </div>

        {/* Download Cards */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {platforms.map((platform) => {
              const isPrimary = platform.id === detectedPlatform;
              const Icon = platform.icon;

              return (
                <a
                  key={platform.id}
                  href={platform.downloadUrl}
                  className={`card flex flex-col items-center gap-4 text-center transition-all hover:-translate-y-1 ${
                    isPrimary
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-background-primary'
                      : ''
                  }`}
                >
                  <div
                    className={`rounded-xl p-4 ${
                      isPrimary ? 'bg-accent' : 'bg-background-elevated'
                    }`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{platform.name}</h3>
                    <p className="mt-1 text-sm text-foreground-secondary">
                      {platform.description}
                    </p>
                  </div>
                  <button
                    className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition-colors ${
                      isPrimary
                        ? 'bg-success text-white hover:bg-success/90'
                        : 'bg-accent text-white hover:bg-accent-hover'
                    }`}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </a>
              );
            })}
          </div>

          {/* Version Info */}
          <div className="mt-8 text-center text-sm text-foreground-secondary">
            <p>
              Current version: <strong>{siteConfig.version}</strong> •{' '}
              <a
                href={siteConfig.links.releases}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent hover:underline"
              >
                Release notes
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          {/* Web App CTA */}
          <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
            <h3 className="text-lg font-semibold">Try Rail Gun Web</h3>
            <p className="mt-2 text-sm text-foreground-secondary">
              Access Rail Gun from your browser—scan QR with your phone to sign
              in securely.
            </p>
            <a
              href={siteConfig.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-flex"
            >
              Open Web App
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

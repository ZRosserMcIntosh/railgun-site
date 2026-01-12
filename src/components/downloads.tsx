'use client';

import { useEffect, useState } from 'react';
import { Apple, Monitor, Download, ExternalLink, CheckCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '@/lib/config';

type Platform = 'mac' | 'windows' | 'linux' | 'unknown';

interface ReleaseInfo {
  version: string;
  publishedAt: string;
  releaseNotes: string;
  assets: {
    mac?: { dmg?: string; zip?: string };
    windows?: { exe?: string };
    linux?: { appImage?: string; deb?: string };
  };
}

const platformDetails = {
  mac: {
    name: 'macOS',
    description: 'macOS 11+ (Intel & Apple Silicon)',
    icon: Apple,
    requirements: 'Universal binary for Intel and Apple Silicon Macs',
  },
  windows: {
    name: 'Windows',
    description: 'Windows 10+ (64-bit)',
    icon: Monitor,
    requirements: 'Requires Windows 10 version 1903 or later',
  },
  linux: {
    name: 'Linux',
    description: 'AppImage or .deb package',
    icon: Monitor,
    requirements: 'Ubuntu 20.04+, Debian 11+, or compatible distro',
  },
};

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
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    setDetectedPlatform(detectPlatform());

    // Try to fetch latest release info from GitHub
    async function fetchRelease() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/ZRosserMcIntosh/railgun/releases/latest`
        );
        
        if (response.ok) {
          const data = await response.json();
          const version = data.tag_name?.replace('v', '') || siteConfig.version;
          
          // Parse assets
          const assets: ReleaseInfo['assets'] = {};
          for (const asset of data.assets || []) {
            const name = asset.name.toLowerCase();
            if (name.includes('mac') || name.includes('darwin')) {
              if (!assets.mac) assets.mac = {};
              if (name.endsWith('.dmg')) assets.mac.dmg = asset.browser_download_url;
              if (name.endsWith('.zip')) assets.mac.zip = asset.browser_download_url;
            } else if (name.includes('win')) {
              if (!assets.windows) assets.windows = {};
              if (name.endsWith('.exe')) assets.windows.exe = asset.browser_download_url;
            } else if (name.includes('linux')) {
              if (!assets.linux) assets.linux = {};
              if (name.endsWith('.appimage')) assets.linux.appImage = asset.browser_download_url;
              if (name.endsWith('.deb')) assets.linux.deb = asset.browser_download_url;
            }
          }
          
          setReleaseInfo({
            version,
            publishedAt: data.published_at,
            releaseNotes: data.body || '',
            assets,
          });
        }
      } catch (error) {
        console.error('Failed to fetch release info:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelease();
  }, []);

  const version = releaseInfo?.version || siteConfig.version;

  const getDownloadUrl = (platform: Platform): string => {
    if (releaseInfo?.assets) {
      switch (platform) {
        case 'mac':
          return releaseInfo.assets.mac?.dmg || siteConfig.downloads.mac.dmg;
        case 'windows':
          return releaseInfo.assets.windows?.exe || siteConfig.downloads.windows.exe;
        case 'linux':
          return releaseInfo.assets.linux?.appImage || siteConfig.downloads.linux.appImage;
      }
    }
    // Fallback to config URLs
    switch (platform) {
      case 'mac':
        return siteConfig.downloads.mac.dmg;
      case 'windows':
        return siteConfig.downloads.windows.exe;
      case 'linux':
        return siteConfig.downloads.linux.appImage;
      default:
        return siteConfig.downloads.latest;
    }
  };

  const handleDownload = (platform: Platform) => {
    setDownloading(platform);
    // Reset after 3 seconds (download should have started)
    setTimeout(() => setDownloading(null), 3000);
  };

  const platformList: ('mac' | 'windows' | 'linux')[] = ['windows', 'mac', 'linux'];

  return (
    <section id="download" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Download Rail Gun
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary">
            Get Rail Gun for your platform and start messaging with true privacy.
            Your keys never leave your device.
          </p>
        </div>

        {/* Primary Download - Detected Platform */}
        {detectedPlatform !== 'unknown' && (
          <div className="mx-auto mt-12 max-w-xl">
            <div className="rounded-2xl border-2 border-accent bg-gradient-to-b from-accent/10 to-transparent p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                {(() => {
                  const Icon = platformDetails[detectedPlatform].icon;
                  return <Icon className="h-8 w-8 text-white" />;
                })()}
              </div>
              <h3 className="text-xl font-semibold">
                Rail Gun for {platformDetails[detectedPlatform].name}
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                {platformDetails[detectedPlatform].requirements}
              </p>
              <a
                href={getDownloadUrl(detectedPlatform)}
                onClick={() => handleDownload(detectedPlatform)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-success px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-success/90 hover:scale-105"
              >
                {downloading === detectedPlatform ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Starting Download...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download v{version}
                  </>
                )}
              </a>
              <p className="mt-3 text-xs text-foreground-tertiary">
                Version {version} • Free and open source
              </p>
            </div>
          </div>
        )}

        {/* All Platforms */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="mb-8 text-center text-lg font-semibold text-foreground-secondary">
            All Platforms
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {platformList.map((platform) => {
              const details = platformDetails[platform];
              const isPrimary = platform === detectedPlatform;
              const Icon = details.icon;
              const isDownloading = downloading === platform;

              return (
                <div
                  key={platform}
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
                    <h4 className="text-lg font-semibold">{details.name}</h4>
                    <p className="mt-1 text-sm text-foreground-secondary">
                      {details.description}
                    </p>
                  </div>
                  <a
                    href={getDownloadUrl(platform)}
                    onClick={() => handleDownload(platform)}
                    className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition-colors ${
                      isPrimary
                        ? 'bg-success text-white hover:bg-success/90'
                        : 'bg-accent text-white hover:bg-accent-hover'
                    }`}
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Version Info & Links */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-background-elevated px-4 py-2 text-sm">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>
              Version <strong>{version}</strong>
            </span>
            <span className="text-foreground-tertiary">•</span>
            <a
              href={siteConfig.links.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              Release Notes
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-foreground-tertiary">•</span>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              Source Code
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Auto-Update Notice */}
        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
          <h4 className="font-semibold">Automatic Updates</h4>
          <p className="mt-2 text-sm text-foreground-secondary">
            Rail Gun automatically checks for updates and installs them securely.
            All updates are cryptographically signed to ensure authenticity.
          </p>
        </div>

        {/* Verification Instructions */}
        <div className="mx-auto mt-8 max-w-2xl">
          <details className="group rounded-xl border border-foreground-secondary/20 bg-background-secondary">
            <summary className="cursor-pointer px-6 py-4 font-semibold">
              Verify Your Download (Advanced)
            </summary>
            <div className="border-t border-foreground-secondary/20 px-6 py-4">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium">1. Download the checksums file:</p>
                  <code className="mt-1 block rounded bg-background-elevated p-2 text-xs">
                    SHA256SUMS.txt from the release page
                  </code>
                </div>
                <div>
                  <p className="font-medium">2. Verify the checksum:</p>
                  <code className="mt-1 block rounded bg-background-elevated p-2 text-xs whitespace-pre-wrap">
                    # macOS/Linux{'\n'}
                    sha256sum -c SHA256SUMS.txt --ignore-missing{'\n'}
                    {'\n'}# Windows PowerShell{'\n'}
                    Get-FileHash Rail-Gun-*.exe | Format-List
                  </code>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

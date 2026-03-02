'use client';

import { useEffect, useState } from 'react';
import { Download, ExternalLink, CheckCircle, Loader2, Smartphone } from 'lucide-react';
import { siteConfig } from '@/lib/config';

type Platform = 'mac' | 'windows' | 'linux' | 'ios' | 'android' | 'unknown';
type DesktopPlatform = 'mac' | 'windows' | 'linux';
type MobilePlatform = 'ios' | 'android';

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

// Platform icons as SVG components
const WindowsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 88 88" fill="currentColor">
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const LinuxIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 448 512" fill="currentColor">
    <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-30.5-9.6c-14.1-8.2-17.2-27.1-5.3-43.3 11.9-16.2 34.5-22 48.6-13.8 14.1 8.2 17.2 27.1 5.3 43.3-11.9 16.2-34.5 22-48.6 13.8z"/>
  </svg>
);

const AndroidIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 576 512" fill="currentColor">
    <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
  </svg>
);

const platformDetails = {
  mac: {
    name: 'macOS',
    description: 'macOS 11+ (Intel & Apple Silicon)',
    icon: AppleIcon,
    requirements: 'Universal binary for Intel and Apple Silicon Macs',
    available: true,
  },
  windows: {
    name: 'Windows',
    description: 'Windows 10+ (64-bit)',
    icon: WindowsIcon,
    requirements: 'Requires Windows 10 version 1903 or later',
    available: true,
  },
  linux: {
    name: 'Linux',
    description: 'AppImage or .deb package',
    icon: LinuxIcon,
    requirements: 'Ubuntu 20.04+, Debian 11+, or compatible distro',
    available: true,
  },
  ios: {
    name: 'iOS',
    description: 'iPhone & iPad',
    icon: AppleIcon,
    requirements: 'iOS 15.0 or later',
    available: false,
    comingSoon: true,
  },
  android: {
    name: 'Android',
    description: 'Android phones & tablets',
    icon: AndroidIcon,
    requirements: 'Android 10.0 or later',
    available: false,
    comingSoon: true,
  },
};

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown';

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  // Check mobile first
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'android';
  
  // Desktop platforms
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
            if (name.includes('.dmg')) {
              if (!assets.mac) assets.mac = {};
              assets.mac.dmg = asset.browser_download_url;
            } else if (name.includes('.zip') && name.includes('mac')) {
              if (!assets.mac) assets.mac = {};
              assets.mac.zip = asset.browser_download_url;
            } else if (name.endsWith('.exe') || name.includes('setup')) {
              if (!assets.windows) assets.windows = {};
              assets.windows.exe = asset.browser_download_url;
            } else if (name.includes('appimage')) {
              if (!assets.linux) assets.linux = {};
              assets.linux.appImage = asset.browser_download_url;
            } else if (name.endsWith('.deb')) {
              if (!assets.linux) assets.linux = {};
              assets.linux.deb = asset.browser_download_url;
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

  const getDownloadUrl = (platform: DesktopPlatform): string => {
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

  const getAlternateDownloads = (platform: DesktopPlatform): { label: string; url: string }[] => {
    switch (platform) {
      case 'mac':
        return [
          { label: 'Intel Mac (.dmg)', url: siteConfig.downloads.mac.dmgIntel },
          { label: 'Apple Silicon (.zip)', url: siteConfig.downloads.mac.zip },
        ];
      case 'linux':
        return [
          { label: '.deb (Debian/Ubuntu)', url: siteConfig.downloads.linux.deb },
        ];
      default:
        return [];
    }
  };

  const handleDownload = (platform: DesktopPlatform) => {
    setDownloading(platform);
    // Reset after 3 seconds (download should have started)
    setTimeout(() => setDownloading(null), 3000);
  };

  const desktopPlatforms: DesktopPlatform[] = ['windows', 'mac', 'linux'];
  const mobilePlatforms: MobilePlatform[] = ['ios', 'android'];
  const isMobile = detectedPlatform === 'ios' || detectedPlatform === 'android';
  const isDesktop = detectedPlatform === 'mac' || detectedPlatform === 'windows' || detectedPlatform === 'linux';

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

        {/* Primary Download - Detected Platform (Desktop) */}
        {isDesktop && (
          <div className="mx-auto mt-12 max-w-xl">
            <div className="rounded-2xl border-2 border-accent bg-gradient-to-b from-accent/10 to-transparent p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                {(() => {
                  const Icon = platformDetails[detectedPlatform as DesktopPlatform].icon;
                  return <Icon className="h-8 w-8 text-white" />;
                })()}
              </div>
              <h3 className="text-xl font-semibold">
                Rail Gun for {platformDetails[detectedPlatform as DesktopPlatform].name}
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                {platformDetails[detectedPlatform as DesktopPlatform].requirements}
              </p>
              <a
                href={getDownloadUrl(detectedPlatform as DesktopPlatform)}
                onClick={() => handleDownload(detectedPlatform as DesktopPlatform)}
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

        {/* Mobile User - Show Coming Soon */}
        {isMobile && (
          <div className="mx-auto mt-12 max-w-xl">
            <div className="rounded-2xl border-2 border-accent/50 bg-gradient-to-b from-accent/5 to-transparent p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                {(() => {
                  const Icon = platformDetails[detectedPlatform as MobilePlatform].icon;
                  return <Icon className="h-8 w-8 text-accent" />;
                })()}
              </div>
              <h3 className="text-xl font-semibold">
                Rail Gun for {platformDetails[detectedPlatform as MobilePlatform].name}
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                {platformDetails[detectedPlatform as MobilePlatform].requirements}
              </p>
              <div className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-accent/20 px-8 py-4 text-lg font-semibold text-accent">
                <Smartphone className="h-5 w-5" />
                Coming Soon
              </div>
              <p className="mt-3 text-sm text-foreground-secondary">
                We&apos;re working hard on mobile apps. Download on desktop in the meantime!
              </p>
            </div>
          </div>
        )}

        {/* Desktop Platforms */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="mb-8 text-center text-lg font-semibold text-foreground-secondary">
            Desktop Apps
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {desktopPlatforms.map((platform) => {
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
                    <Icon className={`h-8 w-8 ${isPrimary ? 'text-white' : 'text-foreground-secondary'}`} />
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

        {/* Mobile Platforms */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h3 className="mb-8 text-center text-lg font-semibold text-foreground-secondary">
            Mobile Apps
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {mobilePlatforms.map((platform) => {
              const details = platformDetails[platform];
              const isPrimary = platform === detectedPlatform;
              const Icon = details.icon;

              return (
                <div
                  key={platform}
                  className={`card flex flex-col items-center gap-4 text-center transition-all ${
                    isPrimary
                      ? 'ring-2 ring-accent/50 ring-offset-2 ring-offset-background-primary'
                      : ''
                  }`}
                >
                  <div className="rounded-xl p-4 bg-background-elevated">
                    <Icon className="h-8 w-8 text-foreground-secondary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{details.name}</h4>
                    <p className="mt-1 text-sm text-foreground-secondary">
                      {details.description}
                    </p>
                  </div>
                  <div className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-foreground-tertiary/20 px-4 py-3 font-semibold text-foreground-secondary">
                    <Smartphone className="h-4 w-4" />
                    Coming Soon
                  </div>
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
                  <a
                    href={siteConfig.downloads.checksums}
                    className="mt-1 block rounded bg-background-elevated p-2 text-xs text-accent hover:underline"
                  >
                    SHA256SUMS.txt
                  </a>
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

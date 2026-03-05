/**
 * Rail Gun Site Configuration
 * 
 * Centralized configuration for the marketing site.
 * 
 * Download URLs point to GitHub Releases for versioned artifacts.
 * In production, you may want to use a CDN or your own hosting.
 */

// GitHub repository info
const GITHUB_REPO = 'ZRosserMcIntosh/railgun';
const RELEASES_BASE = `https://github.com/${GITHUB_REPO}/releases`;

// Current version - update this when releasing
// This is overridden by NEXT_PUBLIC_APP_VERSION env var
const VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '0.2.0';

/**
 * Get download URL for a release artifact
 * Uses GitHub Releases for hosting
 * Note: GitHub replaces spaces in filenames with dots
 */
function getDownloadUrl(filename: string): string {
  return `${RELEASES_BASE}/download/v${VERSION}/${encodeURIComponent(filename)}`;
}

// Current release tag (may differ from VERSION for artifact naming)
const RELEASE_TAG = VERSION;

export const siteConfig = {
  name: 'Rail Gun',
  description: 'Secure private messaging with end-to-end encryption',
  url: 'https://railgun.chat',
  webAppUrl: 'https://app.railgun.chat',
  githubUrl: `https://github.com/${GITHUB_REPO}`,
  
  version: VERSION,
  
  downloads: {
    mac: {
      dmg: getDownloadUrl(`Rail.Gun-${VERSION}-arm64.dmg`),
      dmgIntel: getDownloadUrl(`Rail.Gun-${VERSION}-x64.dmg`),
      zip: getDownloadUrl(`Rail.Gun-${VERSION}-arm64.zip`),
    },
    windows: {
      exe: getDownloadUrl(`Rail.Gun-${VERSION}-Setup.exe`),
    },
    linux: {
      appImage: getDownloadUrl(`Rail.Gun-${VERSION}.AppImage`),
      deb: getDownloadUrl(`Rail.Gun-${VERSION}_amd64.deb`),
    },
    checksums: getDownloadUrl('SHA256SUMS.txt'),
    // Latest release page for all platforms
    latest: `${RELEASES_BASE}/latest`,
    // All releases page
    all: RELEASES_BASE,
  },
  
  links: {
    docs: 'https://docs.railgun.chat',
    charter: '/charter',
    security: '/security',
    privacy: '/privacy',
    terms: '/terms',
    releases: `${RELEASES_BASE}`,
    issues: `https://github.com/${GITHUB_REPO}/issues`,
  },
  
  social: {
    twitter: 'https://twitter.com/railgunapp',
    github: `https://github.com/${GITHUB_REPO}`,
  },
};

export type SiteConfig = typeof siteConfig;

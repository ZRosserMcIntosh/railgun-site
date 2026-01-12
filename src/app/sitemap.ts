import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://railgun.app';
  
  // Main routes
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/charter', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/node-mode', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/security', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/terms', changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  // Generate sitemap entries for all routes
  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    // Add alternate language versions
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [
          locale,
          `${baseUrl}${route.path}${route.path ? '' : ''}?locale=${locale}`,
        ])
      ),
    },
  }));

  return sitemapEntries;
}

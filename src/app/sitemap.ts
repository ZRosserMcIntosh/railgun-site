import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://railgun.chat';

  // Main routes - only list actual crawlable URLs
  // Note: locale alternates removed because locale switching is client-side only
  // (via cookie). Adding sitemap alternates for ?locale=xx URLs would mislead
  // search engines since the content served is based on cookie, not URL.
  //
  // lastModified should be updated when page content materially changes.
  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
    lastModified: string; // ISO date string
  }[] = [
    { path: '',                  changeFrequency: 'weekly',   priority: 1.0,  lastModified: '2026-03-08' },
    { path: '/charter',          changeFrequency: 'monthly',  priority: 0.9,  lastModified: '2026-02-15' },
    { path: '/node-mode',        changeFrequency: 'monthly',  priority: 0.85, lastModified: '2026-01-20' },
    { path: '/download',         changeFrequency: 'weekly',   priority: 0.9,  lastModified: '2026-03-08' },
    { path: '/pricing',          changeFrequency: 'monthly',  priority: 0.85, lastModified: '2026-02-10' },
    { path: '/mail',             changeFrequency: 'monthly',  priority: 0.8,  lastModified: '2026-01-15' },
    { path: '/status',           changeFrequency: 'always',   priority: 0.6,  lastModified: '2026-03-08' },
    { path: '/security',         changeFrequency: 'monthly',  priority: 0.8,  lastModified: '2026-02-20' },
    { path: '/encryption',       changeFrequency: 'monthly',  priority: 0.8,  lastModified: '2026-02-20' },
    { path: '/threat-detection', changeFrequency: 'monthly',  priority: 0.8,  lastModified: '2026-03-08' },
    { path: '/privacy',          changeFrequency: 'yearly',   priority: 0.5,  lastModified: '2025-12-01' },
    { path: '/terms',            changeFrequency: 'yearly',   priority: 0.5,  lastModified: '2025-12-01' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

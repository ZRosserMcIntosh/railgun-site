import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://railgun.chat';
  
  // Main routes - only list actual crawlable URLs
  // Note: locale alternates removed because locale switching is client-side only
  // (via cookie). Adding sitemap alternates for ?locale=xx URLs would mislead 
  // search engines since the content served is based on cookie, not URL.
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/charter', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/node-mode', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/download', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/mail', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/status', changeFrequency: 'always' as const, priority: 0.6 },
    { path: '/security', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/encryption', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/threat-detection', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/privacy', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/terms', changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

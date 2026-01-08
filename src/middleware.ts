import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

// Get the preferred locale from Accept-Language header
function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header and find the best match
  const preferredLocales = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, quality] = lang.trim().split(';q=');
      return {
        locale: locale.split('-')[0].toLowerCase(), // Get language code (e.g., 'en' from 'en-US')
        quality: quality ? parseFloat(quality) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first match in our supported locales
  for (const { locale } of preferredLocales) {
    if (locales.includes(locale as Locale)) {
      return locale as Locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  // Check if there's a locale cookie set
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  
  // If no cookie, detect from browser
  if (!localeCookie) {
    const detectedLocale = getPreferredLocale(request);
    
    // Create response and set the cookie
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except static files and API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

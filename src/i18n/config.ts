/**
 * Internationalization Configuration
 * 
 * Supported languages for Railgun - prioritizing regions where
 * secure communication infrastructure is most needed.
 */

export const locales = [
  'en',    // English (default)
  'es',    // Spanish
  'pt',    // Portuguese
  'fr',    // French
  'de',    // German
  'it',    // Italian
  'uk',    // Ukrainian
  'ru',    // Russian
  'pl',    // Polish
  'hu',    // Hungarian
  'ko',    // Korean
  'ja',    // Japanese
  'zh',    // Chinese (Simplified)
  'fa',    // Persian/Farsi (Iran)
  'ar',    // Arabic
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// RTL languages
export const rtlLocales: Locale[] = ['ar', 'fa'];

// Language display names (in their native script)
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  uk: 'Українська',
  ru: 'Русский',
  pl: 'Polski',
  hu: 'Magyar',
  ko: '한국어',
  ja: '日本語',
  zh: '中文',
  fa: 'فارسی',
  ar: 'العربية',
};

// Language flags (using country codes for flag emojis)
export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  pt: '🇧🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  uk: '🇺🇦',
  ru: '🇷🇺',
  pl: '🇵🇱',
  hu: '🇭🇺',
  ko: '🇰🇷',
  ja: '🇯🇵',
  zh: '🇨🇳',
  fa: '🇮🇷',
  ar: '🇸🇦',
};

/**
 * Detect locale from Accept-Language header
 */
export function getLocaleFromHeaders(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      return {
        code: code.split('-')[0].toLowerCase(), // Get primary language code
        quality: parseFloat(q.replace('q=', '')) || 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Find first matching locale
  for (const { code } of languages) {
    if (locales.includes(code as Locale)) {
      return code as Locale;
    }
  }
  
  return defaultLocale;
}

/**
 * Check if locale is RTL
 */
export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

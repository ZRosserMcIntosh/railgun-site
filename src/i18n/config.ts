/**
 * Internationalization Configuration
 * 
 * Supported languages for Railgun - prioritizing regions where
 * secure communication infrastructure is most needed.
 */

export const locales = [
  'en',    // English (default)
  'zh',    // Chinese (Simplified)
  'hi',    // Hindi
  'es',    // Spanish
  'fr',    // French
  'ar',    // Arabic
  'bn',    // Bengali
  'pt',    // Portuguese
  'ru',    // Russian
  'ja',    // Japanese
  'id',    // Indonesian
  'de',    // German
  'ko',    // Korean
  'tr',    // Turkish
  'vi',    // Vietnamese
  'it',    // Italian
  'pl',    // Polish
  'uk',    // Ukrainian
  'fa',    // Persian/Farsi
  'hu',    // Hungarian
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// RTL languages
export const rtlLocales: Locale[] = ['ar', 'fa'];

// Language display names (in their native script)
export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  bn: 'বাংলা',
  pt: 'Português',
  ru: 'Русский',
  ja: '日本語',
  id: 'Bahasa Indonesia',
  de: 'Deutsch',
  ko: '한국어',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  it: 'Italiano',
  pl: 'Polski',
  uk: 'Українська',
  fa: 'فارسی',
  hu: 'Magyar',
};

// Language flags (using country codes for flag emojis)
export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '��',
  hi: '��',
  es: '🇪🇸',
  fr: '🇫🇷',
  ar: '��',
  bn: '��',
  pt: '��',
  ru: '🇷🇺',
  ja: '��🇵',
  id: '�🇩',
  de: '��',
  ko: '🇰🇷',
  tr: '🇹🇷',
  vi: '🇻🇳',
  it: '🇮�',
  pl: '🇵🇱',
  uk: '��',
  fa: '🇮🇷',
  hu: '��',
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

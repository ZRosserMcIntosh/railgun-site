'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Locale, defaultLocale, locales, isRtlLocale } from '@/i18n/config';

// Import default messages at build time for SSR fallback
import defaultMessages from '@/i18n/messages/en.json';

type Messages = Record<string, unknown>;

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

// Helper to get nested value from object using dot notation
function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  
  return typeof current === 'string' ? current : undefined;
}

// Helper to interpolate params in string
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key]?.toString() ?? `{${key}}`;
  });
}

export function I18nProvider({ 
  children, 
  initialLocale,
  initialMessages 
}: { 
  children: ReactNode;
  initialLocale: Locale;
  initialMessages: Messages;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Messages>(initialMessages);
  const [isRtl, setIsRtl] = useState(isRtlLocale(initialLocale));

  // Load messages for a locale
  const loadMessages = useCallback(async (newLocale: Locale) => {
    try {
      const msgs = await import(`@/i18n/messages/${newLocale}.json`);
      return msgs.default || msgs;
    } catch {
      console.warn(`Failed to load messages for locale: ${newLocale}`);
      const fallback = await import(`@/i18n/messages/${defaultLocale}.json`);
      return fallback.default || fallback;
    }
  }, []);

  // Set locale and persist to cookie
  const setLocale = useCallback(async (newLocale: Locale) => {
    if (!locales.includes(newLocale)) {
      console.warn(`Invalid locale: ${newLocale}`);
      return;
    }

    // Set cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    
    // Load new messages
    const newMessages = await loadMessages(newLocale);
    
    // Update state
    setMessages(newMessages);
    setLocaleState(newLocale);
    setIsRtl(isRtlLocale(newLocale));
    
    // Update HTML attributes
    document.documentElement.lang = newLocale;
    document.documentElement.dir = isRtlLocale(newLocale) ? 'rtl' : 'ltr';
  }, [loadMessages]);

  // Translation function
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const value = getNestedValue(messages, key);
    if (value === undefined) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return interpolate(value, params);
  }, [messages]);

  // Set initial HTML attributes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [locale, isRtl]);

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale, t, isRtl }}>
      {children}
    </I18nContext.Provider>
  );
}

// Safe fallback translation function for SSR
function createFallbackT() {
  return (key: string, params?: Record<string, string | number>): string => {
    const value = getNestedValue(defaultMessages, key);
    if (value === undefined) {
      return key;
    }
    return interpolate(value, params);
  };
}

export function useI18n() {
  const context = useContext(I18nContext);
  
  // Return a safe fallback for SSR/build time
  if (!context) {
    return {
      locale: defaultLocale,
      messages: defaultMessages as Messages,
      setLocale: () => {},
      t: createFallbackT(),
      isRtl: false,
    };
  }
  
  return context;
}

export function useTranslations(namespace?: string) {
  const { t, locale, isRtl } = useI18n();
  
  const translate = useCallback((key: string, params?: Record<string, string | number>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return t(fullKey, params);
  }, [t, namespace]);
  
  return { t: translate, locale, isRtl };
}

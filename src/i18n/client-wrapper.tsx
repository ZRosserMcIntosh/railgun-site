'use client';

import { useEffect, useState, ReactNode } from 'react';
import { I18nProvider } from './provider';
import { Locale, defaultLocale, locales } from './config';

// Get locale from cookie on client side
function getLocaleFromCookie(): Locale | null {
  if (typeof document === 'undefined') return null;
  
  const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
  if (match && locales.includes(match[1] as Locale)) {
    return match[1] as Locale;
  }
  return null;
}

interface I18nClientWrapperProps {
  children: ReactNode;
}

export function I18nClientWrapper({ children }: I18nClientWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function init() {
      // Get locale from cookie or use default
      const cookieLocale = getLocaleFromCookie();
      const initialLocale = cookieLocale || defaultLocale;
      
      // Load messages
      try {
        const msgs = await import(`@/i18n/messages/${initialLocale}.json`);
        setMessages(msgs.default || msgs);
        setLocale(initialLocale);
      } catch {
        const fallback = await import(`@/i18n/messages/${defaultLocale}.json`);
        setMessages(fallback.default || fallback);
        setLocale(defaultLocale);
      }
      
      setMounted(true);
    }
    
    init();
  }, []);

  // Show loading state or just render children without translations
  if (!mounted || !messages) {
    // Return a minimal shell to prevent layout shift
    return (
      <div className="min-h-screen bg-background-primary">
        {children}
      </div>
    );
  }

  return (
    <I18nProvider initialLocale={locale} initialMessages={messages}>
      {children}
    </I18nProvider>
  );
}

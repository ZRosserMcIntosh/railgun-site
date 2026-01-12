'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useI18n, useTranslations } from '@/i18n/provider';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const { t } = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Wait for mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  // Show a placeholder during SSR/initial load
  if (!mounted) {
    return (
      <div className={cn('relative', className)}>
        <button
          type="button"
          className={cn(
            'flex items-center gap-2 rounded-lg transition-colors',
            variant === 'compact'
              ? 'p-2 hover:bg-background-secondary'
              : 'bg-background-secondary px-3 py-2 text-sm hover:bg-background-elevated'
          )}
          aria-label="Language"
        >
          <Globe className="h-4 w-4 text-foreground-secondary" />
          {variant === 'default' && (
            <>
              <span className="text-foreground-secondary">🇺🇸</span>
              <span className="hidden sm:inline">English</span>
              <ChevronDown className="h-4 w-4 text-foreground-secondary" />
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-lg transition-colors',
          variant === 'compact'
            ? 'p-2 hover:bg-background-secondary'
            : 'bg-background-secondary px-3 py-2 text-sm hover:bg-background-elevated'
        )}
        aria-label={t('language')}
        {...(isOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 text-foreground-secondary" />
        {variant === 'default' && (
          <>
            <span className="text-foreground-secondary">{localeFlags[locale]}</span>
            <span className="hidden sm:inline">{localeNames[locale]}</span>
            <ChevronDown className={cn(
              'h-4 w-4 text-foreground-secondary transition-transform',
              isOpen && 'rotate-180'
            )} />
          </>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute end-0 top-full z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-xl border border-foreground-secondary/10 bg-background-primary shadow-xl"
          role="listbox"
          aria-label={t('language')}
        >
          <div className="p-2">
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleLocaleChange(loc)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start text-sm transition-colors',
                  locale === loc
                    ? 'bg-accent/10 text-accent'
                    : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground-primary'
                )}
                role="option"
                {...(locale === loc ? { 'aria-selected': 'true' } : { 'aria-selected': 'false' })}
              >
                <span className="text-lg">{localeFlags[loc]}</span>
                <span className="flex-1">{localeNames[loc]}</span>
                {locale === loc && (
                  <Check className="h-4 w-4 text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

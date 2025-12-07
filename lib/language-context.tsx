'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { tr } from '@/locales/tr';
import { en } from '@/locales/en';

type Language = 'tr' | 'en';

// Use a more flexible type that works with both locales
type LocaleType = typeof tr | typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  locale: LocaleType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const locales = {
  tr,
  en,
} as const;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start with 'tr' to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>('tr');

  useEffect(() => {
    // Load language preference from localStorage after mount
    try {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language from localStorage:', error);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
    }
  };

  const locale = locales[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, locale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

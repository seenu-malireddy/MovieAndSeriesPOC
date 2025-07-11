import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  languages: Language[];
  changeLanguage: (languageCode: string) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
  },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
        i18n.changeLanguage(language.code);
        document.documentElement.dir = language.dir;
        document.documentElement.lang = language.code;
      }
    }
  }, [i18n]);

  const changeLanguage = (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
      i18n.changeLanguage(language.code);
      document.documentElement.dir = language.dir;
      document.documentElement.lang = language.code;
      localStorage.setItem('language', language.code);
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    languages,
    changeLanguage,
    isRTL: currentLanguage.dir === 'rtl',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
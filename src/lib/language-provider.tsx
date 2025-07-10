
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from 'react';
import { translateTextFlow } from '@/ai/flows/translate-flow';
import { ALL_TEXTS } from '@/lib/translatable-texts';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  translate: (text: string) => string;
  isTranslating: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const translate = useCallback((text: string): string => {
    if (language === 'en' || !text) {
      return text;
    }
    const cacheKey = `${language}:${text}`;
    return translations[cacheKey] || text;
  }, [language, translations]);

  useEffect(() => {
    if (language === 'en') {
      setTranslations({});
      return;
    }

    const translateAllTexts = () => {
      startTransition(async () => {
        try {
          const textsToTranslate = ALL_TEXTS.filter(text => !translations[`${language}:${text}`]);
          if (textsToTranslate.length === 0) return;

          const { translations: newTranslations } = await translateTextFlow({
            texts: textsToTranslate,
            targetLanguage: language,
          });

          setTranslations(prev => {
            const updated = { ...prev };
            for (const original in newTranslations) {
              const cacheKey = `${language}:${original}`;
              updated[cacheKey] = newTranslations[original];
            }
            return updated;
          });
        } catch (error) {
          console.error("Translation error:", error);
        }
      });
    };

    translateAllTexts();
  }, [language]);


  const contextValue = {
    language,
    setLanguage,
    translate,
    isTranslating: isPending,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

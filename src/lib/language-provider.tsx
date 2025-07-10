
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from 'react';
import { translateTextFlow } from '@/ai/flows/translate-flow';

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
    // The translation logic will use a cache of translated strings
    // The cache key includes the language to avoid conflicts
    const cacheKey = `${language}:${text}`;
    return translations[cacheKey] || text;
  }, [language, translations]);

  useEffect(() => {
    if (language === 'en') {
      setTranslations({});
      return;
    }

    const collectAllTextNodes = () => {
      const texts = new Set<string>();
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let node;
      while (node = walk.nextNode()) {
        if (node.textContent?.trim()) {
            const text = node.textContent.trim();
            const cacheKey = `${language}:${text}`;
            if (!translations[cacheKey]) {
               texts.add(text);
            }
        }
      }
      return Array.from(texts);
    };
    
    const textsToTranslate = collectAllTextNodes();
    
    if (textsToTranslate.length > 0) {
      startTransition(async () => {
        try {
          const { translations: newTranslations } = await translateTextFlow({ texts: textsToTranslate, targetLanguage: language });
          
          setTranslations(prev => {
            const updated = {...prev};
            for(const original in newTranslations) {
                const cacheKey = `${language}:${original}`;
                updated[cacheKey] = newTranslations[original];
            }
            return updated;
          });

        } catch (error) {
          console.error("Translation error:", error);
        }
      });
    }
    
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

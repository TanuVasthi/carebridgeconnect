
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

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

    const collectAndTranslateTexts = () => {
      const textsToTranslate = new Set<string>();
      
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walk.nextNode())) {
        const text = node.textContent?.trim();
        // Simple filter to avoid translating code, symbols, or very short strings.
        if (text && text.length > 1 && text.match(/[a-zA-Z]/)) {
          const cacheKey = `${language}:${text}`;
          if (!translations[cacheKey]) {
            textsToTranslate.add(text);
          }
        }
      }

      if (textsToTranslate.size > 0) {
        startTransition(async () => {
          try {
            const { translations: newTranslations } = await translateTextFlow({
              texts: Array.from(textsToTranslate),
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
      }
    };
    
    // We use a short timeout to allow the new page's content to render before we collect text.
    const timeoutId = setTimeout(collectAndTranslateTexts, 100);

    return () => clearTimeout(timeoutId);

  }, [language, pathname]);


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

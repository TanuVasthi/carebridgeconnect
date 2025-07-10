
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

    const observer = new MutationObserver((mutations) => {
      startTransition(async () => {
        const newTexts = new Set<string>();
        
        document.querySelectorAll('body, body *').forEach(el => {
            if (el.shadowRoot) return; // Don't touch shadow DOM
            Array.from(el.childNodes).forEach(node => {
              if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                const text = node.textContent.trim();
                 const cacheKey = `${language}:${text}`;
                if (!translations[cacheKey]) {
                  newTexts.add(text);
                }
              }
            });
        });
        
        if (newTexts.size > 0) {
            try {
              const textsToTranslate = Array.from(newTexts);
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
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Initial translation
    startTransition(() => {
       const initialTexts = new Set<string>();
       document.querySelectorAll('body, body *').forEach(el => {
            if (el.shadowRoot) return; // Don't touch shadow DOM
            Array.from(el.childNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                    initialTexts.add(node.textContent.trim());
                }
            });
        });

       if (initialTexts.size > 0) {
          (async () => {
            const { translations: newTranslations } = await translateTextFlow({ texts: Array.from(initialTexts), targetLanguage: language });
            setTranslations(prev => {
                const updated = {...prev};
                for(const original in newTranslations) {
                    const cacheKey = `${language}:${original}`;
                    updated[cacheKey] = newTranslations[original];
                }
                return updated;
              });
          })();
       }
    });


    return () => observer.disconnect();
  }, [language, translations]);


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

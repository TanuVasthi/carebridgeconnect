
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

    const collectTexts = () => {
      const texts = new Set<string>();
      document.querySelectorAll('body, body *').forEach(el => {
        if (el.shadowRoot) return; // Don't touch shadow DOM
        Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const text = node.textContent.trim();
            const cacheKey = `${language}:${text}`;
            // Use the current translations state via a getter inside the async function
            // to avoid adding it to dependencies.
            if (!translations[cacheKey]) {
               texts.add(text);
            }
          }
        });
      });
      return Array.from(texts);
    }
    
    const runTranslation = (textsToTranslate: string[]) => {
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
    }

    const observer = new MutationObserver((mutations) => {
        const newTexts = collectTexts();
        if (newTexts.length > 0) {
            runTranslation(newTexts);
        }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Initial translation
    const initialTexts = collectTexts();
    runTranslation(initialTexts);


    return () => observer.disconnect();
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

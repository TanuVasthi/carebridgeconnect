
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from 'react';
import { translateText } from '@/ai/flows/translate-flow';

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
    const observer = new MutationObserver((mutations) => {
      if (language === 'en') return;

      const newTexts = new Set<string>();
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                 newTexts.add(node.textContent.trim());
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                element.querySelectorAll<HTMLElement>(':not(script):not(style)')
                 .forEach(el => {
                    if (el.innerText && el.innerText.trim()) {
                        // Check if it has only text content
                        if (Array.from(el.childNodes).every(cn => cn.nodeType === Node.TEXT_NODE) && el.innerText.trim()) {
                             newTexts.add(el.innerText.trim());
                        }
                    }
                });
            }
          });
        }
      });

      if (newTexts.size > 0) {
        startTransition(async () => {
          const textsToTranslate: string[] = [];
          newTexts.forEach(text => {
            const cacheKey = `${language}:${text}`;
            if (!translations[cacheKey]) {
              textsToTranslate.push(text);
            }
          });

          if (textsToTranslate.length > 0) {
            try {
              const newTranslations = await translateText({ texts: textsToTranslate, targetLanguage: language });
              setTranslations(prev => ({ ...prev, ...newTranslations.translations }));
            } catch (error) {
              console.error("Translation error:", error);
            }
          }
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
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

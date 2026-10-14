import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'km';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isKhmer: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('luangme_lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('luangme_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'km' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        isKhmer: lang === 'km',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

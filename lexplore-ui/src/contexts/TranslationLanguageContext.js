import { createContext, useContext, useState, useEffect } from "react";

const TranslationLanguageContext = createContext();

export const useTranslationLanguage = () => useContext(TranslationLanguageContext);

export const TranslationLanguageProvider = ({ children }) => {
  const [translationLanguage, setTranslationLanguage] = useState(() => {
    return localStorage.getItem("translationLanguage") || "sv";
  });

  useEffect(() => {
    localStorage.setItem("translationLanguage", translationLanguage);
  }, [translationLanguage]);

  return (
    <TranslationLanguageContext.Provider value={{ translationLanguage, setTranslationLanguage }}>
      {children}
    </TranslationLanguageContext.Provider>
  );
};

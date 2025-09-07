import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { SUPPORTED_LANGUAGES, DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from "../constants";

const isSupported = (code) => SUPPORTED_LANGUAGES.some((l) => l.code === code);

const detectInitialLocale = () => {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (saved && isSupported(saved)) return saved;

  return DEFAULT_LOCALE;
};

const I18nContext = createContext(null);

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
};

const loadMessages = async (locale) => (await import(`../i18n/${locale}.json`)).default;

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(detectInitialLocale);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const loaded = await loadMessages(locale);
        if (!cancelled) setMessages(loaded);
        localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, supported: SUPPORTED_LANGUAGES }), [locale]);

  if (loading) return null;

  return (
    <I18nContext.Provider value={value}>
      <IntlProvider key={locale} locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};

import i18n from 'i18next';
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from 'react-i18next';

import translationRU from './locales/ru/translation.json';

// the translations
const resources = {
  ru: {
    translation: translationRU
  }
};

i18n
  // load translation using xhr -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-xhr-backend

  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: "ru",
    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;

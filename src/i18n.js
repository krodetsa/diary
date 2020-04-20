import i18n from 'i18next';
// import i18next from "i18next";
import { initReactI18next, I18nextProvider } from 'react-i18next';

import translationRU from './locales/ru/translation.json';
import translationKG from './locales/kg/translation.json';

// the translations
const resources = {
  ru: {
    translation: translationRU
  },
  kg: {
    translation: translationKG
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lan'),
    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;

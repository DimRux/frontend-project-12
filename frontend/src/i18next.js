import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const initI18next = async () => {
  await i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
};

export default initI18next;

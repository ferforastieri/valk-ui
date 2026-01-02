import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ptTranslations from './pt'
import enTranslations from './en'
import esTranslations from './es'

const resources = {
  pt: { translation: ptTranslations },
  en: { translation: enTranslations },
  es: { translation: esTranslations },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: (() => {
      const saved = localStorage.getItem('language')
      if (saved && ['pt', 'en', 'es'].includes(saved)) {
        return saved
      }
      const browserLang = navigator.language || (navigator as any).userLanguage
      if (browserLang.startsWith('pt')) return 'pt'
      if (browserLang.startsWith('es')) return 'es'
      if (browserLang.startsWith('en')) return 'en'
      return 'pt'
    })(),
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n


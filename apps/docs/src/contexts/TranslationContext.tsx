import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Language, type Translations } from '../translations'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      return saved
    }
    const browserLang = navigator.language || (navigator as any).userLanguage
    if (browserLang.startsWith('pt')) return 'pt'
    if (browserLang.startsWith('es')) return 'es'
    if (browserLang.startsWith('en')) return 'en'
    return 'pt'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}


import { useState, useEffect } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Navigation, ThemeToggle } from '@/components'
import { useTranslation } from '../contexts/TranslationContext'
import { 
  BookOpenIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const location = useLocation()
  const { t, language, setLanguage } = useTranslation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navigationItems = [
    { name: t.nav.docs, href: '/docs', icon: BookOpenIcon },
    { name: t.nav.components, href: '/components', icon: CodeBracketIcon },
    { name: t.nav.changelog, href: '/changelog', icon: DocumentTextIcon },
  ]

  const languages = [
    { code: 'pt' as const, name: 'PT', flag: '🇧🇷' },
    { code: 'en' as const, name: 'EN', flag: '🇺🇸' },
    { code: 'es' as const, name: 'ES', flag: '🇪🇸' },
  ]

  const logo = (
    <RouterLink to="/" className="flex items-center gap-2">
      <img src="/logo.png" alt="Valk UI" className="h-8 w-8" />
      <span className="text-xl font-bold text-foreground">Valk UI</span>
    </RouterLink>
  )

  const rightContent = (
    <>
      <div className="hidden md:flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder={t.nav.search}
            className="w-64 h-9 rounded-md border border-border bg-background px-3 pl-9 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Select language"
        >
          <GlobeAltIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.name}
          </span>
        </button>
        {showLanguageMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowLanguageMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-md shadow-lg z-20">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setShowLanguageMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2 ${
                    language === lang.code ? 'bg-muted font-medium' : ''
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <ThemeToggle
        theme={isDark ? 'dark' : 'light'}
        onToggle={toggleTheme}
        variant="ghost"
        size="md"
      />
    </>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        items={navigationItems}
        logo={logo}
        rightContent={rightContent}
        currentPath={location.pathname}
        LinkComponent={RouterLink}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  )
}

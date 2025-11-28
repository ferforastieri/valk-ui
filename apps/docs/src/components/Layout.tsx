import { useState, useEffect, Fragment } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { Navigation, ThemeToggle } from '@/components'
import { cn } from '@/lib'
import { useTranslation } from '../contexts/TranslationContext'
import { useCommandPalette } from './CommandPalette'
import { 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  DocumentTextIcon,
  CubeIcon,
  SwatchIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

function LayoutContent({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<{ y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ y: number } | null>(null)
  const location = useLocation()
  const { t, language, setLanguage } = useTranslation()
  const { setOpen: setCommandOpen } = useCommandPalette()

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceY = touchStart.y - touchEnd.y
    const isUpSwipe = distanceY < -minSwipeDistance

    if (isUpSwipe) {
      setMobileMenuOpen(false)
    }
  }

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
    { 
      name: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    { 
      name: t.nav.docs, 
      href: '/docs',
      icon: DocumentTextIcon,
    },
    { 
      name: t.nav.components, 
      href: '/components',
      icon: CubeIcon,
    },
    { 
      name: 'Colors', 
      href: '/colors',
      icon: SwatchIcon,
    },
    { 
      name: t.nav.changelog, 
      href: '/changelog',
      icon: ClockIcon,
    },
  ]

  const languages = [
    { code: 'pt' as const, name: 'PT', flag: '🇧🇷' },
    { code: 'en' as const, name: 'EN', flag: '🇺🇸' },
    { code: 'es' as const, name: 'ES', flag: '🇪🇸' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  const logo = (
    <RouterLink to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
      <img src="/logo.png" alt="Valk UI" className="h-8 w-8" />
      <span className="text-xl font-bold text-foreground">Valk UI</span>
    </RouterLink>
  )

  const rightContent = (
    <div className="flex items-center gap-2">
      <div className="hidden md:flex items-center">
        <button
          onClick={() => setCommandOpen(true)}
          className="relative w-64 h-9 rounded-md border border-border bg-background text-sm text-muted-foreground flex items-center hover:bg-muted transition-colors"
        >
          <div className="absolute left-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </div>
          <span className="pl-9 pr-2 flex-1 text-left">{t.nav.search}</span>
          <kbd className="hidden lg:flex mr-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors"
          aria-label="Select language"
        >
          <span className="text-base">{currentLanguage.flag}</span>
          <span className="text-sm font-medium text-foreground hidden sm:inline">{currentLanguage.name}</span>
        </button>
        {showLanguageMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowLanguageMenu(false)}
            />
            <div className="absolute right-0 mt-1.5 w-36 bg-popover border border-border rounded-md shadow-md z-20 overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setShowLanguageMenu(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2.5 ${
                    language === lang.code 
                      ? 'bg-accent text-accent-foreground font-medium' 
                      : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && (
                    <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
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
    </div>
  )

  const hasSidebar = location.pathname.startsWith('/components')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation
        items={navigationItems}
        logo={
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Bars3Icon className="h-5 w-5 text-foreground" />
            </button>
            {logo}
          </div>
        }
        rightContent={rightContent}
        currentPath={location.pathname}
        LinkComponent={RouterLink}
      />

      {/* Mobile Navigation Menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300 transform"
              enterFrom="-translate-y-full opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="-translate-y-full opacity-0"
            >
              <Dialog.Panel 
                className="relative w-full max-w-md mx-4 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Handle bar para puxar */}
                <div className="flex items-center justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                  <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Valk UI" className="h-8 w-8" />
                    <span className="text-lg font-bold text-foreground">Valk UI</span>
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <XMarkIcon className="h-5 w-5 text-foreground" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="px-4 py-4">
                  <div className="space-y-1">
                    {navigationItems.map((item) => {
                      const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                      const Icon = item.icon || HomeIcon
                      return (
                        <RouterLink
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                            isActive
                              ? 'text-foreground bg-accent shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                          )}
                        >
                          <Icon className={cn(
                            'h-5 w-5 flex-shrink-0',
                            isActive ? 'text-foreground' : 'text-muted-foreground'
                          )} />
                          <span className="text-sm font-medium">{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-foreground" />
                          )}
                        </RouterLink>
                      )
                    })}
                  </div>
                </nav>

                {/* Footer Actions */}
                <div className="border-t border-border px-4 py-4 space-y-3 bg-muted/30">
                  <button
                    onClick={() => {
                      setCommandOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground rounded-xl border border-border bg-background hover:bg-muted hover:text-foreground transition-all"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <span>{t.nav.search}</span>
                    <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <button
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-xl border border-border bg-background hover:bg-muted transition-colors"
                        aria-label="Select language"
                      >
                        <span className="text-lg">{currentLanguage.flag}</span>
                        <span className="text-foreground">{currentLanguage.name}</span>
                      </button>
                      {showLanguageMenu && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowLanguageMenu(false)}
                          />
                          <div className="absolute bottom-full left-0 mb-2 w-full bg-popover border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => {
                                  setLanguage(lang.code)
                                  setShowLanguageMenu(false)
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3 ${
                                  language === lang.code 
                                    ? 'bg-accent text-accent-foreground font-medium' 
                                    : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                              >
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.name}</span>
                                {language === lang.code && (
                                  <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
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
                      className="border border-border rounded-xl"
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className={cn(
        "flex-1",
        hasSidebar ? "flex overflow-hidden" : "mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10 lg:px-10"
      )}>
        {children}
      </main>
    </div>
  )
}

export default function Layout({ children }: LayoutProps) {
  return <LayoutContent>{children}</LayoutContent>
}

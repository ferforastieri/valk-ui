import { useState, useEffect, useRef } from 'react'
import { Sidebar, type SidebarNavigationItem } from '@/components'
import { 
  HomeIcon,
  BookOpenIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const minSwipeDistance = 50
  const maxVerticalSwipe = 100
  const scrollThreshold = 10

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
    setIsScrolling(false)
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
      setScrollTimeout(null)
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })

    if (touchStart && touchEnd) {
      const distanceY = Math.abs(touchStart.y - e.targetTouches[0].clientY)
      const distanceX = Math.abs(touchStart.x - e.targetTouches[0].clientX)
      
      if (distanceY > distanceX && distanceY > scrollThreshold) {
        setIsScrolling(true)
        
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }
        const timeout = setTimeout(() => {
          setIsScrolling(false)
        }, 150)
        setScrollTimeout(timeout)
      }
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    if (isScrolling) {
      return
    }

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)

    if (isRightSwipe && isHorizontalSwipe && Math.abs(distanceY) < maxVerticalSwipe) {
      setSidebarOpen(true)
    }
    
    if (isLeftSwipe && isHorizontalSwipe && Math.abs(distanceY) < maxVerticalSwipe) {
      setSidebarOpen(false)
    }

    if (isUpSwipe && isVerticalSwipe && Math.abs(distanceX) < maxVerticalSwipe) {
      setSidebarOpen(false)
    }
  }

  const navigation: SidebarNavigationItem[] = [
    { name: 'INÍCIO', href: '/', icon: HomeIcon },
    { name: 'DOCUMENTAÇÃO', href: '/docs', icon: BookOpenIcon },
    { name: 'COMPONENTES', href: '/components', icon: CodeBracketIcon },
    { name: 'CHANGELOG', href: '/changelog', icon: DocumentTextIcon },
  ]

  const logo = (
    <div className="flex items-center gap-2">
      <img src="/logo.png" alt="Valk UI" className="h-10 w-10" />
      {!sidebarCollapsed && (
        <span className="text-xl font-bold text-white">Valk UI</span>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        navigation={navigation}
        logo={logo}
        user={{
          name: 'Demo User',
          email: 'demo@valk-ui.com',
        }}
        onLogout={() => {
          console.log('Logout - Esta é uma demonstração')
        }}
        onChangePassword={() => {
          console.log('Alterar Senha - Esta é uma demonstração')
        }}
        primaryColor="bg-primary"
        showThemeToggle={true}
        onThemeToggle={toggleTheme}
        theme={isDark ? 'dark' : 'light'}
      />

      {/* Header Bar Mobile */}
      <div 
        className="sticky top-0 z-40 bg-primary dark:bg-gray-900 text-white lg:hidden border-b border-white/10 dark:border-gray-700"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg text-white hover:bg-white/10 dark:hover:bg-white/20 transition-colors duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Abrir sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Valk UI" className="h-7 w-7" />
              <span className="text-lg font-bold">Valk UI</span>
            </div>
          </div>
        </div>
      </div>

      <main
        ref={mainRef}
        className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

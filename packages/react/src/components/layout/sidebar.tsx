import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Avatar } from './avatar'
import { cn } from '../../lib'

export interface SidebarNavigationItem {
  name: string
  href: string
  icon: React.ElementType
}

export interface SidebarUser {
  name?: string
  email?: string
  avatar?: string
}

export interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  collapsed?: boolean
  toggleSidebar?: () => void
  navigation: SidebarNavigationItem[]
  logo?: React.ReactNode
  user?: SidebarUser
  onLogout?: () => void
  onChangePassword?: () => void
  primaryColor?: string
  showThemeToggle?: boolean
  onThemeToggle?: () => void
  theme?: 'light' | 'dark'
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed = false,
  toggleSidebar,
  navigation,
  logo,
  user,
  onLogout,
  onChangePassword,
  primaryColor = 'bg-primary',
  showThemeToggle = true,
  onThemeToggle,
  theme = 'light',
}: SidebarProps) {
  const location = useLocation()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)
    const maxVerticalSwipe = 100

    if (isLeftSwipe && isHorizontalSwipe && Math.abs(distanceY) < maxVerticalSwipe) {
      setSidebarOpen(false)
    }

    if (isUpSwipe && isVerticalSwipe && Math.abs(distanceX) < maxVerticalSwipe) {
      setSidebarOpen(false)
    }
  }

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const handleLogout = () => {
    setUserMenuOpen(false)
    onLogout?.()
  }

  const handleChangePassword = () => {
    onChangePassword?.()
    setUserMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen) {
        const target = event.target as Element
        const dropdown = document.querySelector('[data-user-dropdown]')
        const button = document.querySelector('[data-user-button]')
        
        if (dropdown && !dropdown.contains(target) && button && !button.contains(target)) {
          setUserMenuOpen(false)
        }
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const ThemeToggleButton = () => {
    if (!showThemeToggle) return null
    
    return (
      <button
        onClick={onThemeToggle}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
          "border border-white/20 bg-white/10 hover:bg-white/20 text-white h-8 px-3",
          "dark:border-gray-600 dark:bg-gray-700/50 dark:hover:bg-gray-600/50"
        )}
        title={theme === 'dark' ? 'Tema: Escuro' : 'Tema: Claro'}
      >
        {theme === 'dark' ? (
          <SunIcon className="h-4 w-4" />
        ) : (
          <MoonIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Tema: {theme === 'dark' ? 'Escuro' : 'Claro'}</span>
      </button>
    )
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <Dialog.Panel
                className="relative flex w-full flex-1 flex-col"
                ref={sidebarRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className={cn("flex items-center justify-between px-4 py-3 text-white border-b border-white/10 dark:border-gray-700", primaryColor, "dark:bg-gray-900")}>
                  <div className="flex items-center gap-2">
                    {logo}
                  </div>
                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/20 transition-colors duration-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Fechar sidebar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className={cn("flex grow flex-col overflow-y-auto relative", primaryColor, "dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800")}>
                  <div className={cn("absolute inset-0 bg-gradient-to-b", primaryColor, "dark:from-gray-900 dark:to-gray-800")}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <nav className="flex flex-1 flex-col px-6 pt-6">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={classNames(
                                    location.pathname === item.href
                                      ? 'bg-white/20 text-white border-l-4 border-white shadow-lg transform scale-105 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-300'
                                      : 'text-white/80 hover:text-white hover:bg-white/15 hover:shadow-md hover:transform hover:scale-102 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700/50',
                                    'group flex gap-x-3 rounded-lg p-3 text-xs leading-6 font-medium transition-all duration-300 ease-in-out hover:translate-x-1'
                                  )}
                                >
                                  <item.icon
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                    
                    {showThemeToggle && (
                      <div className={cn("flex items-center justify-between border-t border-white/20 dark:border-gray-600 pt-4 mb-4 px-6")}>
                        <span className="text-sm text-white/80 dark:text-gray-300">
                          Tema
                        </span>
                        <ThemeToggleButton />
                      </div>
                    )}
                    
                    {user && (
                      <div className="border-t border-white/20 dark:border-gray-600 pt-4 pb-4 px-6 relative">
                        <p className="text-xs text-white/50 mb-2 px-2">Demonstração</p>
                        <button 
                          data-user-button
                          onClick={handleUserMenuToggle}
                          className="w-full flex items-center space-x-3 group relative cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors text-left"
                        >
                          <Avatar 
                            size="sm" 
                            fallback={user.name || "User"} 
                            src={user.avatar}
                            className="bg-white/20 text-white border border-white/30 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/80 truncate">{user.name || "User"}</p>
                            {user.email && (
                              <p className="text-xs text-white/60 truncate">{user.email}</p>
                            )}
                          </div>
                          <div className="text-white/60 group-hover:text-white transition-colors">
                            <ChevronDownIcon className="h-4 w-4" />
                          </div>
                        </button>
                        
                        {userMenuOpen && (
                          <div data-user-dropdown className="absolute top-full left-6 right-6 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                            {onChangePassword && (
                              <button
                                onClick={handleChangePassword}
                                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <KeyIcon className="h-4 w-4 flex-shrink-0" />
                                <span>Alterar Senha</span>
                              </button>
                            )}
                            {onLogout && (
                              <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <ArrowRightOnRectangleIcon className="h-4 w-4 flex-shrink-0" />
                                <span>Sair</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div
        className={cn("hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300", collapsed ? 'lg:w-20' : 'lg:w-72')}
      >
        <div className={cn("flex grow flex-col overflow-y-auto relative", primaryColor, "dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800")}>
          <div className={cn("absolute inset-0 bg-gradient-to-b", primaryColor, "dark:from-gray-900 dark:to-gray-800")}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className={cn("flex shrink-0 items-center justify-center pt-6 mb-6 transition-all duration-300 overflow-hidden px-6", collapsed ? 'h-0 opacity-0 -translate-y-4' : 'h-28 opacity-100 translate-y-0')}>
              <div className="p-3 transition-all duration-300 hover:scale-105">
                {logo}
              </div>
            </div>
            <nav className="flex flex-1 flex-col px-6">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-white/20 text-white border-l-4 border-white shadow-lg transform scale-105 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-300'
                              : 'text-white/80 hover:text-white hover:bg-white/15 hover:shadow-md hover:transform hover:scale-102 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700/50',
                            'group flex gap-x-3 rounded-lg p-3 text-xs leading-6 font-medium transition-all duration-300 ease-in-out hover:translate-x-1'
                          )}
                        >
                          <item.icon
                            className="h-5 w-5 shrink-0"
                            aria-hidden="true"
                          />
                          {!collapsed && (
                            <span className="transition-opacity duration-300">
                              {item.name}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
            
            {showThemeToggle && (
              <div className={cn("flex", collapsed ? 'flex-col items-center gap-2' : 'items-center justify-between', "border-t border-white/20 dark:border-gray-600 pt-4 mb-4 px-6")}>
                {!collapsed && (
                  <span className="text-sm text-white/80 dark:text-gray-300">
                    Tema
                  </span>
                )}
                <div className={cn("flex", collapsed ? 'flex-col' : 'items-center', "gap-2")}>
                  <ThemeToggleButton />
                  {toggleSidebar && (
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                      onClick={() => toggleSidebar?.()}
                      title={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                    >
                      {collapsed ? (
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {user && (
              <div className="border-t border-white/20 dark:border-gray-600 pt-4 pb-4 px-6 relative">
                {!collapsed && (
                  <p className="text-xs text-white/50 mb-2 px-2">Demonstração</p>
                )}
                <button 
                  data-user-button
                  onClick={handleUserMenuToggle}
                  className={cn("w-full flex items-center group relative cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors text-left", collapsed ? 'justify-center' : 'space-x-3')}
                >
                  <Avatar 
                    size="sm" 
                    fallback={user.name || "User"} 
                    src={user.avatar}
                    className="bg-white/20 text-white border border-white/30 flex-shrink-0"
                  />
                  {!collapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/80 truncate">{user.name || "User"}</p>
                        {user.email && (
                          <p className="text-xs text-white/60 truncate">{user.email}</p>
                        )}
                      </div>
                      <div className="text-white/60 group-hover:text-white transition-colors">
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                    </>
                  )}
                </button>
                
                {userMenuOpen && !collapsed && (
                  <div data-user-dropdown className="absolute bottom-16 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {onChangePassword && (
                      <button
                        onClick={handleChangePassword}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <KeyIcon className="h-4 w-4 flex-shrink-0" />
                        <span>Alterar Senha</span>
                      </button>
                    )}
                    {onLogout && (
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 flex-shrink-0" />
                        <span>Sair</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}


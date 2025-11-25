import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components'
import { SparklesIcon } from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isComponents = location.pathname === '/components'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <SparklesIcon className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Valk UI</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/">
                <Button
                  variant={isHome ? 'primary' : 'ghost'}
                  size="sm"
                >
                  Início
                </Button>
              </Link>
              <Link to="/components">
                <Button
                  variant={isComponents ? 'primary' : 'ghost'}
                  size="sm"
                >
                  Documentação
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}


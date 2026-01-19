import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  DocumentTextIcon,
  CubeIcon,
  CodeBracketIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

export default function Footer() {
  const { t } = useTranslation()

  const navigation = {
    product: [
      { name: t('nav.docs'), href: '/docs', icon: DocumentTextIcon },
      { name: t('nav.components'), href: '/components', icon: CubeIcon },
      { name: t('nav.playground'), href: '/playground', icon: CodeBracketIcon },
      { name: t('nav.changelog'), href: '/changelog', icon: ClockIcon },
    ],
    resources: [
      { name: 'GitHub', href: 'https://github.com/ferforastieri/valk-ui', external: true },
      { name: t('nav.docs'), href: '/docs', external: false },
      { name: t('home.examples'), href: '/playground', external: false },
    ],
    legal: [
      { name: 'MIT License', href: 'https://github.com/ferforastieri/valk-ui/blob/main/LICENSE', external: true },
    ],
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Valk UI" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Valk UI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.product')}</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Valk UI. {t('footer.allRightsReserved')}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/ferforastieri/valk-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


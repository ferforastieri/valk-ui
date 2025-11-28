import { forwardRef } from 'react'
import { cn } from '../../lib'

export interface NavigationItem {
  name: string
  href: string
  icon?: React.ElementType
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavigationItem[]
  logo?: React.ReactNode
  rightContent?: React.ReactNode
  currentPath?: string
  LinkComponent?: React.ComponentType<{ to: string; className?: string; children: React.ReactNode }>
}

const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ className, items, logo, rightContent, currentPath, LinkComponent, ...props }, ref) => {
    const Link = LinkComponent || 'a'
    
    return (
      <nav
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          className
        )}
        {...props}
      >
        <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            {logo && <div className="flex items-center">{logo}</div>}
            <div className="hidden md:flex items-center gap-6">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = currentPath === item.href
                const linkProps = LinkComponent 
                  ? { to: item.href }
                  : { href: item.href }
                
                return (
                  <Link
                    key={item.href}
                    {...linkProps}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-foreground/80',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 inline-block mr-2" />}
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          {rightContent && (
            <div className="flex items-center gap-4">
              {rightContent}
            </div>
          )}
        </div>
      </nav>
    )
  }
)

Navigation.displayName = 'Navigation'

export { Navigation }


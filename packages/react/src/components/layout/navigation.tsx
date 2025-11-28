import { forwardRef } from 'react'
import { cn } from '../../lib'

export interface NavigationItem {
  name: string
  href: string
  icon?: React.ElementType
  hasDropdown?: boolean
  dropdownContent?: React.ReactNode
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
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8">
            {logo && <div className="flex items-center">{logo}</div>}
            <div className="hidden md:flex items-center gap-2">
              {items.map((item) => {
                const isActive = currentPath === item.href || (item.href !== '/' && currentPath?.startsWith(item.href))
                const linkProps = LinkComponent 
                  ? { to: item.href }
                  : { href: item.href }
                
                if (item.hasDropdown && item.dropdownContent) {
                  return (
                    <div key={item.href} className="relative">
                      {item.dropdownContent}
                    </div>
                  )
                }
                
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    {...(LinkComponent ? { to: item.href } : { href: item.href })}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl whitespace-nowrap',
                      isActive
                        ? 'text-foreground bg-accent shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    )}
                  >
                    {Icon && (
                      <Icon className={cn(
                        'h-4 w-4 flex-shrink-0',
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      )} />
                    )}
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="ml-1 w-1.5 h-1.5 rounded-full bg-foreground" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
          {rightContent && (
            <div className="flex items-center">
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

import { forwardRef } from 'react'
import { cn } from '../../lib'

export interface DocsSidebarItem {
  title: string
  href: string
  items?: DocsSidebarItem[]
}

export interface DocsSidebarSection {
  title?: string
  items: DocsSidebarItem[]
}

export interface DocsSidebarProps extends React.HTMLAttributes<HTMLElement> {
  sections: DocsSidebarSection[]
  currentPath?: string
  LinkComponent?: React.ComponentType<{ to?: string; href?: string; className?: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }>
}

const DocsSidebar = forwardRef<HTMLElement, DocsSidebarProps>(
  ({ className, sections, currentPath, LinkComponent, ...props }, ref) => {
    const renderItem = (item: DocsSidebarItem, level: number = 0) => {
      const isActive = currentPath === item.href || currentPath?.startsWith(item.href + '/')
      const hasChildren = item.items && item.items.length > 0

      const linkProps = LinkComponent 
        ? { to: item.href as string }
        : { href: item.href }

      return (
        <li key={item.href} className={cn(level > 0 && 'ml-3')}>
          {LinkComponent ? (
            <LinkComponent
              {...linkProps}
              className={cn(
                'group relative flex min-w-0 items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer',
                level === 0 ? 'font-medium' : 'font-normal',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
              )}
            >
              <span className="min-w-0 flex-1 truncate">{item.title}</span>
              {isActive && (
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              )}
            </LinkComponent>
          ) : (
            <a
              {...linkProps}
              className={cn(
                'group relative flex min-w-0 items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer',
                level === 0 ? 'font-medium' : 'font-normal',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
              )}
            >
              <span className="min-w-0 flex-1 truncate">{item.title}</span>
              {isActive && (
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              )}
            </a>
          )}
          {hasChildren && (
            <ul className="mt-1 space-y-0.5 border-l border-border/80 pl-2">
              {item.items?.map((child) => renderItem(child, level + 1))}
            </ul>
          )}
        </li>
      )
    }

    return (
      <aside
        ref={ref}
        className={cn(
          'fixed bottom-0 left-0 top-14 z-30 hidden w-72 flex-col border-r border-border bg-background/95 backdrop-blur lg:flex',
          className
        )}
        {...props}
      >
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            <div className="mb-4 flex items-center justify-between px-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Componentes
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {sections.reduce((total, section) => total + section.items.length, 0)}
              </span>
            </div>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className={cn(sectionIndex > 0 && 'mt-6')}>
                {section.title && (
                  <div className="mb-2 flex items-center justify-between px-3">
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.title}
                    </h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {section.items.length}
                    </span>
                  </div>
                )}
                <ul className="space-y-0.5">
                  {section.items.map((item) => renderItem(item))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    )
  }
)

DocsSidebar.displayName = 'DocsSidebar'

export { DocsSidebar }

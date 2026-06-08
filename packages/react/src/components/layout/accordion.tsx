import { forwardRef, ReactNode, useId } from 'react'
import { ChevronDownIcon } from '../icons'
import { cn } from '../../lib'

export interface AccordionItemProps {
  value: string
  trigger: ReactNode
  content: ReactNode
  defaultOpen?: boolean
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItemProps[]
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, items, type = 'single', defaultValue, ...props }, ref) => {
    const accordionName = useId()
    const defaultOpenItems = defaultValue
      ? Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      : items.filter(item => item.defaultOpen).map(item => item.value)

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {items.map((item) => {
          return (
            <details
              key={item.value}
              className="group/accordion rounded-xl border border-border bg-popover overflow-hidden shadow-sm transition-all duration-200"
              {...(type === 'single' ? { name: accordionName } : {})}
              {...(defaultOpenItems.includes(item.value) ? { open: true } : {})}
            >
              <summary
                className="w-full flex cursor-pointer list-none items-center justify-between p-4 text-left hover:bg-accent transition-colors [&::-webkit-details-marker]:hidden"
              >
                <span className="font-medium text-popover-foreground">
                  {item.trigger}
                </span>
                <ChevronDownIcon
                  className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-open/accordion:rotate-180"
                />
              </summary>
              <div className="px-4 pb-4 pt-0 text-sm text-popover-foreground">
                {item.content}
              </div>
            </details>
          )
        })}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'

export { Accordion }

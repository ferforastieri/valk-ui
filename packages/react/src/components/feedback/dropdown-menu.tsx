import React, { forwardRef } from 'react'
import { cn } from '../../lib'

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  side?: 'top' | 'bottom'
  onOpenChange?: (open: boolean) => void
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, trigger, children, align = 'left', side = 'bottom', onOpenChange, ...props }, ref) => {
    const triggerWithState = React.isValidElement(trigger)
      ? React.cloneElement(trigger, {
          className: cn(
            trigger.props.className,
            'group-has-[:focus-within]/dropdown:bg-accent'
          )
        } as any)
      : trigger

    const alignClasses = {
      left: 'left-0',
      right: 'right-0',
      center: 'left-1/2 -translate-x-1/2',
    }

    const sideClasses = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
    }

    const childrenWithClose = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onClick: (e: React.MouseEvent) => {
            child.props.onClick?.(e)
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }
          }
        } as any)
      }
      return child
    })

    return (
      <div
        ref={ref}
        className={cn('group/dropdown relative inline-block', className)}
        onFocus={() => onOpenChange?.(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            onOpenChange?.(false)
          }
        }}
        {...props}
      >
        <div tabIndex={0}>
          {triggerWithState}
        </div>
          <div
            className={cn(
              'absolute z-50 hidden min-w-[11rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md group-has-[:focus-within]/dropdown:block',
              alignClasses[align],
              sideClasses[side]
            )}
          >
            {childrenWithClose}
          </div>
      </div>
    )
  }
)

DropdownMenu.displayName = 'DropdownMenu'

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const baseClasses = 'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left'
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(baseClasses, className),
        ref,
        ...props,
      } as any)
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

export { DropdownMenu, DropdownMenuItem }

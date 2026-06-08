import { forwardRef } from 'react'
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '../icons'
import { cn } from '../../lib'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, title, description, variant = 'default', onClose, ...props }, ref) => {
    const variants = {
      default: {
        container: 'bg-background border border-border text-foreground',
        icon: 'text-muted-foreground',
      },
      success: {
        container: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
        icon: 'text-green-600 dark:text-green-400',
      },
      error: {
        container: 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
        icon: 'text-red-600 dark:text-red-400',
      },
      warning: {
        container: 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
        icon: 'text-amber-600 dark:text-amber-400',
      },
      info: {
        container: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
        icon: 'text-blue-600 dark:text-blue-400',
      },
    }

    const icons = {
      default: null,
      success: CheckCircleIcon,
      error: XCircleIcon,
      warning: ExclamationCircleIcon,
      info: InformationCircleIcon,
    }

    const Icon = icons[variant]
    const variantStyles = variants[variant]

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm transition-all duration-300',
          variantStyles.container,
          className
        )}
        {...props}
      >
        {Icon && (
          <div className={cn('flex-shrink-0', variantStyles.icon)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold text-sm leading-tight">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-80 mt-1 leading-relaxed">{description}</div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors opacity-60 hover:opacity-100 flex items-center justify-center"
            aria-label="Close"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)

Toast.displayName = 'Toast'

export { Toast }

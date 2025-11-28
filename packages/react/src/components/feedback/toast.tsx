import { forwardRef } from 'react'
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
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
      default: 'bg-background border-border text-foreground',
      success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400',
      error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400',
      info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400',
    }

    const icons = {
      default: null,
      success: CheckCircleIcon,
      error: XCircleIcon,
      warning: ExclamationCircleIcon,
      info: InformationCircleIcon,
    }

    const Icon = icons[variant]

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 rounded-lg border p-4 shadow-lg',
          variants[variant],
          className
        )}
        {...props}
      >
        {Icon && (
          <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold text-sm mb-1">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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


import { CheckIcon } from '../icons'
import { forwardRef } from 'react'
import { cn } from '../../lib'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
  labelClassName?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      labelClassName,
      id,
      checked: controlledChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <label
            htmlFor={checkboxId || undefined}
            className="relative flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id={checkboxId}
              className="peer sr-only"
              ref={ref}
              checked={controlledChecked}
              onChange={onChange}
              {...props}
            />
            <div
              className={cn(
                'w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center pointer-events-none',
                'border-border bg-background peer-checked:bg-primary peer-checked:border-primary peer-checked:[&>svg]:opacity-100',
                'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
                props.disabled && 'opacity-50',
                error && 'border-destructive peer-checked:bg-destructive peer-checked:border-destructive',
                className
              )}
            >
              <CheckIcon
                className="w-3 h-3 text-primary-foreground opacity-0 transition-opacity duration-200"
              />
            </div>
          </label>

          {(label || description) && (
            <div className="flex-1 min-w-0">
              {label && (
                <label
                  htmlFor={checkboxId || undefined}
                  className={cn(
                    'text-sm font-medium cursor-pointer select-none',
                    'text-foreground',
                    props.disabled && 'opacity-50 cursor-not-allowed',
                    error && 'text-destructive',
                    labelClassName
                  )}
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  className={cn(
                    'text-sm text-muted-foreground mt-1',
                    props.disabled && 'opacity-50',
                    error && 'text-destructive'
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive ml-8">{error}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }

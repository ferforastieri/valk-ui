import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon } from '../icons'
import { forwardRef, useState, useEffect } from 'react'
import { cn } from '../../lib'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  label?: string
  error?: string
  placeholder?: string
  options: SelectOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  mode?: 'single' | 'multi'
  searchable?: boolean
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  required?: boolean
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ 
    className, 
    label, 
    error, 
    placeholder, 
    options, 
    value, 
    onChange, 
    mode = 'single', 
    searchable = true, 
    disabled = false,
    id,
    required = false
  }, ref) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    
    useEffect(() => {
      if (value) {
        setSelectedValues(Array.isArray(value) ? value : [value])
      } else {
        setSelectedValues([])
      }
    }, [value])

    
    const filteredOptions = options.filter(option =>
      option.label?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    
    const selectedOptions = options.filter(option => 
      selectedValues.includes(option.value)
    )

    const handleSelect = (optionValue: string) => {
      if (mode === 'single') {
        setSelectedValues([optionValue])
        onChange?.(optionValue)
        setSearchTerm('')
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      } else {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue]
        setSelectedValues(newValues)
        onChange?.(newValues)
      }
    }

    const handleRemove = (optionValue: string) => {
      const newValues = selectedValues.filter(v => v !== optionValue)
      setSelectedValues(newValues)
      onChange?.(newValues)
    }

    const handleClear = () => {
      setSelectedValues([])
      onChange?.(mode === 'single' ? '' : [])
    }

    return (
      <div className="space-y-2 w-full" ref={ref}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div
          className="group/select relative w-full"
          data-select-root
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setSearchTerm('')
            }
          }}
        >
          <div
            tabIndex={disabled ? undefined : 0}
            className={cn(
              'flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground cursor-pointer transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus:ring-destructive',
              'group-has-[:focus-within]/select:ring-2 group-has-[:focus-within]/select:ring-foreground group-has-[:focus-within]/select:border-transparent',
              disabled && 'pointer-events-none opacity-50',
              className
            )}
            onMouseDown={(event) => {
              if ((event.target as HTMLElement).closest('[data-select-action]')) return
              const root = event.currentTarget.closest('[data-select-root]')
              if (root && document.activeElement instanceof HTMLElement && root.contains(document.activeElement)) {
                event.preventDefault()
                document.activeElement.blur()
              }
            }}
          >
            <div className="flex-1 flex items-center gap-2 min-w-0">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground">
                  {placeholder || 'Selecione uma opção'}
                </span>
              ) : mode === 'single' ? (
                <span className="truncate">{selectedOptions[0]?.label}</span>
              ) : (
                <div className="flex flex-wrap gap-1 min-w-0">
                  {selectedOptions.slice(0, 3).map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-xl"
                    >
                      {option.label}
                      <button
                        type="button"
                        data-select-action
                        onMouseDown={(e) => {
                          e.preventDefault()
                          handleRemove(option.value)
                        }}
                        className="hover:text-accent-foreground/80"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedOptions.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{selectedOptions.length - 3} mais
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {selectedValues.length > 0 && (
                <button
                  type="button"
                  data-select-action
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleClear()
                  }}
                  className="p-1 hover:bg-muted rounded-xl transition-colors"
                >
                  <XMarkIcon className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
              <ChevronDownIcon 
                className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-has-[:focus-within]/select:rotate-180"
              />
            </div>
          </div>

            <div className="absolute z-50 mt-1 hidden w-full max-h-60 overflow-hidden rounded-xl border border-border bg-popover shadow-lg mb-2 group-has-[:focus-within]/select:block">
              {searchable && (
                <div className="p-3 border-b border-border min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar..."
                      className="flex-1 bg-transparent outline-none text-sm text-popover-foreground min-w-0"
                      style={{ minWidth: '120px' }}
                    />
                  </div>
                </div>
              )}
              
              <div className="overflow-y-auto pb-3" style={{ maxHeight: searchable ? '180px' : '220px' }}>
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Nenhuma opção encontrada
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        'px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors',
                        'flex items-center gap-3 min-w-0',
                        selectedValues.includes(option.value) && 'bg-accent text-accent-foreground',
                        option.disabled && 'opacity-50 cursor-not-allowed'
                      )}
                      onMouseDown={(event) => {
                        event.preventDefault()
                        if (!option.disabled) {
                          handleSelect(option.value)
                        }
                      }}
                    >
                      {mode === 'multi' && (
                        <div className="flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={selectedValues.includes(option.value)}
                            onChange={() => {}}
                            className="h-4 w-4 rounded border-border text-foreground focus:ring-foreground focus:ring-2"
                          />
                        </div>
                      )}
                      <span className="flex-1">{option.label}</span>
                      {selectedValues.includes(option.value) && mode === 'single' && (
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-foreground rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }

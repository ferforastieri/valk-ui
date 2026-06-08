import React, { forwardRef } from 'react'
import { cn } from '../../lib'

export interface BarChartData {
  label: string
  previousPeriod: number
  selectedPeriod: number
}

export interface BarChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  data: BarChartData
  maxValue?: number
  showLegend?: boolean
  colorScheme?: 'blue-green' | 'pink-blue'
  isCurrency?: boolean
}

const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  ({ className, title, data, maxValue, showLegend = true, colorScheme = 'blue-green', isCurrency = false, ...props }, ref) => {
    const colors = {
      'blue-green': {
        previous: '#3b82f6',
        selected: '#10b981'
      },
      'pink-blue': {
        previous: '#ec4899',
        selected: '#1e40af'
      }
    }

    const currentColors = colors[colorScheme]
    const previousValue = Number.isFinite(Number(data.previousPeriod)) ? Number(data.previousPeriod) : 0
    const selectedValue = Number.isFinite(Number(data.selectedPeriod)) ? Number(data.selectedPeriod) : 0
    const finalMaxValue = maxValue || Math.max(previousValue, selectedValue, 1) * 1.2

    const formatValue = (value: number) => {
      if (isCurrency) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
      }
      if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
      if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
      return value.toFixed(0)
    }

    const bars = [
      { label: 'Período Anterior', value: previousValue, color: currentColors.previous },
      { label: 'Período Selecionado', value: selectedValue, color: currentColors.selected },
    ]

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border-2 border-border bg-popover p-3 sm:p-4 shadow-sm flex flex-col h-[280px] 2xl:h-[350px] transition-all duration-200',
          className
        )}
        {...props}
      >
        <h3 className="flex-shrink-0 mb-2 font-semibold leading-tight break-words text-foreground sm:mb-3 text-sm sm:text-base">
          {title}
        </h3>

        <div className="flex flex-1 items-end justify-center gap-8 border-l border-b border-border/60 px-6 pb-4 pt-6">
          {bars.map((bar) => {
            const height = `${Math.max(2, Math.min(100, (bar.value / finalMaxValue) * 100))}%`
            return (
              <div key={bar.label} className="group relative flex h-full w-14 items-end justify-center">
                <div
                  className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-85"
                  style={{ height, backgroundColor: bar.color }}
                  aria-label={`${bar.label}: ${formatValue(bar.value)}`}
                />
                <div
                  className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg group-hover:block"
                  style={{ borderColor: bar.color }}
                >
                  {bar.label}: {formatValue(bar.value)}
                </div>
              </div>
            )
          })}
        </div>

        {showLegend && (
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            {bars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bar.color }} />
                {bar.label}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

BarChart.displayName = 'BarChart'

export { BarChart }

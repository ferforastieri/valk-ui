import React, { forwardRef } from 'react'
import { cn } from '../../lib'

export interface DonutChartData {
  label: string
  value: number
  percentage: number
  color: string
}

export interface DonutChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  data: DonutChartData[]
  showMagnifier?: boolean
}

const DonutChart = forwardRef<HTMLDivElement, DonutChartProps>(
  ({ className, title, data, showMagnifier = false, ...props }, ref) => {
    const item = data[0]
    const percentage = Math.max(0, Math.min(100, item?.percentage || 0))
    const color = item?.color || '#0066B3'
    const value = new Intl.NumberFormat('pt-BR').format(item?.value || 0)

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl bg-popover border border-border p-4 sm:p-6 shadow-sm flex flex-col min-h-[280px] transition-all duration-200',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0 min-h-[2rem]">
          <h3 className="font-semibold text-foreground leading-tight text-center break-words px-2 text-sm sm:text-base">
            {title}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center flex-1">
          <div className="group relative flex-shrink-0 w-full max-w-[200px]" style={{ height: '150px' }}>
            <svg viewBox="0 0 200 120" className="h-full w-full overflow-visible" role="img" aria-label={`${item?.label || title}: ${percentage}%`}>
              <path
                d="M 25 100 A 75 75 0 0 1 175 100"
                fill="none"
                stroke="rgba(229, 231, 235, 0.3)"
                strokeWidth="24"
                strokeLinecap="round"
                pathLength={100}
              />
              <path
                d="M 25 100 A 75 75 0 0 1 175 100"
                fill="none"
                stroke={color}
                strokeWidth="24"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={`${percentage} 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-2">
              <span className="text-xl sm:text-2xl font-bold" style={{ color }}>
                {percentage}%
              </span>
            </div>
            {showMagnifier && item && (
              <div className="pointer-events-none absolute left-1/2 top-4 z-10 hidden -translate-x-1/2 rounded-md border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg group-hover:block">
                <span className="font-medium">{item.label}</span>: {value} ({percentage}%)
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

DonutChart.displayName = 'DonutChart'

export { DonutChart }

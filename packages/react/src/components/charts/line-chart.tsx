export interface LineChartProps {
  title: string;
  data: number[];
  labels: string[];
  color?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function LineChart({ title, data, labels, color = '#3b82f6', formatValue, className }: LineChartProps) {
  const width = 640
  const height = 260
  const padding = 36
  const maxValue = Math.max(...data, 1)
  const minValue = Math.min(...data, 0)
  const range = Math.max(maxValue - minValue, 1)

  const points = data.map((value, index) => {
    const x = data.length === 1 ? width / 2 : padding + (index / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((value - minValue) / range) * (height - padding * 2)
    return { x, y, value, label: labels[index] || '' }
  })

  const pointList = points.map((point) => `${point.x},${point.y}`).join(' ')
  const areaList = points.length > 0
    ? `${padding},${height - padding} ${pointList} ${width - padding},${height - padding}`
    : ''

  const displayValue = (value: number) => (
    formatValue ? formatValue(value) : value.toLocaleString('pt-BR')
  )

  return (
    <div className={`bg-popover border border-border rounded-xl shadow-sm p-6 h-[400px] transition-all duration-200 ${className || ''}`}>
      <h3 className="mb-4 text-center text-base font-bold text-foreground">{title}</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[300px] w-full overflow-visible" role="img" aria-label={title}>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(0,0,0,0.08)" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(0,0,0,0.08)" />
        {areaList && (
          <polygon points={areaList} fill={`${color}20`} />
        )}
        <polyline points={pointList} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((point, index) => (
          <g key={`${point.label}-${index}`} className="group">
            <circle cx={point.x} cy={point.y} r={5} fill={color} stroke="#fff" strokeWidth={2} />
            <text x={point.x} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {point.label}
            </text>
            <g className="hidden group-hover:block">
              <rect x={point.x - 44} y={point.y - 34} width={88} height={24} rx={6} fill="rgba(0,0,0,0.8)" />
              <text x={point.x} y={point.y - 18} textAnchor="middle" className="fill-white text-[11px]">
                {displayValue(point.value)}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

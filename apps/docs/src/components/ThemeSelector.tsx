import { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuItem } from '@/components'
import { cn } from '@/lib'
import { CheckIcon } from '@/components'

export interface ThemeColor {
  name: string
  value: string
  primary: string
  primaryForeground: string
}

export const themes: ThemeColor[] = [
  { name: 'Zinc', value: 'zinc', primary: '240 5.9% 10%', primaryForeground: '0 0% 98%' },
  { name: 'Slate', value: 'slate', primary: '222.2 47.4% 11.2%', primaryForeground: '210 40% 98%' },
  { name: 'Stone', value: 'stone', primary: '24 9.8% 10%', primaryForeground: '0 0% 98%' },
  { name: 'Gray', value: 'gray', primary: '220 13% 18%', primaryForeground: '0 0% 98%' },
  { name: 'Neutral', value: 'neutral', primary: '0 0% 9%', primaryForeground: '0 0% 98%' },
  { name: 'Red', value: 'red', primary: '0 72.2% 50.6%', primaryForeground: '0 0% 98%' },
  { name: 'Rose', value: 'rose', primary: '346.8 77.2% 49.8%', primaryForeground: '355.7 100% 97.3%' },
  { name: 'Orange', value: 'orange', primary: '24.6 95% 53.1%', primaryForeground: '60 9.1% 97.8%' },
  { name: 'Green', value: 'green', primary: '142.1 76.2% 36.3%', primaryForeground: '355.7 100% 97.3%' },
  { name: 'Blue', value: 'blue', primary: '221.2 83.2% 53.3%', primaryForeground: '210 40% 98%' },
  { name: 'Yellow', value: 'yellow', primary: '47.9 95.8% 53.1%', primaryForeground: '26 83.3% 14.1%' },
  { name: 'Violet', value: 'violet', primary: '262.1 83.3% 57.8%', primaryForeground: '210 40% 98%' },
]

interface ThemeSelectorProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const applyTheme = (themeValue: string) => {
    const theme = themes.find(t => t.value === themeValue) || themes[0]
    const root = document.documentElement
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--primary-foreground', theme.primaryForeground)
    onThemeChange(themeValue)
  }

  useEffect(() => {
    const theme = themes.find(t => t.value === currentTheme) || themes[0]
    const root = document.documentElement
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--primary-foreground', theme.primaryForeground)
  }, [currentTheme])

  const currentThemeObj = themes.find(t => t.value === currentTheme) || themes[0]

  const trigger = (
    <button
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
    >
      <div 
        className="w-4 h-4 rounded-full border border-border"
        style={{ backgroundColor: `hsl(${currentThemeObj.primary})` }}
      />
      <span>{currentThemeObj.name}</span>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )

  return (
    <DropdownMenu
      trigger={trigger}
      align="right"
      onOpenChange={setIsOpen}
    >
      {themes.map((theme) => (
        <DropdownMenuItem
          key={theme.value}
          onClick={() => applyTheme(theme.value)}
          className={cn(
            "flex items-center gap-2.5 w-full",
            currentTheme === theme.value && "bg-accent text-accent-foreground font-medium"
          )}
        >
          <div 
            className="w-4 h-4 rounded-full border border-border flex-shrink-0"
            style={{ backgroundColor: `hsl(${theme.primary})` }}
          />
          <span className="flex-1">{theme.name}</span>
          {currentTheme === theme.value && (
            <CheckIcon className="h-4 w-4" />
          )}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  )
}

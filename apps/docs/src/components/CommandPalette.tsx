import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from '@/components'
import type { CommandItem } from '@/components'
import { 
  BookOpenIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from '@/components'
import { useTranslation } from 'react-i18next'

const CommandPaletteContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({ open: false, setOpen: () => {} })

export const useCommandPalette = () => useContext(CommandPaletteContext)

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPaletteContent />
    </CommandPaletteContext.Provider>
  )
}

function CommandPaletteContent() {
  const { open, setOpen } = useCommandPalette()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const commandItems: CommandItem[] = [
    {
      id: 'home',
      title: 'Home',
      description: 'Go to homepage',
      icon: <BookOpenIcon className="h-4 w-4" />,
      keywords: ['home', 'inicio'],
      onSelect: () => {
        navigate('/')
        setOpen(false)
      },
    },
    {
      id: 'docs',
      title: t('nav.docs'),
      description: 'View documentation',
      icon: <BookOpenIcon className="h-4 w-4" />,
      keywords: ['docs', 'documentation', 'documentação'],
      onSelect: () => {
        navigate('/docs')
        setOpen(false)
      },
    },
    {
      id: 'components',
      title: t('nav.components'),
      description: 'Browse components',
      icon: <CodeBracketIcon className="h-4 w-4" />,
      keywords: ['components', 'componentes'],
      onSelect: () => {
        navigate('/components')
        setOpen(false)
      },
    },
    {
      id: 'changelog',
      title: t('nav.changelog'),
      description: 'View changelog',
      icon: <DocumentTextIcon className="h-4 w-4" />,
      keywords: ['changelog', 'changes', 'mudanças'],
      onSelect: () => {
        navigate('/changelog')
        setOpen(false)
      },
    },
    {
      id: 'playground',
      title: t('nav.playground'),
      description: 'Test components in real-time',
      icon: <CodeBracketIcon className="h-4 w-4" />,
      keywords: ['playground', 'sandbox', 'test', 'experiment', 'experimento'],
      onSelect: () => {
        navigate('/playground')
        setOpen(false)
      },
    },
  ]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative z-50 w-full max-w-lg">
        <Command
          items={commandItems}
          placeholder={t('nav.search')}
          onSelect={(item) => item.onSelect?.()}
        />
      </div>
    </div>
  )
}

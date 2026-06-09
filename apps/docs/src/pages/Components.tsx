import type { SVGProps } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Bars3Icon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  CodeBracketIcon,
  CubeIcon,
  DocumentTextIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  SwatchIcon,
  XMarkIcon,
  DocsSidebar,
} from '@/components'
import { useTranslation } from 'react-i18next'

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element

type ComponentItem = {
  title: string
  href: string
  description: string
  icon: IconComponent
  preview: 'button' | 'field' | 'choice' | 'switch' | 'date' | 'modal' | 'badge' | 'progress' | 'menu' | 'command' | 'theme' | 'avatar' | 'metric' | 'table' | 'accordion' | 'card' | 'line' | 'sheet' | 'nav' | 'tabs' | 'bar' | 'donut' | 'chart'
}

type ComponentSection = {
  title: string
  description: string
  items: ComponentItem[]
}

function ComponentPreview({ type }: { type: ComponentItem['preview'] }) {
  const baseLine = 'h-1.5 rounded-full bg-primary/25'

  switch (type) {
    case 'button':
      return <div className="h-8 w-24 rounded-md bg-primary" />
    case 'field':
      return (
        <div className="h-9 w-32 rounded-md border border-border bg-background px-3 py-2">
          <div className={baseLine} />
        </div>
      )
    case 'choice':
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded border border-primary bg-primary text-primary-foreground">
            <CheckIcon className="h-3.5 w-3.5" />
          </div>
          <div className="h-1.5 w-20 rounded-full bg-muted-foreground/25" />
        </div>
      )
    case 'switch':
      return (
        <div className="flex h-7 w-12 items-center rounded-full bg-primary p-1">
          <div className="h-5 w-5 rounded-full bg-primary-foreground" />
        </div>
      )
    case 'date':
      return (
        <div className="grid w-24 grid-cols-4 gap-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={`h-3 rounded-sm ${index === 6 ? 'bg-primary' : 'bg-primary/15'}`} />
          ))}
        </div>
      )
    case 'modal':
      return <div className="h-14 w-24 rounded-md border border-primary/30 bg-background shadow-sm" />
    case 'badge':
      return (
        <div className="flex gap-1.5">
          <div className="h-5 w-14 rounded-full bg-primary" />
          <div className="h-5 w-10 rounded-full border border-border" />
        </div>
      )
    case 'progress':
      return (
        <div className="h-2 w-28 overflow-hidden rounded-full bg-primary/15">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
      )
    case 'menu':
      return (
        <div className="space-y-1.5">
          <div className="h-2 w-20 rounded-full bg-primary/30" />
          <div className="h-2 w-28 rounded-full bg-primary/15" />
          <div className="h-2 w-16 rounded-full bg-primary/15" />
        </div>
      )
    case 'command':
      return (
        <div className="w-32 rounded-md border border-border bg-background p-2">
          <div className="mb-2 h-1.5 w-20 rounded-full bg-primary/25" />
          <div className="h-1.5 w-28 rounded-full bg-muted-foreground/20" />
        </div>
      )
    case 'theme':
      return (
        <div className="flex gap-1.5">
          <div className="h-7 w-7 rounded-full bg-primary" />
          <div className="h-7 w-7 rounded-full bg-foreground" />
        </div>
      )
    case 'avatar':
      return (
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/80" />
          <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/40" />
          <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/20" />
        </div>
      )
    case 'metric':
      return (
        <div className="space-y-2">
          <div className="h-2 w-16 rounded-full bg-muted-foreground/25" />
          <div className="h-4 w-24 rounded-full bg-primary" />
        </div>
      )
    case 'table':
      return (
        <div className="space-y-1.5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-1.5">
              <div className="h-2 w-8 rounded-full bg-primary/20" />
              <div className="h-2 w-12 rounded-full bg-primary/10" />
              <div className="h-2 w-6 rounded-full bg-primary/10" />
            </div>
          ))}
        </div>
      )
    case 'accordion':
      return (
        <div className="space-y-1.5">
          <div className="h-2 w-28 rounded-full bg-primary/25" />
          <div className="h-2 w-20 rounded-full bg-muted-foreground/20" />
        </div>
      )
    case 'card':
      return <div className="h-12 w-24 rounded-md border border-border bg-background" />
    case 'line':
      return <div className="h-px w-28 bg-border" />
    case 'sheet':
      return <div className="h-16 w-20 rounded-l-md border border-primary/30 border-r-primary bg-background" />
    case 'nav':
      return (
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-md bg-primary" />
          <div className="h-7 w-7 rounded-md bg-primary/15" />
          <div className="h-7 w-7 rounded-md bg-primary/15" />
        </div>
      )
    case 'tabs':
      return (
        <div className="flex rounded-md bg-primary/10 p-1">
          <div className="h-6 w-10 rounded bg-primary" />
          <div className="h-6 w-10 rounded" />
        </div>
      )
    case 'bar':
      return (
        <div className="flex h-12 items-end gap-1.5">
          <div className="h-5 w-3 rounded-t bg-primary/30" />
          <div className="h-9 w-3 rounded-t bg-primary" />
          <div className="h-7 w-3 rounded-t bg-primary/60" />
          <div className="h-12 w-3 rounded-t bg-primary/80" />
        </div>
      )
    case 'donut':
      return <div className="h-12 w-12 rounded-full border-[10px] border-primary border-r-primary/20" />
    case 'chart':
      return (
        <svg className="h-12 w-28 text-primary" viewBox="0 0 112 48" fill="none" aria-hidden="true">
          <path d="M4 40C22 38 23 16 41 22C55 27 55 35 70 27C83 20 86 10 108 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export default function Components() {
  const { t } = useTranslation()
  const location = useLocation()

  const sidebarSections: ComponentSection[] = [
    {
      title: 'Forms',
      description: 'Controles para entrada, escolha e confirmação.',
      items: [
        { title: 'Button', href: '/components/button', description: 'Ações principais, secundárias e discretas.', icon: SparklesIcon, preview: 'button' },
        { title: 'Input', href: '/components/input', description: 'Campos de texto com label, erro e ícones.', icon: MagnifyingGlassIcon, preview: 'field' },
        { title: 'Select', href: '/components/select', description: 'Seleção única ou múltipla com busca.', icon: Bars3Icon, preview: 'menu' },
        { title: 'Checkbox', href: '/components/checkbox', description: 'Escolhas booleanas com estado claro.', icon: CheckIcon, preview: 'choice' },
        { title: 'Toggle', href: '/components/toggle', description: 'Alternância rápida para preferências.', icon: CheckCircleIcon, preview: 'switch' },
        { title: 'DatePicker', href: '/components/datepicker', description: 'Seleção de data compacta e acessível.', icon: CalendarIcon, preview: 'date' },
      ]
    },
    {
      title: t('components.feedback'),
      description: 'Respostas visuais para estados, ações e fluxos.',
      items: [
        { title: 'Modal', href: '/components/modal', description: 'Camada focada para decisões importantes.', icon: XMarkIcon, preview: 'modal' },
        { title: 'Dialog', href: '/components/dialog', description: 'Confirmações e mensagens contextuais.', icon: DocumentTextIcon, preview: 'modal' },
        { title: 'StatusBadge', href: '/components/statusbadge', description: 'Estados operacionais em leitura rápida.', icon: CheckCircleIcon, preview: 'badge' },
        { title: 'Badge', href: '/components/badge', description: 'Marcadores pequenos para rótulos e filtros.', icon: SparklesIcon, preview: 'badge' },
        { title: 'ProgressBar', href: '/components/progressbar', description: 'Progresso linear para tarefas e etapas.', icon: ClockIcon, preview: 'progress' },
        { title: 'DropdownMenu', href: '/components/dropdownmenu', description: 'Menus de ação compactos.', icon: Bars3Icon, preview: 'menu' },
        { title: 'Command', href: '/components/command', description: 'Busca de comandos e navegação rápida.', icon: MagnifyingGlassIcon, preview: 'command' },
        { title: 'ThemeToggle', href: '/components/themetoggle', description: 'Alternância visual entre temas.', icon: SwatchIcon, preview: 'theme' },
      ]
    },
    {
      title: t('components.layout'),
      description: 'Estruturas para organizar conteúdo e navegação.',
      items: [
        { title: 'Avatar', href: '/components/avatar', description: 'Identidade visual para pessoas e entidades.', icon: HomeIcon, preview: 'avatar' },
        { title: 'MetricCard', href: '/components/metriccard', description: 'Indicadores compactos para dashboards.', icon: CubeIcon, preview: 'metric' },
        { title: 'PaginatedTable', href: '/components/paginatedtable', description: 'Tabela com busca, ordenação e paginação.', icon: DocumentTextIcon, preview: 'table' },
        { title: 'Accordion', href: '/components/accordion', description: 'Conteúdo expansível com hierarquia clara.', icon: Bars3Icon, preview: 'accordion' },
        { title: 'Card', href: '/components/card', description: 'Superfície para itens e blocos de conteúdo.', icon: CubeIcon, preview: 'card' },
        { title: 'Separator', href: '/components/separator', description: 'Divisão sutil entre grupos de informação.', icon: CodeBracketIcon, preview: 'line' },
        { title: 'Sheet', href: '/components/sheet', description: 'Painel lateral para fluxos complementares.', icon: DocumentTextIcon, preview: 'sheet' },
        { title: 'Navigation', href: '/components/navigation', description: 'Navegação responsiva para aplicações.', icon: HomeIcon, preview: 'nav' },
        { title: 'Tabs', href: '/components/tabs', description: 'Alternância entre visões relacionadas.', icon: BookOpenIcon, preview: 'tabs' },
      ]
    },
    {
      title: t('components.charts'),
      description: 'Visualizações simples para dados essenciais.',
      items: [
        { title: 'BarChart', href: '/components/barchart', description: 'Comparação direta entre categorias.', icon: SwatchIcon, preview: 'bar' },
        { title: 'DonutChart', href: '/components/donutchart', description: 'Proporções e distribuição em anel.', icon: SparklesIcon, preview: 'donut' },
        { title: 'LineChart', href: '/components/linechart', description: 'Tendências e evolução ao longo do tempo.', icon: CodeBracketIcon, preview: 'chart' },
      ]
    },
  ]

  const totalComponents = sidebarSections.reduce((total, section) => total + section.items.length, 0)

  return (
    <>
      <DocsSidebar
        sections={sidebarSections}
        currentPath={location.pathname}
        LinkComponent={RouterLink}
      />
      <main className="flex-1 min-w-0 px-6 py-8 md:px-8 md:py-10 lg:px-10">
        <header className="mb-10 border-b border-border pb-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              {totalComponents} componentes
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('components.title')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('components.subtitle')}
            </p>
          </div>
        </header>

        <div className="space-y-12">
          {sidebarSections.map((section) => (
            <section key={section.title} className="space-y-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {section.items.length} itens
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <RouterLink
                      key={item.href}
                      to={item.href}
                      className="group min-w-0 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/50 hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
                            <h3 className="min-w-0 text-base font-semibold text-foreground break-words">
                              {item.title}
                            </h3>
                            <span className="text-lg leading-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary">
                              →
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex h-20 items-center justify-center rounded-md bg-muted/35">
                        <ComponentPreview type={item.preview} />
                      </div>
                    </RouterLink>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}

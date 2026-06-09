import { Link as RouterLink } from 'react-router-dom'
import {
  Accordion,
  Avatar,
  Badge,
  BarChart,
  Button,
  Card,
  CardContent,
  CardTitle,
  Checkbox,
  DatePicker,
  Dialog,
  DonutChart,
  DropdownMenu,
  DropdownMenuItem,
  Input,
  LineChart,
  MetricCard,
  Modal,
  PaginatedTable,
  ProgressBar,
  Select,
  Separator,
  Sheet,
  StatusBadge,
  Tabs,
  TabsList,
  TabsTrigger,
  ThemeToggle,
  Toggle,
} from '@/components'
import { useTranslation } from 'react-i18next'

type PreviewType =
  | 'button'
  | 'input'
  | 'select'
  | 'checkbox'
  | 'toggle'
  | 'datepicker'
  | 'modal'
  | 'dialog'
  | 'statusbadge'
  | 'badge'
  | 'progressbar'
  | 'dropdownmenu'
  | 'command'
  | 'themetoggle'
  | 'avatar'
  | 'metriccard'
  | 'paginatedtable'
  | 'accordion'
  | 'card'
  | 'separator'
  | 'sheet'
  | 'navigation'
  | 'tabs'
  | 'barchart'
  | 'donutchart'
  | 'linechart'

type ComponentItem = {
  title: string
  href: string
  description: string
  preview: PreviewType
}

type ComponentSection = {
  id: string
  title: string
  description: string
  items: ComponentItem[]
}

const selectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]

const tableColumns = [
  { key: 'name', title: 'Nome', dataIndex: 'name' },
  { key: 'status', title: 'Status', dataIndex: 'status' },
] as const

const tableData = [
  { id: 1, name: 'Button', status: 'Stable' },
  { id: 2, name: 'Input', status: 'Stable' },
]

function ComponentPreview({ type }: { type: PreviewType }) {
  switch (type) {
    case 'button':
      return <Button size="sm">Button</Button>
    case 'input':
      return <Input placeholder="Digite algo" className="max-w-44" />
    case 'select':
      return <Select options={selectOptions} value="react" searchable={false} className="max-w-44" />
    case 'checkbox':
      return <Checkbox checked readOnly label="Checkbox" />
    case 'toggle':
      return <Toggle checked readOnly label="Toggle" />
    case 'datepicker':
      return <DatePicker value="2026-06-08" className="max-w-44" readOnly />
    case 'modal':
      return (
        <>
          <Button size="sm" variant="outline">Abrir modal</Button>
          <Modal isOpen={false} onClose={() => undefined} title="Modal">
            Conteúdo
          </Modal>
        </>
      )
    case 'dialog':
      return (
        <>
          <Button size="sm" variant="outline">Abrir dialog</Button>
          <Dialog isOpen={false} onClose={() => undefined} title="Dialog">
            Conteúdo
          </Dialog>
        </>
      )
    case 'statusbadge':
      return <StatusBadge status="completed" size="sm">Completed</StatusBadge>
    case 'badge':
      return (
        <div className="flex flex-wrap justify-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      )
    case 'progressbar':
      return <ProgressBar value={72} className="w-44" />
    case 'dropdownmenu':
      return (
        <DropdownMenu trigger={<Button size="sm" variant="outline">Menu</Button>}>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Excluir</DropdownMenuItem>
        </DropdownMenu>
      )
    case 'command':
      return (
        <div className="h-24 w-52 overflow-hidden rounded-md border bg-popover text-popover-foreground">
          <div className="border-b px-3 py-2 text-sm text-muted-foreground">Buscar...</div>
          <div className="p-1">
            <div className="rounded-sm bg-accent px-2 py-1.5 text-sm text-accent-foreground">Button</div>
            <div className="px-2 py-1.5 text-sm">Input</div>
          </div>
        </div>
      )
    case 'themetoggle':
      return <ThemeToggle theme="light" onToggle={() => undefined} />
    case 'avatar':
      return (
        <div className="flex -space-x-2">
          <Avatar fallback="Valk UI" />
          <Avatar fallback="Docs" />
          <Avatar fallback="React" />
        </div>
      )
    case 'metriccard':
      return (
        <MetricCard
          title="Downloads"
          value="24k"
          subtitle="+12%"
          variant="blue-light"
          className="w-40 p-3"
        />
      )
    case 'paginatedtable':
      return (
        <PaginatedTable
          className="w-52 text-xs [&>div:first-child]:hidden [&_table]:text-xs [&_th]:px-2 [&_th]:py-2 [&_td]:px-2 [&_td]:py-2"
          columns={tableColumns as never}
          data={tableData}
          searchable={false}
          pageSize={2}
          totalItems={2}
        />
      )
    case 'accordion':
      return (
        <Accordion
          className="w-52"
          items={[
            { value: 'item', trigger: 'Accordion', content: 'Conteúdo', defaultOpen: true },
          ]}
        />
      )
    case 'card':
      return (
        <Card className="w-48">
          <CardContent className="p-4">
            <CardTitle className="text-base">Card</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">Conteúdo</p>
          </CardContent>
        </Card>
      )
    case 'separator':
      return <Separator className="w-48" />
    case 'sheet':
      return (
        <>
          <Button size="sm" variant="outline">Abrir sheet</Button>
          <Sheet isOpen={false} onClose={() => undefined}>Conteúdo</Sheet>
        </>
      )
    case 'navigation':
      return (
        <div className="flex w-64 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
          <span className="rounded-lg px-3 py-2 text-sm text-muted-foreground">Docs</span>
          <span className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-foreground">UI</span>
        </div>
      )
    case 'tabs':
      return (
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
        </Tabs>
      )
    case 'barchart':
      return (
        <BarChart
          title="BarChart"
          data={{ label: 'Docs', previousPeriod: 40, selectedPeriod: 70 }}
          showLegend={false}
          className="h-24 w-52 p-2 [&_h3]:mb-1 [&_h3]:text-xs [&>div]:gap-4 [&>div]:px-4 [&>div]:pb-2 [&>div]:pt-2"
        />
      )
    case 'donutchart':
      return (
        <DonutChart
          title="DonutChart"
          data={[{ label: 'Uso', value: 75, percentage: 75, color: '#003580' }]}
          className="h-24 min-h-0 w-52 p-2 [&_h3]:text-xs [&_h3]:mb-1"
        />
      )
    case 'linechart':
      return (
        <LineChart
          title="LineChart"
          data={[12, 24, 18, 32, 28]}
          labels={['A', 'B', 'C', 'D', 'E']}
          color="#003580"
          className="h-24 w-52 p-2 [&_h3]:mb-1 [&_h3]:text-xs [&_svg]:h-20"
        />
      )
    default:
      return null
  }
}

export default function Components() {
  const { t } = useTranslation()

  const sidebarSections: ComponentSection[] = [
    {
      id: 'forms',
      title: 'Forms',
      description: 'Controles para entrada, escolha e confirmação.',
      items: [
        { title: 'Button', href: '/components/button', description: 'Ações principais, secundárias e discretas.', preview: 'button' },
        { title: 'Input', href: '/components/input', description: 'Campos de texto com label, erro e ícones.', preview: 'input' },
        { title: 'Select', href: '/components/select', description: 'Seleção única ou múltipla com busca.', preview: 'select' },
        { title: 'Checkbox', href: '/components/checkbox', description: 'Escolhas booleanas com estado claro.', preview: 'checkbox' },
        { title: 'Toggle', href: '/components/toggle', description: 'Alternância rápida para preferências.', preview: 'toggle' },
        { title: 'DatePicker', href: '/components/datepicker', description: 'Seleção de data compacta e acessível.', preview: 'datepicker' },
      ]
    },
    {
      id: 'feedback',
      title: t('components.feedback'),
      description: 'Respostas visuais para estados, ações e fluxos.',
      items: [
        { title: 'Modal', href: '/components/modal', description: 'Camada focada para decisões importantes.', preview: 'modal' },
        { title: 'Dialog', href: '/components/dialog', description: 'Confirmações e mensagens contextuais.', preview: 'dialog' },
        { title: 'StatusBadge', href: '/components/statusbadge', description: 'Estados operacionais em leitura rápida.', preview: 'statusbadge' },
        { title: 'Badge', href: '/components/badge', description: 'Marcadores pequenos para rótulos e filtros.', preview: 'badge' },
        { title: 'ProgressBar', href: '/components/progressbar', description: 'Progresso linear para tarefas e etapas.', preview: 'progressbar' },
        { title: 'DropdownMenu', href: '/components/dropdownmenu', description: 'Menus de ação compactos.', preview: 'dropdownmenu' },
        { title: 'Command', href: '/components/command', description: 'Busca de comandos e navegação rápida.', preview: 'command' },
        { title: 'ThemeToggle', href: '/components/themetoggle', description: 'Alternância visual entre temas.', preview: 'themetoggle' },
      ]
    },
    {
      id: 'layout',
      title: t('components.layout'),
      description: 'Estruturas para organizar conteúdo e navegação.',
      items: [
        { title: 'Avatar', href: '/components/avatar', description: 'Identidade visual para pessoas e entidades.', preview: 'avatar' },
        { title: 'MetricCard', href: '/components/metriccard', description: 'Indicadores compactos para dashboards.', preview: 'metriccard' },
        { title: 'PaginatedTable', href: '/components/paginatedtable', description: 'Tabela com busca, ordenação e paginação.', preview: 'paginatedtable' },
        { title: 'Accordion', href: '/components/accordion', description: 'Conteúdo expansível com hierarquia clara.', preview: 'accordion' },
        { title: 'Card', href: '/components/card', description: 'Superfície para itens e blocos de conteúdo.', preview: 'card' },
        { title: 'Separator', href: '/components/separator', description: 'Divisão sutil entre grupos de informação.', preview: 'separator' },
        { title: 'Sheet', href: '/components/sheet', description: 'Painel lateral para fluxos complementares.', preview: 'sheet' },
        { title: 'Navigation', href: '/components/navigation', description: 'Navegação responsiva para aplicações.', preview: 'navigation' },
        { title: 'Tabs', href: '/components/tabs', description: 'Alternância entre visões relacionadas.', preview: 'tabs' },
      ]
    },
    {
      id: 'charts',
      title: t('components.charts'),
      description: 'Visualizações simples para dados essenciais.',
      items: [
        { title: 'BarChart', href: '/components/barchart', description: 'Comparação direta entre categorias.', preview: 'barchart' },
        { title: 'DonutChart', href: '/components/donutchart', description: 'Proporções e distribuição em anel.', preview: 'donutchart' },
        { title: 'LineChart', href: '/components/linechart', description: 'Tendências e evolução ao longo do tempo.', preview: 'linechart' },
      ]
    },
  ]

  return (
    <div className="space-y-8">
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="text-3xl font-bold leading-tight text-foreground">
          Biblioteca de componentes
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Explore os componentes disponíveis e abra qualquer item para ver exemplos, instalação e uso.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" aria-label="Categorias de componentes">
        {sidebarSections.map((section) => (
          <span
            key={section.id}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground"
          >
            <span>{section.title}</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {section.items.length}
            </span>
          </span>
        ))}
      </div>

      <div className="space-y-12">
        {sidebarSections.map((section) => (
          <section key={section.title} className="space-y-4">
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
              {section.items.map((item) => (
                <RouterLink
                  key={item.href}
                  to={item.href}
                  className="group min-w-0 rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/50 hover:bg-accent/35 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                >
                  <div className="mb-3 flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-foreground break-words">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-lg leading-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary">
                      →
                    </span>
                  </div>
                  <div className="pointer-events-none flex min-h-24 items-center justify-center overflow-hidden rounded-md bg-muted/25 p-2">
                    <ComponentPreview type={item.preview} />
                  </div>
                </RouterLink>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

import { useParams, Link as RouterLink } from 'react-router-dom'
import { DocsSidebar, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components'
import { useTranslation } from '../contexts/TranslationContext'
import { useLocation } from 'react-router-dom'
import ComponentExamples from '../components/ComponentExamples'

export default function ComponentDetail() {
  const { componentName } = useParams<{ componentName: string }>()
  const location = useLocation()
  const { t } = useTranslation()

  const sidebarSections = [
    {
      title: 'Forms',
      items: [
        { title: 'Button', href: '/components/button' },
        { title: 'Input', href: '/components/input' },
        { title: 'Select', href: '/components/select' },
        { title: 'Checkbox', href: '/components/checkbox' },
        { title: 'Toggle', href: '/components/toggle' },
        { title: 'DatePicker', href: '/components/datepicker' },
      ]
    },
    {
      title: t.components.feedback,
      items: [
        { title: 'Modal', href: '/components/modal' },
        { title: 'Dialog', href: '/components/dialog' },
        { title: 'StatusBadge', href: '/components/statusbadge' },
        { title: 'Badge', href: '/components/badge' },
        { title: 'ProgressBar', href: '/components/progressbar' },
        { title: 'DropdownMenu', href: '/components/dropdownmenu' },
        { title: 'Command', href: '/components/command' },
        { title: 'ThemeToggle', href: '/components/themetoggle' },
      ]
    },
    {
      title: t.components.layout,
      items: [
        { title: 'Avatar', href: '/components/avatar' },
        { title: 'MetricCard', href: '/components/metriccard' },
        { title: 'PaginatedTable', href: '/components/paginatedtable' },
        { title: 'Accordion', href: '/components/accordion' },
        { title: 'Card', href: '/components/card' },
        { title: 'Separator', href: '/components/separator' },
        { title: 'Sheet', href: '/components/sheet' },
        { title: 'Navigation', href: '/components/navigation' },
        { title: 'Tabs', href: '/components/tabs' },
      ]
    },
    {
      title: t.components.charts,
      items: [
        { title: 'BarChart', href: '/components/barchart' },
        { title: 'DonutChart', href: '/components/donutchart' },
        { title: 'LineChart', href: '/components/linechart' },
      ]
    },
  ]

  const componentDisplayName = componentName
    ? componentName.charAt(0).toUpperCase() + componentName.slice(1).replace(/([A-Z])/g, ' $1')
    : ''

  return (
    <>
      <DocsSidebar
        sections={sidebarSections}
        currentPath={location.pathname}
        LinkComponent={RouterLink}
      />
      <div className="flex-1 min-w-0 px-6 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {componentDisplayName}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Documentação e exemplos de uso do componente {componentDisplayName}
          </p>
        </div>

        <ComponentExamples componentName={componentName || ''} />
      </div>
    </>
  )
}


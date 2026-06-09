import { useParams, Link as RouterLink } from 'react-router-dom'
import { DocsSidebar } from '@/components'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import ComponentExamples from '../components/ComponentExamples'

export default function ComponentDetail() {
  const { componentName } = useParams<{ componentName: string }>()
  const location = useLocation()
  const { t } = useTranslation()

  const sidebarSections = [
    {
      title: t('components.forms'),
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
      title: t('components.feedback'),
      items: [
        { title: 'Modal', href: '/components/modal' },
        { title: 'Dialog', href: '/components/dialog' },
        { title: 'StatusBadge', href: '/components/statusbadge' },
        { title: 'Badge', href: '/components/badge' },
        { title: 'ProgressBar', href: '/components/progressbar' },
        { title: 'Skeleton', href: '/components/skeleton' },
        { title: 'DropdownMenu', href: '/components/dropdownmenu' },
        { title: 'Command', href: '/components/command' },
        { title: 'ThemeToggle', href: '/components/themetoggle' },
      ]
    },
    {
      title: t('components.layout'),
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
      title: t('components.charts'),
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
      <div className="-mt-5 min-w-0 flex-1 px-6 pb-8 pt-0 md:-mt-7 md:px-8 md:pb-10 lg:ml-72 lg:px-10">
        <div className="mb-4 border-b border-border pb-4">
          <RouterLink
            to="/components"
            className="mb-3 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent/50 hover:text-primary"
          >
            <span aria-hidden="true">←</span>
            {t('components.back')}
          </RouterLink>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {t('components.component')}
          </p>
          <h1 className="mb-1 text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {componentDisplayName}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('components.detailSubtitle', { name: componentDisplayName })}
          </p>
        </div>

        <ComponentExamples componentName={componentName || ''} />
      </div>
    </>
  )
}

import { Link as RouterLink, useLocation } from 'react-router-dom'
import { DocsSidebar, Card, CardTitle, CardContent } from '@/components'
import { useTranslation } from 'react-i18next'

export default function Components() {
  const { t } = useTranslation()
  const location = useLocation()

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
      title: t('components.feedback'),
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

  return (
    <>
      <DocsSidebar
        sections={sidebarSections}
        currentPath={location.pathname}
        LinkComponent={RouterLink}
      />
      <div className="flex-1 min-w-0 px-6 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t('components.title')}</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {t('components.subtitle')}
          </p>
        </div>

        {sidebarSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <RouterLink
                  key={item.href}
                  to={item.href}
                  className="block min-w-0"
                >
                  <Card className="h-full min-w-0 cursor-pointer transition-colors hover:bg-accent/50">
                    <CardContent className="flex min-w-0 items-center justify-center p-4 text-center">
                      <CardTitle className="min-w-0 text-center text-base font-medium leading-snug break-words [overflow-wrap:anywhere]">
                        {item.title}
                      </CardTitle>
                    </CardContent>
                  </Card>
                </RouterLink>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

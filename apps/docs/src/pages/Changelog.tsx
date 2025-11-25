import { StatusBadge, MetricCard } from '@/components'
import { DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function Changelog() {
  const versions = [
    {
      version: '1.0.0',
      date: '2025-01-15',
      type: 'major',
      changes: [
        { type: 'added', text: 'Componente Sidebar adicionado' },
        { type: 'added', text: 'Componente ThemeToggle adicionado' },
        { type: 'added', text: 'Suporte completo a dark mode' },
        { type: 'fixed', text: 'Correção no componente Select' },
      ]
    },
    {
      version: '0.9.0',
      date: '2025-01-10',
      type: 'minor',
      changes: [
        { type: 'added', text: 'Novo componente PaginatedTable' },
        { type: 'added', text: 'Componentes de gráficos (BarChart, DonutChart, LineChart)' },
        { type: 'improved', text: 'Melhorias na responsividade' },
      ]
    },
    {
      version: '0.8.0',
      date: '2025-01-05',
      type: 'minor',
      changes: [
        { type: 'added', text: 'Componente DatePicker' },
        { type: 'added', text: 'Componente Toggle' },
        { type: 'fixed', text: 'Correção de bugs no Modal' },
      ]
    },
  ]

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'added': return 'completed'
      case 'fixed': return 'active'
      case 'improved': return 'pending'
      default: return 'active'
    }
  }

  const getBadgeLabel = (type: string) => {
    switch (type) {
      case 'added': return 'Adicionado'
      case 'fixed': return 'Corrigido'
      case 'improved': return 'Melhorado'
      default: return type
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Changelog</h1>
        <p className="text-lg text-muted-foreground">
          Acompanhe todas as mudanças e atualizações da biblioteca.
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Versão Atual"
          value="1.0.0"
          subtitle="Stable release"
          variant="blue"
        />
        <MetricCard
          title="Total de Versões"
          value={versions.length.toString()}
          subtitle="Lançamentos"
          variant="success"
        />
        <MetricCard
          title="Última Atualização"
          value="25/11/2025"
          subtitle="Última versão"
          variant="warning"
        />
      </div>

      {/* Versões */}
      <div className="space-y-6">
        {versions.map((version) => (
          <section key={version.version} className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">v{version.version}</h2>
                <StatusBadge status={version.type === 'major' ? 'completed' : 'active'}>
                  {version.type === 'major' ? 'Major' : 'Minor'}
                </StatusBadge>
              </div>
              <span className="text-sm text-muted-foreground">{version.date}</span>
            </div>
            <ul className="space-y-2">
              {version.changes.map((change, index) => (
                <li key={index} className="flex items-center gap-3">
                  <StatusBadge status={getBadgeColor(change.type) as any}>
                    {getBadgeLabel(change.type)}
                  </StatusBadge>
                  <span className="text-foreground">{change.text}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}


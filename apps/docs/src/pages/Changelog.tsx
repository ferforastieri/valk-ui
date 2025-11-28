import { useState, useEffect } from 'react'
import { StatusBadge, MetricCard } from '@/components'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { useTranslation } from '../contexts/TranslationContext'

interface GitHubRelease {
  tag_name: string
  name: string
  published_at: string
  body: string
  prerelease: boolean
  draft: boolean
}

interface Version {
  version: string
  date: string
  type: 'major' | 'minor' | 'patch'
  changes: Array<{
    type: 'added' | 'fixed' | 'improved' | 'changed' | 'removed'
    text: string
  }>
}

export default function Changelog() {
  const { t } = useTranslation()
  const [versions, setVersions] = useState<Version[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/ferforastieri/valk-ui/releases', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch releases')
        }

        const releases: GitHubRelease[] = await response.json()
        
        // Filtrar apenas releases publicados e não draft
        const publishedReleases = releases.filter(
          (release) => !release.draft && !release.prerelease
        )

        // Converter releases do GitHub para formato local
        const formattedVersions: Version[] = publishedReleases.map((release) => {
          // Extrair versão do tag_name (remove 'v' se existir)
          const version = release.tag_name.replace(/^v/, '')
          
          // Determinar tipo baseado na versão (semver)
          const [major, minor] = version.split('.')
          const type: 'major' | 'minor' | 'patch' = 
            minor === '0' && version.split('.')[2] === '0' ? 'major' :
            version.split('.')[2] === '0' ? 'minor' : 'patch'

          // Parsear body do release para extrair mudanças
          const changes = parseReleaseBody(release.body)

          return {
            version,
            date: new Date(release.published_at).toISOString().split('T')[0],
            type,
            changes,
          }
        })

        // Se não houver releases, usar dados padrão
        if (formattedVersions.length === 0) {
          setVersions(getDefaultVersions())
        } else {
          setVersions(formattedVersions)
        }
      } catch (err) {
        console.error('Error fetching releases:', err)
        setError('Failed to load changelog from GitHub')
        // Usar dados padrão em caso de erro
        setVersions(getDefaultVersions())
      } finally {
        setLoading(false)
      }
    }

    fetchReleases()
  }, [])

  const parseReleaseBody = (body: string): Version['changes'] => {
    const changes: Version['changes'] = []
    
    if (!body) return changes

    // Padrões comuns em changelogs
    const patterns = {
      added: /(?:^|\n)(?:\*\s*)?(?:added|add|new|feat):\s*(.+)/gi,
      fixed: /(?:^|\n)(?:\*\s*)?(?:fix|fixed|bugfix):\s*(.+)/gi,
      improved: /(?:^|\n)(?:\*\s*)?(?:improve|improved|enhance|enhanced):\s*(.+)/gi,
      changed: /(?:^|\n)(?:\*\s*)?(?:change|changed|update|updated):\s*(.+)/gi,
      removed: /(?:^|\n)(?:\*\s*)?(?:remove|removed|deprecate|deprecated):\s*(.+)/gi,
    }

    Object.entries(patterns).forEach(([type, pattern]) => {
      const matches = body.matchAll(pattern)
      for (const match of matches) {
        if (match[1]) {
          changes.push({
            type: type as Version['changes'][0]['type'],
            text: match[1].trim(),
          })
        }
      }
    })

    // Se não encontrou padrões, dividir por linhas que começam com - ou *
    if (changes.length === 0) {
      const lines = body.split('\n').filter(line => line.trim().match(/^[-*]\s+/))
      lines.forEach((line) => {
        const text = line.replace(/^[-*]\s+/, '').trim()
        if (text) {
          changes.push({
            type: 'added',
            text,
          })
        }
      })
    }

    return changes.length > 0 ? changes : [{ type: 'added' as const, text: 'Release notes available on GitHub' }]
  }

  const getDefaultVersions = (): Version[] => [
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
      case 'added': return t.changelog.added
      case 'fixed': return t.changelog.fixed
      case 'improved': return t.changelog.improved
      case 'changed': return 'Changed'
      case 'removed': return 'Removed'
      default: return type
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{t.changelog.title}</h1>
          <p className="text-lg text-muted-foreground">{t.changelog.subtitle}</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading changelog...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.changelog.title}</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          {t.changelog.subtitle}
        </p>
        {error && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-sm text-yellow-600 dark:text-yellow-400">
            {error} Using default changelog data.
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title={t.changelog.currentVersion}
          value={versions[0]?.version || '1.0.0'}
          subtitle="Stable release"
          variant="blue"
        />
        <MetricCard
          title={t.changelog.totalVersions}
          value={versions.length.toString()}
          subtitle={t.changelog.releases}
          variant="success"
        />
        <MetricCard
          title={t.changelog.lastUpdate}
          value={versions[0] ? formatDate(versions[0].date) : 'N/A'}
          subtitle={t.changelog.lastVersion}
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
                  {version.type === 'major' ? t.changelog.major : version.type === 'minor' ? t.changelog.minor : 'Patch'}
                </StatusBadge>
              </div>
              <span className="text-sm text-muted-foreground">{formatDate(version.date)}</span>
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
            <div className="mt-4 pt-4 border-t">
              <a
                href={`https://github.com/ferforastieri/valk-ui/releases/tag/v${version.version}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                View on GitHub
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

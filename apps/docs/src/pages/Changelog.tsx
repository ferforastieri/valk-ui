import { useState, useEffect } from 'react'
import { StatusBadge, MetricCard } from '@/components'
import { SparklesIcon } from '@/components'
import { useTranslation } from 'react-i18next'

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
        const releasesResponse = await fetch('https://api.github.com/repos/ferforastieri/valk-ui/releases?per_page=30', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        })

        if (!releasesResponse.ok) {
          throw new Error(`GitHub API error: ${releasesResponse.status}`)
        }

        const releases: GitHubRelease[] = await releasesResponse.json()
        
        const publishedReleases = releases.filter(
          (release) => !release.draft && !release.prerelease
        )

        const formattedVersions: Version[] = publishedReleases.map((release) => {
          const version = release.tag_name.replace(/^v/, '')
          const versionParts = version.split('.')
          const minor = parseInt(versionParts[1]) || 0
          const patch = parseInt(versionParts[2]) || 0
          
          const type: 'major' | 'minor' | 'patch' = 
            minor === 0 && patch === 0 ? 'major' :
            patch === 0 ? 'minor' : 'patch'

          const changes = parseReleaseBody(release.body || release.name || '')
          
          const displayDate = new Date(release.published_at).toISOString().split('T')[0]

          return {
            version,
            date: displayDate,
            type,
            changes,
          }
        })

        if (formattedVersions.length === 0) {
          try {
            const tagsResponse = await fetch('https://api.github.com/repos/ferforastieri/valk-ui/tags?per_page=30', {
              headers: {
                Accept: 'application/vnd.github.v3+json',
              },
            })

            if (tagsResponse.ok) {
              const tags = await tagsResponse.json()
              const tagVersions: Version[] = tags.slice(0, 10).map((tag: any) => {
                const version = tag.name.replace(/^v/, '')
                const versionParts = version.split('.')
                const minor = parseInt(versionParts[1]) || 0
                const patch = parseInt(versionParts[2]) || 0
                
                const type: 'major' | 'minor' | 'patch' = 
                  minor === 0 && patch === 0 ? 'major' :
                  patch === 0 ? 'minor' : 'patch'

                return {
                  version,
                  date: new Date().toISOString().split('T')[0],
                  type,
                  changes: [{ type: 'added' as const, text: `Release ${version}` }],
                }
              })

              if (tagVersions.length > 0) {
                setVersions(tagVersions)
                setLoading(false)
                return
              }
            }
          } catch (tagsError) {
          }

          setVersions(getDefaultVersions())
          setError(t('changelog.noReleasesFound') + '. ' + t('changelog.usingDefault'))
        } else {
          const sortedVersions = formattedVersions.sort((a, b) => {
            const aParts = a.version.split('.').map(Number)
            const bParts = b.version.split('.').map(Number)
            for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
              const aVal = aParts[i] || 0
              const bVal = bParts[i] || 0
              if (bVal !== aVal) return bVal - aVal
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          })
          setVersions(sortedVersions)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(`Failed to load changelog from GitHub: ${errorMessage}`)
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

    const cleanMarkdown = (text: string): string => {
      return text
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/\*\*([^\*]+)\*\*/g, '$1')
        .replace(/\*([^\*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .trim()
    }
    const patterns = {
      added: [
        /(?:^|\n)(?:\*\s*)?(?:added|add|new|feat|feature)(?:\(.+\))?:\s*(.+)/gi,
        /(?:^|\n)(?:\*\s*)?\+ (.+)/gi,
        /(?:^|\n)###?\s*(?:Added|New|Features?)\s*\n([\s\S]*?)(?=\n###|$)/gi,
      ],
      fixed: [
        /(?:^|\n)(?:\*\s*)?(?:fix|fixed|bugfix|bug)(?:\(.+\))?:\s*(.+)/gi,
        /(?:^|\n)(?:\*\s*)?🐛\s*(.+)/gi,
        /(?:^|\n)###?\s*(?:Fixed|Fixes|Bugs?)\s*\n([\s\S]*?)(?=\n###|$)/gi,
      ],
      improved: [
        /(?:^|\n)(?:\*\s*)?(?:improve|improved|enhance|enhanced|perf)(?:\(.+\))?:\s*(.+)/gi,
        /(?:^|\n)(?:\*\s*)?⚡\s*(.+)/gi,
        /(?:^|\n)###?\s*(?:Improved|Enhancements?|Performance)\s*\n([\s\S]*?)(?=\n###|$)/gi,
      ],
      changed: [
        /(?:^|\n)(?:\*\s*)?(?:change|changed|update|updated|refactor)(?:\(.+\))?:\s*(.+)/gi,
        /(?:^|\n)(?:\*\s*)?🔄\s*(.+)/gi,
        /(?:^|\n)###?\s*(?:Changed|Changes|Updates?)\s*\n([\s\S]*?)(?=\n###|$)/gi,
      ],
      removed: [
        /(?:^|\n)(?:\*\s*)?(?:remove|removed|deprecate|deprecated|removed)(?:\(.+\))?:\s*(.+)/gi,
        /(?:^|\n)(?:\*\s*)?🗑️\s*(.+)/gi,
        /(?:^|\n)###?\s*(?:Removed|Deprecated|Removals?)\s*\n([\s\S]*?)(?=\n###|$)/gi,
      ],
    }

    Object.entries(patterns).forEach(([type, typePatterns]) => {
      typePatterns.forEach((pattern) => {
        const matches = body.matchAll(pattern)
        for (const match of matches) {
          const text = match[1] || match[0]
          if (text) {
            if (text.includes('\n')) {
              const lines = text.split('\n')
                .map(line => line.trim())
                .filter(line => line && !line.match(/^#{1,6}\s/))
                .map(line => line.replace(/^[-*]\s+/, '').trim())
                .filter(line => line)
              
              lines.forEach((line) => {
                const cleaned = cleanMarkdown(line)
                if (cleaned) {
                  changes.push({
                    type: type as Version['changes'][0]['type'],
                    text: cleaned,
                  })
                }
              })
            } else {
              const cleaned = cleanMarkdown(text)
              if (cleaned) {
                changes.push({
                  type: type as Version['changes'][0]['type'],
                  text: cleaned,
                })
              }
            }
          }
        }
      })
    })

    if (changes.length === 0) {
      const lines = body.split('\n')
        .filter(line => {
          const trimmed = line.trim()
          return trimmed && (trimmed.startsWith('-') || trimmed.startsWith('*')) && !trimmed.match(/^#{1,6}\s/)
        })
      
      lines.forEach((line) => {
        const text = line.replace(/^[-*]\s+/, '').trim()
        const cleaned = cleanMarkdown(text)
        if (cleaned) {
          changes.push({
            type: 'added',
            text: cleaned,
          })
        }
      })
    }

    const uniqueChanges = changes.filter((change, index, self) =>
      index === self.findIndex((c) => c.text === change.text)
    )

    return uniqueChanges.length > 0 
      ? uniqueChanges 
      : [{ type: 'added' as const, text: 'Release notes available on GitHub' }]
  }

  const getDefaultVersions = (): Version[] => [
    {
      version: '1.0.0',
      date: '2025-01-15',
      type: 'major',
      changes: [
        { type: 'added', text: 'Componente Navigation híbrido (desktop + mobile) adicionado' },
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
      case 'added': return t('changelog.added')
      case 'fixed': return t('changelog.fixed')
      case 'improved': return t('changelog.improved')
      case 'changed': return t('changelog.changed') || 'Changed'
      case 'removed': return t('changelog.removed') || 'Removed'
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
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t('changelog.title')}</h1>
          <p className="text-base md:text-lg text-muted-foreground">{t('changelog.subtitle')}</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">{t('changelog.loading')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t('changelog.title')}</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          {t('changelog.subtitle')}
        </p>
        {error && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-sm text-yellow-600 dark:text-yellow-400">
            {error} {t('changelog.usingDefault')}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title={t('changelog.currentVersion')}
          value={versions[0]?.version || '1.0.0'}
          subtitle={t('changelog.stableRelease')}
          variant="blue"
        />
        <MetricCard
          title={t('changelog.totalVersions')}
          value={versions.length.toString()}
          subtitle={t('changelog.releases')}
          variant="success"
        />
        <MetricCard
          title={t('changelog.lastUpdate')}
          value={versions[0] ? formatDate(versions[0].date) : 'N/A'}
          subtitle={t('changelog.lastVersion')}
          variant="warning"
        />
      </div>

      <div className="space-y-6">
        {versions.map((version) => (
          <section key={version.version} className="bg-card border rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <SparklesIcon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">v{version.version}</h2>
                <StatusBadge status={version.type === 'major' ? 'completed' : 'active'}>
                  {version.type === 'major' ? t('changelog.major') : version.type === 'minor' ? t('changelog.minor') : t('changelog.patch')}
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
                {t('changelog.viewOnGitHub')}
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

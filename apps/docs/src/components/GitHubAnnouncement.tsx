import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface GitHubRelease {
  tag_name: string
  name: string
  published_at: string
  body: string
  html_url: string
}

export default function GitHubAnnouncement() {
  const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/ferforastieri/valk-ui/releases/latest', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        })

        if (response.ok) {
          const release: GitHubRelease = await response.json()
          if (!release.prerelease && !release.draft) {
            setLatestRelease(release)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchLatestRelease()
  }, [])

  if (loading || !latestRelease) {
    return null
  }

  const version = latestRelease.tag_name.replace(/^v/, '')
  const releaseDate = new Date(latestRelease.published_at)
  const daysSinceRelease = Math.floor((Date.now() - releaseDate.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysSinceRelease > 7) {
    return null
  }

  const extractNewComponents = (body: string): string[] => {
    const components: string[] = []
    const patterns = [
      /(?:added|new|feat)(?:\(.+\))?:\s*([A-Z][a-zA-Z\s,]+)/gi,
      /(?:^|\n)(?:\*\s*)?(?:added|new|feat):\s*([A-Z][a-zA-Z\s,]+)/gi,
    ]

    patterns.forEach(pattern => {
      const matches = body.matchAll(pattern)
      for (const match of matches) {
        if (match[1]) {
          const items = match[1].split(',').map(item => item.trim())
          items.forEach(item => {
            if (item && !components.includes(item)) {
              components.push(item)
            }
          })
        }
      }
    })

    return components.slice(0, 3)
  }

  const newComponents = extractNewComponents(latestRelease.body || latestRelease.name)
  const announcementText = newComponents.length > 0
    ? `New Components: ${newComponents.join(', ')}`
    : `New Release: v${version}`

  return (
    <Link
      to="/changelog"
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
    >
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      {announcementText}
    </Link>
  )
}


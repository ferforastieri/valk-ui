import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Button, 
  Input, 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components'
import { useTranslation } from '../contexts/TranslationContext'

export default function Home() {
  const [activeTab, setActiveTab] = useState('examples')
  const { t } = useTranslation()

  const tabs = [
    { id: 'examples', label: t.home.examples },
    { id: 'dashboard', label: t.home.dashboard },
    { id: 'tasks', label: t.home.tasks },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          {t.home.announcement}
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          {t.home.title}
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t.home.subtitle}
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
          <Link to="/docs">
            <Button variant="primary" size="lg">
              {t.home.getStarted}
            </Button>
          </Link>
          <Link to="/components">
            <Button variant="outline" size="lg">
              {t.home.viewComponents}
            </Button>
          </Link>
        </div>
      </div>

      {/* Component Examples Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 text-sm font-medium transition-colors
                  border-b-2 -mb-px
                  ${
                    activeTab === tab.id
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{t.home.theme}</span>
            <button className="p-2 rounded-md hover:bg-muted">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Payment Method Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t.home.paymentMethod}</CardTitle>
              <CardDescription>{t.home.paymentDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                label={t.home.nameOnCard} 
                placeholder="John Doe"
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Team Members Card */}
          <Card>
            <CardHeader>
              <div className="flex -space-x-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-sm font-medium">
                  JD
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-sm font-medium">
                  MS
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-sm font-medium">
                  PC
                </div>
              </div>
              <CardTitle>{t.home.noTeamMembers}</CardTitle>
              <CardDescription>{t.home.inviteTeam}</CardDescription>
            </CardHeader>
          </Card>

          {/* Two-factor Authentication Card */}
          <Card>
            <CardHeader>
              <div className="mb-4">
                <Input 
                  placeholder="https://"
                  className="w-full"
                  rightIcon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  }
                />
              </div>
              <CardTitle>{t.home.twoFactorAuth}</CardTitle>
              <CardDescription>{t.home.twoFactorDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="primary" size="sm">{t.home.enable}</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{t.home.copyPaste}</h3>
          <p className="text-sm text-muted-foreground">
            {t.home.copyPasteDesc}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{t.home.fullyCustomizable}</h3>
          <p className="text-sm text-muted-foreground">
            {t.home.fullyCustomizableDesc}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{t.home.typescript}</h3>
          <p className="text-sm text-muted-foreground">
            {t.home.typescriptDesc}
          </p>
        </div>
      </div>
    </div>
  )
}

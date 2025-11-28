import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Button, 
  Input, 
  Select,
  Checkbox,
  Toggle,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatusBadge,
  Badge,
  ProgressBar,
  Avatar,
  MetricCard,
  Separator,
} from '@/components'
import type { SelectOption } from '@/components'
import { useTranslation } from '../contexts/TranslationContext'
import ThemeSelector, { themes } from '../components/ThemeSelector'
import GitHubAnnouncement from '../components/GitHubAnnouncement'

export default function Home() {
  const [activeTab, setActiveTab] = useState('examples')
  const [currentTheme, setCurrentTheme] = useState('blue')
  const { t } = useTranslation()
  const [selectValue, setSelectValue] = useState<string[]>([])
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)

  const tabs = [
    { id: 'examples', label: t.home.examples },
    { id: 'dashboard', label: t.home.dashboard },
    { id: 'tasks', label: t.home.tasks },
  ]

  const selectOptions: SelectOption[] = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' },
  ]

  const currentThemeName = themes.find(t => t.value === currentTheme)?.name || 'Blue'

  const renderExamplesContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="w-full focus:!ring-primary"
          />
          <div className="flex gap-2">
            <Button variant="primary" size="sm" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">Salvar</Button>
            <Button variant="outline" size="sm" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">Cancelar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Card */}
      <Card>
        <CardHeader>
            <div className="flex -space-x-2 mb-4">
            <Avatar fallback="JD" size="md" className="border-2 border-background !bg-primary/20 !text-primary" />
            <Avatar fallback="MS" size="md" className="border-2 border-background !bg-primary/20 !text-primary" />
            <Avatar fallback="PC" size="md" className="border-2 border-background !bg-primary/20 !text-primary" />
          </div>
          <CardTitle>{t.home.noTeamMembers}</CardTitle>
          <CardDescription>{t.home.inviteTeam}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="primary" size="sm" className="w-full !bg-primary hover:!bg-primary/90 !text-primary-foreground">Convidar</Button>
        </CardFooter>
      </Card>

      {/* Two-factor Authentication Card */}
      <Card>
        <CardHeader>
          <div className="mb-4">
            <Input 
              placeholder="https://"
              className="w-full focus:!ring-primary"
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
          <Button variant="primary" size="sm" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">{t.home.enable}</Button>
        </CardContent>
      </Card>

      {/* Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
          <CardDescription>Exemplo de formulário completo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Email" placeholder="email@example.com" className="focus:!ring-primary" />
          <Select
            label="País"
            options={selectOptions}
            value={selectValue}
            onChange={(value: string | string[]) => setSelectValue(Array.isArray(value) ? value : [value])}
            className="[&_div.flex]:focus:!ring-primary [&_div.flex]:focus:!border-primary [&_div.flex.ring-2]:!ring-primary [&_div.flex.ring-2]:!border-primary"
          />
          <div className="space-y-3">
            <Checkbox 
              label="Aceito os termos"
              checked={checkboxChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckboxChecked(e.target.checked)}
            />
            <Toggle 
              label="Receber notificações"
              checked={toggleChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full !bg-primary hover:!bg-primary/90 !text-primary-foreground">Enviar</Button>
        </CardFooter>
      </Card>

      {/* Status Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>Diferentes estados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
              <StatusBadge status="active" className="!border-primary/60 font-semibold">Ativo</StatusBadge>
            <StatusBadge status="completed" className="!border-primary/60 font-semibold">Concluído</StatusBadge>
            <StatusBadge status="pending" className="!border-primary/60 font-semibold">Pendente</StatusBadge>
            <StatusBadge status="error" className="!border-primary/60 font-semibold">Erro</StatusBadge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="!bg-primary !text-primary-foreground !border-primary">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline" className="!border-primary !text-primary">Outline</Badge>
          </div>
          <ProgressBar value={65} color="blue" showLabel className="[&>div>div]:!bg-primary" />
        </CardContent>
      </Card>

      {/* Buttons Example */}
      <Card>
        <CardHeader>
          <CardTitle>Botões</CardTitle>
          <CardDescription>Diferentes variantes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">Small</Button>
            <Button variant="primary" size="md" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">Medium</Button>
            <Button variant="primary" size="lg" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">Large</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Vendas"
          value="R$ 125.430"
          subtitle="+12.5% vs mês anterior"
          variant="blue"
          className="!border-primary !bg-gradient-to-br !from-primary !to-primary/90 !text-primary-foreground"
        />
        <MetricCard
          title="Novos Usuários"
          value="1.234"
          subtitle="+8.2% vs mês anterior"
          variant="success"
        />
        <MetricCard
          title="Taxa de Conversão"
          value="3.24%"
          subtitle="+0.5% vs mês anterior"
          variant="warning"
        />
        <MetricCard
          title="Taxa de Rejeição"
          value="2.1%"
          subtitle="-1.2% vs mês anterior"
          variant="default"
        />
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar fallback="JD" size="sm" className="!bg-primary/20 !text-primary" />
                <div>
                  <p className="text-sm font-medium">João fez login</p>
                  <p className="text-xs text-muted-foreground">Há 5 minutos</p>
                </div>
              </div>
              <StatusBadge status="active" className="!border-primary/60 font-semibold">Ativo</StatusBadge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar fallback="MS" size="sm" className="!bg-primary/20 !text-primary" />
                <div>
                  <p className="text-sm font-medium">Maria atualizou perfil</p>
                  <p className="text-xs text-muted-foreground">Há 15 minutos</p>
                </div>
              </div>
              <StatusBadge status="completed" className="!border-primary/60 font-semibold">Concluído</StatusBadge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar fallback="PC" size="sm" className="!bg-primary/20 !text-primary" />
                <div>
                  <p className="text-sm font-medium">Pedro criou projeto</p>
                  <p className="text-xs text-muted-foreground">Há 1 hora</p>
                </div>
              </div>
              <StatusBadge status="pending" className="!border-primary/60 font-semibold">Pendente</StatusBadge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progresso do Projeto</CardTitle>
            <CardDescription>Status atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Design</span>
                <span>75%</span>
              </div>
              <ProgressBar value={75} color="blue" showLabel className="[&>div>div]:!bg-primary" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Desenvolvimento</span>
                <span>45%</span>
              </div>
              <ProgressBar value={45} color="green" showLabel className="[&>div>div]:!bg-primary" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Testes</span>
                <span>20%</span>
              </div>
              <ProgressBar value={20} color="yellow" showLabel className="[&>div>div]:!bg-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTasksContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Para Fazer</CardTitle>
            <CardDescription>3 tarefas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={false}
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Revisar design</p>
                  <p className="text-xs text-muted-foreground">Prioridade alta</p>
                </div>
                <Badge variant="outline" className="!border-primary !text-primary">Alta</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={false}
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Atualizar documentação</p>
                  <p className="text-xs text-muted-foreground">Prioridade média</p>
                </div>
                <Badge variant="secondary">Média</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={false}
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Reunião com equipe</p>
                  <p className="text-xs text-muted-foreground">Prioridade baixa</p>
                </div>
                <Badge variant="outline" className="!border-primary !text-primary">Baixa</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em Progresso</CardTitle>
            <CardDescription>2 tarefas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg bg-card border-primary/20">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={true}
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Implementar feature</p>
                  <p className="text-xs text-muted-foreground">60% completo</p>
                  <ProgressBar value={60} color="blue" className="mt-2 [&>div>div]:!bg-primary" />
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-card border-primary/20">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={true}
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Testes unitários</p>
                  <p className="text-xs text-muted-foreground">30% completo</p>
                  <ProgressBar value={30} color="green" className="mt-2 [&>div>div]:!bg-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Concluído</CardTitle>
            <CardDescription>5 tarefas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg bg-card opacity-60">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={true}
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-through">Setup do projeto</p>
                  <p className="text-xs text-muted-foreground">Concluído há 2 dias</p>
                </div>
                <StatusBadge status="completed" className="!border-primary/60 font-semibold">✓</StatusBadge>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-card opacity-60">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={true}
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-through">Configurar CI/CD</p>
                  <p className="text-xs text-muted-foreground">Concluído há 1 semana</p>
                </div>
                <StatusBadge status="completed" className="!border-primary/60 font-semibold">✓</StatusBadge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nova Tarefa</CardTitle>
          <CardDescription>Adicione uma nova tarefa à lista</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Título" placeholder="Digite o título da tarefa" className="focus:!ring-primary" />
          <Input label="Descrição" placeholder="Digite a descrição" className="focus:!ring-primary" />
          <Select
            label="Prioridade"
            options={[
              { value: 'high', label: 'Alta' },
              { value: 'medium', label: 'Média' },
              { value: 'low', label: 'Baixa' },
            ]}
            value={selectValue}
            onChange={(value: string | string[]) => setSelectValue(Array.isArray(value) ? value : [value])}
            className="[&_div.flex]:focus:!ring-primary [&_div.flex]:focus:!border-primary [&_div.flex.ring-2]:!ring-primary [&_div.flex.ring-2]:!border-primary"
          />
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full !bg-primary hover:!bg-primary/90 !text-primary-foreground">Adicionar Tarefa</Button>
        </CardFooter>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'examples':
        return renderExamplesContent()
      case 'dashboard':
        return renderDashboardContent()
      case 'tasks':
        return renderTasksContent()
      default:
        return renderExamplesContent()
    }
  }

  return (
    <div className="space-y-10 md:space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <GitHubAnnouncement />
        
        <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          {t.home.title}
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t.home.subtitle}
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
          <Link to="/docs">
            <Button variant="primary" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t.home.getStarted}
            </Button>
          </Link>
          <Link to="/components">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              {t.home.viewComponents}
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section - Movida para cima */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.home.copyPaste}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t.home.copyPasteDesc}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.home.fullyCustomizable}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t.home.fullyCustomizableDesc}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.home.typescript}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t.home.typescriptDesc}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Component Examples Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
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
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Tema: {currentThemeName}</span>
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}

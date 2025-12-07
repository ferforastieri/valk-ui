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
  
  // Estados para os checkboxes das tarefas
  const [taskCheckboxes, setTaskCheckboxes] = useState({
    todo1: false,
    todo2: false,
    todo3: false,
    progress1: true,
    progress2: true,
    done1: true,
    done2: true,
  })
  
  const handleTaskCheckboxChange = (taskId: keyof typeof taskCheckboxes) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskCheckboxes(prev => ({
      ...prev,
      [taskId]: e.target.checked
    }))
  }

  const tabs = [
    { id: 'examples', label: t.home.examples },
    { id: 'dashboard', label: t.home.dashboard },
    { id: 'tasks', label: t.home.tasks },
    { id: 'marketplace', label: t.home.marketplace },
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
            <StatusBadge status="active">Ativo</StatusBadge>
            <StatusBadge status="completed">Concluído</StatusBadge>
            <StatusBadge status="pending">Pendente</StatusBadge>
            <StatusBadge status="error">Erro</StatusBadge>
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
              <StatusBadge status="active">Ativo</StatusBadge>
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
              <StatusBadge status="completed">Concluído</StatusBadge>
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
              <StatusBadge status="pending">Pendente</StatusBadge>
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
                  checked={taskCheckboxes.todo1}
                  onChange={handleTaskCheckboxChange('todo1')}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Revisar design</p>
                  <p className="text-xs text-muted-foreground">Prioridade alta</p>
                </div>
                <Badge variant="high">Alta</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={taskCheckboxes.todo2}
                  onChange={handleTaskCheckboxChange('todo2')}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Atualizar documentação</p>
                  <p className="text-xs text-muted-foreground">Prioridade média</p>
                </div>
                <Badge variant="medium">Média</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={taskCheckboxes.todo3}
                  onChange={handleTaskCheckboxChange('todo3')}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Reunião com equipe</p>
                  <p className="text-xs text-muted-foreground">Prioridade baixa</p>
                </div>
                <Badge variant="low">Baixa</Badge>
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
                  checked={taskCheckboxes.progress1}
                  onChange={handleTaskCheckboxChange('progress1')}
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
                  checked={taskCheckboxes.progress2}
                  onChange={handleTaskCheckboxChange('progress2')}
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
                  checked={taskCheckboxes.done1}
                  onChange={handleTaskCheckboxChange('done1')}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-through">Setup do projeto</p>
                  <p className="text-xs text-muted-foreground">Concluído há 2 dias</p>
                </div>
                <StatusBadge status="completed">✓</StatusBadge>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-card opacity-60">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={taskCheckboxes.done2}
                  onChange={handleTaskCheckboxChange('done2')}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-through">Configurar CI/CD</p>
                  <p className="text-xs text-muted-foreground">Concluído há 1 semana</p>
                </div>
                <StatusBadge status="completed">✓</StatusBadge>
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

  const renderMarketplaceContent = () => (
    <div className="space-y-6">
      {/* Header com busca e filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <Input 
            placeholder="Buscar produtos..." 
            className="w-full focus:!ring-primary"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            options={[
              { value: 'all', label: 'Todas as categorias' },
              { value: 'electronics', label: 'Eletrônicos' },
              { value: 'clothing', label: 'Roupas' },
              { value: 'books', label: 'Livros' },
            ]}
            value={selectValue}
            onChange={(value: string | string[]) => setSelectValue(Array.isArray(value) ? value : [value])}
            className="flex-1 sm:flex-none sm:w-48 [&_div.flex]:focus:!ring-primary"
          />
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Produto 1 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
            <div className="text-6xl">📱</div>
          </div>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">Smartphone Pro Max</CardTitle>
                <CardDescription>128GB, Tela 6.7", 5G</CardDescription>
              </div>
              <StatusBadge status="active">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" />
              <div>
                <p className="text-sm font-medium">4.8</p>
                <p className="text-xs text-muted-foreground">234 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 2.499</p>
                <p className="text-sm text-muted-foreground line-through">R$ 2.999</p>
              </div>
              <Badge variant="high">-17%</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              ♡
            </Button>
          </CardFooter>
        </Card>

        {/* Produto 2 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="h-48 bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-6xl">👕</div>
          </div>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">Camiseta Premium</CardTitle>
                <CardDescription>Algodão 100%, Múltiplas cores</CardDescription>
              </div>
              <StatusBadge status="active">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" />
              <div>
                <p className="text-sm font-medium">4.6</p>
                <p className="text-xs text-muted-foreground">89 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 89</p>
                <p className="text-sm text-muted-foreground">Preço único</p>
              </div>
              <Badge variant="medium">Popular</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              ♡
            </Button>
          </CardFooter>
        </Card>

        {/* Produto 3 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="h-48 bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-6xl">📚</div>
          </div>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">Livro: Design Systems</CardTitle>
                <CardDescription>Edição especial, 400 páginas</CardDescription>
              </div>
              <StatusBadge status="pending">Últimas Unidades</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" />
              <div>
                <p className="text-sm font-medium">4.9</p>
                <p className="text-xs text-muted-foreground">156 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 59</p>
                <p className="text-sm text-muted-foreground">Edição limitada</p>
              </div>
              <Badge variant="low">Novo</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              ♡
            </Button>
          </CardFooter>
        </Card>

        {/* Produto 4 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="h-48 bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-6xl">🎧</div>
          </div>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">Fones Bluetooth</CardTitle>
                <CardDescription>Cancelamento de ruído, 30h bateria</CardDescription>
              </div>
              <StatusBadge status="active">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" />
              <div>
                <p className="text-sm font-medium">4.7</p>
                <p className="text-xs text-muted-foreground">312 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 349</p>
                <p className="text-sm text-muted-foreground line-through">R$ 449</p>
              </div>
              <Badge variant="high">-22%</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              ♡
            </Button>
          </CardFooter>
        </Card>

        {/* Produto 5 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="h-48 bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-6xl">⌚</div>
          </div>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">Smartwatch Pro</CardTitle>
                <CardDescription>Monitor de saúde, GPS, Resistente à água</CardDescription>
              </div>
              <StatusBadge status="completed">Mais Vendido</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" />
              <div>
                <p className="text-sm font-medium">4.8</p>
                <p className="text-xs text-muted-foreground">567 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 899</p>
                <p className="text-sm text-muted-foreground">Preço especial</p>
              </div>
              <Badge variant="medium">Destaque</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              ♡
            </Button>
          </CardFooter>
        </Card>

        {/* Produto 6 */}
        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="h-48 bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-6xl">💻</div>
          </div>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">Notebook Ultra</CardTitle>
                <CardDescription>16GB RAM, SSD 512GB, Intel i7</CardDescription>
              </div>
              <StatusBadge status="active">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" />
              <div>
                <p className="text-sm font-medium">4.9</p>
                <p className="text-xs text-muted-foreground">123 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">R$ 4.999</p>
                <p className="text-sm text-muted-foreground line-through">R$ 5.999</p>
              </div>
              <Badge variant="high">-17%</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              ♡
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Carrinho de Compras */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Carrinho de Compras</CardTitle>
              <CardDescription>3 itens no carrinho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 border rounded-lg bg-card">
                <Avatar fallback="📱" size="md" className="flex-shrink-0" />
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <p className="text-sm font-medium truncate">Smartphone Pro Max</p>
                  <p className="text-xs text-muted-foreground">Quantidade: 1</p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-sm font-bold">R$ 2.499</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 border rounded-lg bg-card">
                <Avatar fallback="👕" size="md" className="flex-shrink-0" />
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <p className="text-sm font-medium truncate">Camiseta Premium</p>
                  <p className="text-xs text-muted-foreground">Quantidade: 2</p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-sm font-bold">R$ 178</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-sm font-medium">R$ 2.677</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Frete</p>
                <p className="text-sm font-medium">R$ 15,00</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-2xl font-bold text-primary">R$ 2.692</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="primary" className="w-full !bg-primary hover:!bg-primary/90 !text-primary-foreground">
                Finalizar Compra
              </Button>
              <Button variant="outline" className="w-full !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
                Continuar Comprando
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
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
      case 'marketplace':
        return renderMarketplaceContent()
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

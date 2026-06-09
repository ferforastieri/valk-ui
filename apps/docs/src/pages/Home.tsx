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
import { useTranslation } from 'react-i18next'
import ThemeSelector from '../components/ThemeSelector'
import GitHubAnnouncement from '../components/GitHubAnnouncement'

export default function Home() {
  const [activeTab, setActiveTab] = useState('examples')
  const [currentTheme, setCurrentTheme] = useState('blue')
  const { t } = useTranslation()
  const [selectValue, setSelectValue] = useState<string[]>([])
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)
  
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
    { id: 'examples', label: t('home.examples') },
    { id: 'dashboard', label: t('home.dashboard') },
    { id: 'tasks', label: t('home.tasks') },
    { id: 'marketplace', label: t('home.marketplace') },
  ]

  const selectOptions: SelectOption[] = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' },
  ]

  const renderExamplesContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('home.paymentMethod')}</CardTitle>
          <CardDescription>{t('home.paymentDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            label={t('home.nameOnCard')} 
            placeholder="John Doe"
            className="w-full focus:!ring-primary"
          />
          <div className="flex gap-2">
            <Button variant="primary" size="sm" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">Salvar</Button>
            <Button variant="outline" size="sm" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">Cancelar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex -space-x-2 mb-4">
            <Avatar fallback="JD" size="md" className="border-2 border-background !bg-primary/20 !text-primary" />
            <Avatar fallback="MS" size="md" className="border-2 border-background !bg-primary/20 !text-primary" />
            <Avatar fallback="PC" size="md" className="border-2 border-background !bg-primary/20 !text-primary" />
          </div>
          <CardTitle>{t('home.noTeamMembers')}</CardTitle>
          <CardDescription>{t('home.inviteTeam')}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="primary" size="sm" className="w-full !bg-primary hover:!bg-primary/90 !text-primary-foreground">Convidar</Button>
        </CardFooter>
      </Card>

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
          <CardTitle>{t('home.twoFactorAuth')}</CardTitle>
          <CardDescription>{t('home.twoFactorDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="primary" size="sm" className="!bg-primary hover:!bg-primary/90 !text-primary-foreground">{t('home.enable')}</Button>
        </CardContent>
      </Card>

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
            <div className="p-3 rounded-md bg-muted/30">
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
            <div className="p-3 rounded-md bg-muted/30">
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
            <div className="p-3 rounded-md bg-muted/30">
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
            <div className="p-3 rounded-md bg-primary/10">
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
            <div className="p-3 rounded-md bg-primary/10">
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
            <div className="p-3 rounded-md bg-muted/20 opacity-70">
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
            <div className="p-3 rounded-md bg-muted/20 opacity-70">
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
    <div className="space-y-6 w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between w-full">
        <div className="flex-1 w-full min-w-0 sm:max-w-md">
          <Input 
            placeholder="Buscar produtos..." 
            className="w-full focus:!ring-primary"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
          <Select
            options={[
              { value: 'all', label: 'Todas as categorias' },
              { value: 'electronics', label: 'Eletrônicos' },
              { value: 'clothing', label: 'Roupas' },
              { value: 'books', label: 'Livros' },
            ]}
            value={selectValue}
            onChange={(value: string | string[]) => setSelectValue(Array.isArray(value) ? value : [value])}
            className="w-full sm:w-48 [&_div.flex]:focus:!ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full w-full">
          <div className="h-32 sm:h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
            <div className="text-4xl sm:text-6xl">📱</div>
          </div>
          <CardHeader className="flex-shrink-0 pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg break-words">Smartphone Pro Max</CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">128GB, Tela 6.7", 5G</CardDescription>
              </div>
              <StatusBadge status="active" className="flex-shrink-0 text-xs">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 flex-1 pb-2 sm:pb-3">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">4.8</p>
                <p className="text-xs text-muted-foreground truncate">234 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words">R$ 2.499</p>
                <p className="text-xs sm:text-sm text-muted-foreground line-through break-words">R$ 2.999</p>
              </div>
              <Badge variant="high" className="flex-shrink-0 text-xs">-17%</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0 pt-2 sm:pt-3">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground text-xs sm:text-sm">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground px-2 sm:px-3">
              ♡
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full w-full">
          <div className="h-32 sm:h-48 bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-4xl sm:text-6xl">👕</div>
          </div>
          <CardHeader className="flex-shrink-0 pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg break-words">Camiseta Premium</CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">Algodão 100%, Múltiplas cores</CardDescription>
              </div>
              <StatusBadge status="active" className="flex-shrink-0 text-xs">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 flex-1 pb-2 sm:pb-3">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">4.6</p>
                <p className="text-xs text-muted-foreground truncate">89 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words">R$ 89</p>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">Preço único</p>
              </div>
              <Badge variant="medium" className="flex-shrink-0 text-xs">Popular</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0 pt-2 sm:pt-3">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground text-xs sm:text-sm">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground px-2 sm:px-3">
              ♡
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full w-full">
          <div className="h-32 sm:h-48 bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-4xl sm:text-6xl">📚</div>
          </div>
          <CardHeader className="flex-shrink-0 pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg break-words">Livro: Design Systems</CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">Edição especial, 400 páginas</CardDescription>
              </div>
              <StatusBadge status="pending" className="flex-shrink-0 text-xs">Últimas Unidades</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 flex-1 pb-2 sm:pb-3">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">4.9</p>
                <p className="text-xs text-muted-foreground truncate">156 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words">R$ 59</p>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">Edição limitada</p>
              </div>
              <Badge variant="low" className="flex-shrink-0 text-xs">Novo</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0 pt-2 sm:pt-3">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground text-xs sm:text-sm">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground px-2 sm:px-3">
              ♡
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full w-full">
          <div className="h-32 sm:h-48 bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-4xl sm:text-6xl">🎧</div>
          </div>
          <CardHeader className="flex-shrink-0 pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg break-words">Fones Bluetooth</CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">Cancelamento de ruído, 30h bateria</CardDescription>
              </div>
              <StatusBadge status="active" className="flex-shrink-0 text-xs">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 flex-1 pb-2 sm:pb-3">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">4.7</p>
                <p className="text-xs text-muted-foreground truncate">312 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words">R$ 349</p>
                <p className="text-xs sm:text-sm text-muted-foreground line-through break-words">R$ 449</p>
              </div>
              <Badge variant="high" className="flex-shrink-0 text-xs">-22%</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0 pt-2 sm:pt-3">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground text-xs sm:text-sm">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground px-2 sm:px-3">
              ♡
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full w-full">
          <div className="h-32 sm:h-48 bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-4xl sm:text-6xl">⌚</div>
          </div>
          <CardHeader className="flex-shrink-0 pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg break-words">Smartwatch Pro</CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">Monitor de saúde, GPS, Resistente à água</CardDescription>
              </div>
              <StatusBadge status="completed" className="flex-shrink-0 text-xs">Mais Vendido</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 flex-1 pb-2 sm:pb-3">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">4.8</p>
                <p className="text-xs text-muted-foreground truncate">567 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words">R$ 899</p>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">Preço especial</p>
              </div>
              <Badge variant="medium" className="flex-shrink-0 text-xs">Destaque</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0 pt-2 sm:pt-3">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground text-xs sm:text-sm">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground px-2 sm:px-3">
              ♡
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full w-full">
          <div className="h-32 sm:h-48 bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center flex-shrink-0">
            <div className="text-4xl sm:text-6xl">💻</div>
          </div>
          <CardHeader className="flex-shrink-0 pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg break-words">Notebook Ultra</CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">16GB RAM, SSD 512GB, Intel i7</CardDescription>
              </div>
              <StatusBadge status="active" className="flex-shrink-0 text-xs">Em Estoque</StatusBadge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 flex-1 pb-2 sm:pb-3">
            <div className="flex items-center gap-2">
              <Avatar fallback="⭐" size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">4.9</p>
                <p className="text-xs text-muted-foreground truncate">123 avaliações</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words">R$ 4.999</p>
                <p className="text-xs sm:text-sm text-muted-foreground line-through break-words">R$ 5.999</p>
              </div>
              <Badge variant="high" className="flex-shrink-0 text-xs">-17%</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-shrink-0 pt-2 sm:pt-3">
            <Button variant="primary" className="flex-1 !bg-primary hover:!bg-primary/90 !text-primary-foreground text-xs sm:text-sm">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" className="!border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground px-2 sm:px-3">
              ♡
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        <div className="lg:col-span-2 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg break-words">Carrinho de Compras</CardTitle>
              <CardDescription className="text-xs sm:text-sm">3 itens no carrinho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-3 w-full border-b border-border/60">
                <Avatar fallback="📱" size="md" className="flex-shrink-0" />
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <p className="text-xs sm:text-sm font-medium break-words">Smartphone Pro Max</p>
                  <p className="text-xs text-muted-foreground">Quantidade: 1</p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-xs sm:text-sm font-bold break-words">R$ 2.499</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-3 w-full">
                <Avatar fallback="👕" size="md" className="flex-shrink-0" />
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <p className="text-xs sm:text-sm font-medium break-words">Camiseta Premium</p>
                  <p className="text-xs text-muted-foreground">Quantidade: 2</p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-xs sm:text-sm font-bold break-words">R$ 178</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg break-words">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-muted-foreground break-words">Subtotal</p>
                <p className="text-xs sm:text-sm font-medium break-words">R$ 2.677</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-muted-foreground break-words">Frete</p>
                <p className="text-xs sm:text-sm font-medium break-words">R$ 15,00</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg font-semibold break-words">Total</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary break-words">R$ 2.692</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="primary" className="w-full !bg-primary hover:!bg-primary/90 !text-primary-foreground text-xs sm:text-sm">
                Finalizar Compra
              </Button>
              <Button variant="outline" className="w-full !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground text-xs sm:text-sm">
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
    <div className="min-h-screen bg-background">
      <div className="w-full border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 md:pt-2 md:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4">
              <GitHubAnnouncement />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground mb-4 leading-tight">
              {t('home.title')}
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/docs">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="!bg-primary hover:!bg-primary/90 !text-primary-foreground px-8 py-6 text-base font-semibold"
                >
                  {t('home.getStarted')}
                </Button>
              </Link>
              <Link to="/components">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="!border-2 !border-primary/40 !text-primary hover:!bg-primary hover:!text-primary-foreground px-8 py-6 text-base font-semibold"
                >
                  {t('home.viewComponents')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-10">
          <div className="flex gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{t('home.copyPaste')}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('home.copyPasteDesc')}
              </p>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{t('home.fullyCustomizable')}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('home.fullyCustomizableDesc')}
              </p>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{t('home.typescript')}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('home.typescriptDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-2">{t('home.showcase')}</h2>
                <p className="text-lg md:text-xl text-muted-foreground">{t('home.showcaseDescription')}</p>
              </div>
              
              <div className="flex items-center gap-4 px-4 py-2 bg-background rounded-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">Tema:</span>
                <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm md:text-base font-semibold transition-all border-2
                    ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                        : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

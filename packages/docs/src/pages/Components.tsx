import { useState } from 'react'
import { 
  Button, 
  Input, 
  Select, 
  Checkbox, 
  Toggle, 
  DatePicker,
  Modal,
  StatusBadge,
  ProgressBar,
  Avatar,
  MetricCard,
  PaginatedTable,
  BarChart,
  DonutChart,
  LineChart
} from '@/components'
import type { SelectOption } from '@/components'
import { 
  MagnifyingGlassIcon,
  UserIcon,
  ChartBarIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline'

export default function Components() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectValue, setSelectValue] = useState<string>('')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)
  const [dateValue, setDateValue] = useState('')

  const selectOptions: SelectOption[] = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' },
  ]

  const tableColumns = [
    { key: 'name', title: 'Nome' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' },
  ]

  const tableData = [
    { name: 'João Silva', email: 'joao@example.com', status: 'Ativo' },
    { name: 'Maria Santos', email: 'maria@example.com', status: 'Ativo' },
    { name: 'Pedro Costa', email: 'pedro@example.com', status: 'Inativo' },
  ]

  const barChartData = {
    label: 'Vendas',
    previousPeriod: 50000,
    selectedPeriod: 75000,
  }

  const donutChartData = [
    {
      label: 'Concluído',
      value: 75,
      percentage: 75,
      color: '#10b981',
    },
  ]

  const lineChartData = [10, 20, 15, 30, 25, 40, 35]
  const lineChartLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']

  const categories = [
    {
      name: 'Formulários',
      id: 'forms',
      components: [
        {
          name: 'Button',
          description: 'Botões com múltiplas variantes e tamanhos',
          demo: (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <Button loading>Carregando...</Button>
            </div>
          ),
        },
        {
          name: 'Input',
          description: 'Campos de entrada com suporte a ícones e validação',
          demo: (
            <div className="space-y-4 max-w-md">
              <Input label="Nome" placeholder="Digite seu nome" />
              <Input 
                label="Email" 
                placeholder="email@example.com"
                leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
              <Input label="Senha" type="password" error="Senha muito curta" />
            </div>
          ),
        },
        {
          name: 'Select',
          description: 'Seletor customizado com busca e modo múltiplo',
          demo: (
            <div className="max-w-md">
              <Select
                label="Selecione uma opção"
                options={selectOptions}
                value={selectValue}
                onChange={(value: string | string[]) => setSelectValue(typeof value === 'string' ? value : value[0] || '')}
                placeholder="Escolha..."
              />
            </div>
          ),
        },
        {
          name: 'Checkbox',
          description: 'Checkbox customizado com label e descrição',
          demo: (
            <div className="space-y-4">
              <Checkbox 
                label="Aceito os termos e condições"
                checked={checkboxChecked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckboxChecked(e.target.checked)}
              />
              <Checkbox 
                label="Receber notificações"
                description="Você receberá emails sobre atualizações"
                checked={checkboxChecked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckboxChecked(e.target.checked)}
              />
            </div>
          ),
        },
        {
          name: 'Toggle',
          description: 'Switch toggle com diferentes tamanhos',
          demo: (
            <div className="space-y-4">
              <Toggle 
                label="Notificações"
                checked={toggleChecked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
              />
              <Toggle 
                label="Modo escuro"
                size="lg"
                checked={toggleChecked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
              />
            </div>
          ),
        },
        {
          name: 'DatePicker',
          description: 'Seletor de data com calendário',
          demo: (
            <div className="max-w-md">
              <DatePicker
                label="Data de nascimento"
                value={dateValue}
                onChange={setDateValue}
              />
            </div>
          ),
        },
      ],
    },
    {
      name: 'Feedback',
      id: 'feedback',
      components: [
        {
          name: 'Modal',
          description: 'Modal responsivo com diferentes tamanhos',
          demo: (
            <div>
              <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Exemplo de Modal"
                size="md"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  Este é um exemplo de modal. Você pode adicionar qualquer conteúdo aqui.
                </p>
                <div className="mt-4 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setModalOpen(false)}>
                    Confirmar
                  </Button>
                </div>
              </Modal>
            </div>
          ),
        },
        {
          name: 'StatusBadge',
          description: 'Badges para indicar status',
          demo: (
            <div className="flex flex-wrap gap-3">
              <StatusBadge status="active">Ativo</StatusBadge>
              <StatusBadge status="completed">Concluído</StatusBadge>
              <StatusBadge status="pending">Pendente</StatusBadge>
              <StatusBadge status="error">Erro</StatusBadge>
              <StatusBadge status="warning">Aviso</StatusBadge>
              <StatusBadge status="inactive">Inativo</StatusBadge>
            </div>
          ),
        },
        {
          name: 'ProgressBar',
          description: 'Barra de progresso com diferentes cores',
          demo: (
            <div className="space-y-4 max-w-md">
              <ProgressBar value={75} color="blue" showLabel />
              <ProgressBar value={50} color="green" showLabel />
              <ProgressBar value={25} color="purple" showLabel />
              <ProgressBar value={90} color="orange" showLabel />
            </div>
          ),
        },
      ],
    },
    {
      name: 'Layout',
      id: 'layout',
      components: [
        {
          name: 'Avatar',
          description: 'Avatar com fallback para iniciais',
          demo: (
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" size="sm" />
              <Avatar fallback="João Silva" size="md" />
              <Avatar fallback="Maria Santos" size="lg" />
              <Avatar fallback="Pedro Costa" size="xl" shape="square" />
            </div>
          ),
        },
        {
          name: 'MetricCard',
          description: 'Card para exibir métricas e KPIs',
          demo: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="Total de Vendas"
                value="R$ 125.000"
                subtitle="Este mês"
                variant="blue"
              />
              <MetricCard
                title="Usuários Ativos"
                value="1.234"
                subtitle="+12% vs mês anterior"
                trend={{ value: 12, label: '%', isPositive: true }}
                variant="success"
              />
              <MetricCard
                title="Taxa de Conversão"
                value="3.2%"
                subtitle="-0.5% vs mês anterior"
                trend={{ value: -0.5, label: '%', isPositive: false }}
                variant="warning"
              />
            </div>
          ),
        },
        {
          name: 'PaginatedTable',
          description: 'Tabela paginada com busca e ordenação',
          demo: (
            <div>
              <PaginatedTable
                columns={tableColumns}
                data={tableData}
                totalItems={3}
                currentPage={1}
                pageSize={10}
                onPageChange={() => {}}
              />
            </div>
          ),
        },
      ],
    },
    {
      name: 'Gráficos',
      id: 'charts',
      components: [
        {
          name: 'BarChart',
          description: 'Gráfico de barras comparativo',
          demo: (
            <div className="max-w-md">
              <BarChart
                title="Vendas Mensais"
                data={barChartData}
                isCurrency
              />
            </div>
          ),
        },
        {
          name: 'DonutChart',
          description: 'Gráfico de rosca (donut)',
          demo: (
            <div className="max-w-md">
              <DonutChart
                title="Progresso"
                data={donutChartData}
              />
            </div>
          ),
        },
        {
          name: 'LineChart',
          description: 'Gráfico de linha temporal',
          demo: (
            <div>
              <LineChart
                title="Evolução de Vendas"
                data={lineChartData}
                labels={lineChartLabels}
                color="#3b82f6"
              />
            </div>
          ),
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Documentação
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore todos os componentes disponíveis no Valk UI e aprenda como usá-los
        </p>
      </div>

      {/* CLI Instructions Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <CodeBracketIcon className="h-8 w-8 text-blue-600" />
          Como Usar o CLI
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              📦 Instalação do CLI
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                <div className="mb-2"># Instalar globalmente</div>
                <div className="mb-2">npm install -g valk-ui</div>
                <div className="mb-2"># ou usar diretamente com npx (recomendado)</div>
                <div>npx valk-ui</div>
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🚀 Passo a Passo
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Escolha o Idioma
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Selecione entre Português, Inglês ou Espanhol
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Escolha a Tecnologia
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Selecione React/TypeScript ou Blade/Laravel
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Modo de Instalação
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Escolha entre: por categoria, individual ou todos os componentes
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Selecione os Componentes
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Escolha quais componentes deseja instalar (ou todos)
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Defina o Diretório
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Escolha onde os componentes serão instalados (padrão: ./src/components/ui para React)
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Pronto!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Os componentes serão copiados para o seu projeto e você pode começar a usá-los imediatamente
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              💡 Dicas
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Para React: os componentes serão instalados em <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">./src/components/ui</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Para Blade: os componentes serão instalados em <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">./resources/views/components</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>O CLI também copia os utilitários necessários (como <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">cn</code> para React)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Você pode instalar componentes adicionais a qualquer momento executando o CLI novamente</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="space-y-6">
          <div className="flex items-center gap-3">
            {category.id === 'forms' && <UserIcon className="h-8 w-8 text-blue-600" />}
            {category.id === 'feedback' && <ChartBarIcon className="h-8 w-8 text-green-600" />}
            {category.id === 'layout' && <ChartBarIcon className="h-8 w-8 text-purple-600" />}
            {category.id === 'charts' && <ChartBarIcon className="h-8 w-8 text-orange-600" />}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h2>
          </div>

          <div className="space-y-8">
            {category.components.map((component) => (
              <div
                key={component.name}
                className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {component.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {component.description}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  {component.demo}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

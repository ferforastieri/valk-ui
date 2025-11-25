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

export default function Components() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectValue, setSelectValue] = useState<string[]>([])
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
  ] as const

  const lineChartData = [10, 20, 15, 30, 25, 40, 35]
  const lineChartLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Componentes</h1>
        <p className="text-lg text-muted-foreground">
          Explore todos os componentes disponíveis na biblioteca Valk UI.
        </p>
      </div>

      {/* Forms */}
      <section className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Button</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Input</h3>
            <Input label="Nome" placeholder="Digite seu nome" />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Select</h3>
            <Select
              label="Selecione"
              options={selectOptions}
              value={selectValue}
              onChange={(value: string | string[]) => setSelectValue(Array.isArray(value) ? value : [value])}
              mode="multi"
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Checkbox & Toggle</h3>
            <div className="space-y-3">
              <Checkbox 
                label="Aceito os termos"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Toggle 
                label="Notificações"
                checked={toggleChecked}
                onChange={(e) => setToggleChecked(e.target.checked)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">DatePicker</h3>
            <DatePicker
              label="Data"
              value={dateValue}
              onChange={(value) => setDateValue(value)}
              placeholder="Selecione uma data"
            />
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">StatusBadge</h3>
            <div className="flex flex-wrap gap-3">
              <StatusBadge status="active">Ativo</StatusBadge>
              <StatusBadge status="completed">Concluído</StatusBadge>
              <StatusBadge status="pending">Pendente</StatusBadge>
              <StatusBadge status="error">Erro</StatusBadge>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">ProgressBar</h3>
            <ProgressBar value={75} color="blue" showLabel />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Modal</h3>
            <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Exemplo de Modal"
            >
              <p className="text-muted-foreground mb-4">Este é um exemplo de modal.</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
                <Button onClick={() => setModalOpen(false)}>Confirmar</Button>
              </div>
            </Modal>
          </div>
        </div>
      </section>

      {/* Layout */}
      <section className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Layout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Avatar</h3>
            <div className="flex gap-4">
              <Avatar fallback="JS" size="md" />
              <Avatar fallback="MS" size="md" />
              <Avatar fallback="PC" size="md" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">MetricCard</h3>
            <div className="grid grid-cols-3 gap-2">
              <MetricCard
                title="Vendas"
                value="R$ 125k"
                subtitle="Este mês"
                variant="blue"
              />
              <MetricCard
                title="Usuários"
                value="1.2k"
                subtitle="Ativos"
                variant="success"
              />
              <MetricCard
                title="Taxa"
                value="3.2%"
                subtitle="Conversão"
                variant="warning"
              />
            </div>
          </div>
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-foreground">PaginatedTable</h3>
            <PaginatedTable
              columns={tableColumns}
              data={tableData}
              itemsPerPage={10}
            />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Charts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-4">BarChart</h3>
            <BarChart
              title="Vendas Mensais"
              data={barChartData}
              isCurrency
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">DonutChart</h3>
            <DonutChart
              title="Progresso"
              data={donutChartData}
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">LineChart</h3>
            <LineChart
              title="Evolução"
              data={lineChartData}
              labels={lineChartLabels}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

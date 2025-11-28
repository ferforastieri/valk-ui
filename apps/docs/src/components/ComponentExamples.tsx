import { useState } from 'react'
import {
  Button,
  Input,
  Select,
  Checkbox,
  Toggle,
  DatePicker,
  Modal,
  Dialog,
  StatusBadge,
  Badge,
  ProgressBar,
  DropdownMenu,
  DropdownMenuItem,
  Command,
  ThemeToggle,
  Avatar,
  MetricCard,
  PaginatedTable,
  Accordion,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  Sheet,
  Navigation,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  BarChart,
  DonutChart,
  LineChart,
} from '@/components'
import type { SelectOption, CommandItem } from '@/components'

interface ComponentExamplesProps {
  componentName: string
}

export default function ComponentExamples({ componentName }: ComponentExamplesProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectValue, setSelectValue] = useState<string[]>([])
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)
  const [dateValue, setDateValue] = useState('')
  const [activeTab, setActiveTab] = useState('tab1')

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

  const renderComponent = () => {
    switch (componentName?.toLowerCase()) {
      case 'button':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
        )
      case 'input':
        return <Input label="Nome" placeholder="Digite seu nome" />
      case 'select':
        return (
          <Select
            label="Selecione"
            options={selectOptions}
            value={selectValue}
            onChange={(value: string | string[]) => setSelectValue(Array.isArray(value) ? value : [value])}
            mode="multi"
          />
        )
      case 'checkbox':
        return (
          <Checkbox
            label="Aceito os termos"
            checked={checkboxChecked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckboxChecked(e.target.checked)}
          />
        )
      case 'toggle':
        return (
          <Toggle
            label="Notificações"
            checked={toggleChecked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToggleChecked(e.target.checked)}
          />
        )
      case 'datepicker':
        return (
          <DatePicker
            label="Data"
            value={dateValue}
            onChange={(value: string) => setDateValue(value)}
            placeholder="Selecione uma data"
          />
        )
      case 'modal':
        return (
          <div>
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
        )
      case 'dialog':
        return (
          <div>
            <Button onClick={() => setDialogOpen(true)}>Abrir Dialog</Button>
            <Dialog
              isOpen={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Exemplo de Dialog"
            >
              <p className="text-muted-foreground mb-4">Este é um exemplo de dialog.</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => setDialogOpen(false)}>Confirmar</Button>
              </div>
            </Dialog>
          </div>
        )
      case 'statusbadge':
        return (
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="active">Ativo</StatusBadge>
            <StatusBadge status="completed">Concluído</StatusBadge>
            <StatusBadge status="pending">Pendente</StatusBadge>
            <StatusBadge status="error">Erro</StatusBadge>
          </div>
        )
      case 'badge':
        return (
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        )
      case 'progressbar':
        return <ProgressBar value={75} color="blue" showLabel />
      case 'dropdownmenu':
        return (
          <DropdownMenu trigger={<Button>Abrir Menu</Button>}>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenu>
        )
      case 'command':
        return (
          <Command
            placeholder="Buscar..."
            items={[
              { id: '1', title: 'Item 1', description: 'Descrição do item 1' },
              { id: '2', title: 'Item 2', description: 'Descrição do item 2' },
              { id: '3', title: 'Item 3', description: 'Descrição do item 3' },
            ]}
            onSelect={(item: CommandItem) => console.log('Selected:', item)}
          />
        )
      case 'themetoggle':
        return <ThemeToggle theme="light" onToggle={() => {}} />
      case 'avatar':
        return (
          <div className="flex gap-4">
            <Avatar fallback="JS" size="md" />
            <Avatar fallback="MS" size="md" />
            <Avatar fallback="PC" size="md" />
          </div>
        )
      case 'metriccard':
        return (
          <div className="grid grid-cols-3 gap-4">
            <MetricCard title="Vendas" value="R$ 125k" subtitle="Este mês" variant="blue" />
            <MetricCard title="Usuários" value="1.2k" subtitle="Ativos" variant="success" />
            <MetricCard title="Taxa" value="3.2%" subtitle="Conversão" variant="warning" />
          </div>
        )
      case 'paginatedtable':
        return <PaginatedTable columns={tableColumns} data={tableData} itemsPerPage={10} />
      case 'accordion':
        return (
          <Accordion
            items={[
              { value: 'item1', trigger: 'Item 1', content: <p>Conteúdo do item 1</p> },
              { value: 'item2', trigger: 'Item 2', content: <p>Conteúdo do item 2</p> },
              { value: 'item3', trigger: 'Item 3', content: <p>Conteúdo do item 3</p> },
            ]}
          />
        )
      case 'card':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        )
      case 'separator':
        return (
          <div className="space-y-4">
            <p>Texto acima</p>
            <Separator />
            <p>Texto abaixo</p>
          </div>
        )
      case 'sheet':
        return (
          <div>
            <Button onClick={() => setSheetOpen(true)}>Abrir Sheet</Button>
            <Sheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} side="right">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Sheet Content</h2>
                <p className="text-muted-foreground">Conteúdo do sheet aqui</p>
              </div>
            </Sheet>
          </div>
        )
      case 'navigation':
        return (
          <Navigation
            items={[
              { name: 'Home', href: '/' },
              { name: 'Docs', href: '/docs' },
              { name: 'Components', href: '/components' },
            ]}
            currentPath="/components"
          />
        )
      case 'tabs':
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p>Conteúdo da Tab 1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Conteúdo da Tab 2</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Conteúdo da Tab 3</p>
            </TabsContent>
          </Tabs>
        )
      case 'barchart':
        return <BarChart title="Vendas Mensais" data={barChartData} isCurrency />
      case 'donutchart':
        return <DonutChart title="Progresso" data={donutChartData} />
      case 'linechart':
        return <LineChart title="Evolução" data={lineChartData} labels={lineChartLabels} />
      default:
        return <p>Componente não encontrado</p>
    }
  }

  const getCodeExample = () => {
    const componentNameFormatted = componentName?.charAt(0).toUpperCase() + componentName?.slice(1)
    
    switch (componentName?.toLowerCase()) {
      case 'button':
        return `import { Button } from '@/components'

function MyComponent() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`
      case 'input':
        return `import { Input } from '@/components'

function MyComponent() {
  const [value, setValue] = useState('')
  
  return (
    <Input 
      label="Nome" 
      placeholder="Digite seu nome"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}`
      case 'select':
        return `import { Select } from '@/components'
import type { SelectOption } from '@/components'

function MyComponent() {
  const [value, setValue] = useState<string[]>([])
  const options: SelectOption[] = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
  ]
  
  return (
    <Select
      label="Selecione"
      options={options}
      value={value}
      onChange={setValue}
      mode="multi"
    />
  )
}`
      case 'checkbox':
        return `import { Checkbox } from '@/components'

function MyComponent() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Checkbox 
      label="Aceito os termos"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  )
}`
      case 'toggle':
        return `import { Toggle } from '@/components'

function MyComponent() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <Toggle 
      label="Notificações"
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    />
  )
}`
      case 'datepicker':
        return `import { DatePicker } from '@/components'

function MyComponent() {
  const [date, setDate] = useState('')
  
  return (
    <DatePicker
      label="Data"
      value={date}
      onChange={setDate}
      placeholder="Selecione uma data"
    />
  )
}`
      case 'modal':
        return `import { Modal, Button } from '@/components'
import { useState } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Título do Modal"
      >
        <p>Conteúdo do modal aqui</p>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirmar</Button>
        </div>
      </Modal>
    </>
  )
}`
      case 'dialog':
        return `import { Dialog, Button } from '@/components'
import { useState } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Dialog</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Título do Dialog"
      >
        <p>Conteúdo do dialog aqui</p>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirmar</Button>
        </div>
      </Dialog>
    </>
  )
}`
      case 'statusbadge':
        return `import { StatusBadge } from '@/components'

function MyComponent() {
  return (
    <div className="flex gap-3">
      <StatusBadge status="active">Ativo</StatusBadge>
      <StatusBadge status="completed">Concluído</StatusBadge>
      <StatusBadge status="pending">Pendente</StatusBadge>
      <StatusBadge status="error">Erro</StatusBadge>
    </div>
  )
}`
      case 'badge':
        return `import { Badge } from '@/components'

function MyComponent() {
  return (
    <div className="flex gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`
      case 'progressbar':
        return `import { ProgressBar } from '@/components'

function MyComponent() {
  return (
    <ProgressBar 
      value={75} 
      color="blue" 
      showLabel 
    />
  )
}`
      case 'dropdownmenu':
        return `import { DropdownMenu, DropdownMenuItem, Button } from '@/components'

function MyComponent() {
  return (
    <DropdownMenu trigger={<Button>Abrir Menu</Button>}>
      <DropdownMenuItem>Item 1</DropdownMenuItem>
      <DropdownMenuItem>Item 2</DropdownMenuItem>
      <DropdownMenuItem>Item 3</DropdownMenuItem>
    </DropdownMenu>
  )
}`
      case 'command':
        return `import { Command } from '@/components'
import type { CommandItem } from '@/components'

function MyComponent() {
  const items: CommandItem[] = [
    { id: '1', title: 'Item 1', description: 'Descrição' },
    { id: '2', title: 'Item 2', description: 'Descrição' },
  ]
  
  return (
    <Command
      placeholder="Buscar..."
      items={items}
      onSelect={(item) => console.log(item)}
    />
  )
}`
      case 'themetoggle':
        return `import { ThemeToggle } from '@/components'
import { useState } from 'react'

function MyComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  return (
    <ThemeToggle 
      theme={theme} 
      onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
    />
  )
}`
      case 'avatar':
        return `import { Avatar } from '@/components'

function MyComponent() {
  return (
    <div className="flex gap-4">
      <Avatar fallback="JS" size="md" />
      <Avatar fallback="MS" size="md" src="/avatar.jpg" />
    </div>
  )
}`
      case 'metriccard':
        return `import { MetricCard } from '@/components'

function MyComponent() {
  return (
    <div className="grid grid-cols-3 gap-4">
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
    </div>
  )
}`
      case 'paginatedtable':
        return `import { PaginatedTable } from '@/components'

function MyComponent() {
  const columns = [
    { key: 'name', title: 'Nome' },
    { key: 'email', title: 'Email' },
  ]
  
  const data = [
    { name: 'João', email: 'joao@example.com' },
    { name: 'Maria', email: 'maria@example.com' },
  ]
  
  return (
    <PaginatedTable
      columns={columns}
      data={data}
      itemsPerPage={10}
    />
  )
}`
      case 'accordion':
        return `import { Accordion } from '@/components'

function MyComponent() {
  return (
    <Accordion
      items={[
        { 
          value: 'item1', 
          trigger: 'Item 1', 
          content: <p>Conteúdo do item 1</p> 
        },
        { 
          value: 'item2', 
          trigger: 'Item 2', 
          content: <p>Conteúdo do item 2</p> 
        },
      ]}
    />
  )
}`
      case 'card':
        return `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@/components'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}`
      case 'separator':
        return `import { Separator } from '@/components'

function MyComponent() {
  return (
    <div>
      <p>Texto acima</p>
      <Separator />
      <p>Texto abaixo</p>
    </div>
  )
}`
      case 'sheet':
        return `import { Sheet, Button } from '@/components'
import { useState } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Sheet</Button>
      <Sheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        side="right"
      >
        <div className="p-6">
          <h2>Sheet Content</h2>
          <p>Conteúdo do sheet aqui</p>
        </div>
      </Sheet>
    </>
  )
}`
      case 'navigation':
        return `import { Navigation } from '@/components'

function MyComponent() {
  return (
    <Navigation
      items={[
        { name: 'Home', href: '/' },
        { name: 'Docs', href: '/docs' },
        { name: 'Components', href: '/components' },
      ]}
      currentPath="/components"
    />
  )
}`
      case 'tabs':
        return `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components'
import { useState } from 'react'

function MyComponent() {
  const [activeTab, setActiveTab] = useState('tab1')
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p>Conteúdo da Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Conteúdo da Tab 2</p>
      </TabsContent>
    </Tabs>
  )
}`
      case 'barchart':
        return `import { BarChart } from '@/components'

function MyComponent() {
  const data = {
    label: 'Vendas',
    previousPeriod: 50000,
    selectedPeriod: 75000,
  }
  
  return (
    <BarChart 
      title="Vendas Mensais" 
      data={data} 
      isCurrency 
    />
  )
}`
      case 'donutchart':
        return `import { DonutChart } from '@/components'

function MyComponent() {
  const data = [
    {
      label: 'Concluído',
      value: 75,
      percentage: 75,
      color: '#10b981',
    },
  ] as const
  
  return (
    <DonutChart 
      title="Progresso" 
      data={data} 
    />
  )
}`
      case 'linechart':
        return `import { LineChart } from '@/components'

function MyComponent() {
  const data = [10, 20, 15, 30, 25, 40, 35]
  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']
  
  return (
    <LineChart 
      title="Evolução" 
      data={data} 
      labels={labels} 
    />
  )
}`
      default:
        return `import { ${componentNameFormatted} } from '@/components'

function MyComponent() {
  return (
    <${componentNameFormatted} />
  )
}`
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Visualização do componente</CardDescription>
        </CardHeader>
        <CardContent>
          {renderComponent()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instalação</CardTitle>
          <CardDescription>Como instalar este componente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono">
              <code>npx valk-ui</code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Selecione o componente {componentName?.charAt(0).toUpperCase() + componentName?.slice(1)} durante a instalação.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uso</CardTitle>
          <CardDescription>Exemplo de código completo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre">
              <code>{getCodeExample()}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


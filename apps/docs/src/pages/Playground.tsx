import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, useToast, Select, Dialog } from '@/components'
import { useTranslation } from 'react-i18next'
import {
  CodeBracketIcon,
  ClipboardIcon,
  ArrowPathIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import {
  Button,
  Input,
  Select as PlaygroundSelect,
  Checkbox,
  Toggle,
  Card as PlaygroundCard,
  CardHeader as PlaygroundCardHeader,
  CardTitle as PlaygroundCardTitle,
  CardDescription as PlaygroundCardDescription,
  CardContent as PlaygroundCardContent,
  CardFooter as PlaygroundCardFooter,
  StatusBadge,
  Badge,
  ProgressBar,
  Avatar,
  MetricCard,
  Separator,
  Accordion,
} from '@/components'
import { themes } from '../components/ThemeSelector'

const defaultCode = `function Example() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao Playground</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Edite o código ao lado para ver as mudanças em tempo real!
          </p>
          <Button variant="primary">Clique aqui</Button>
        </CardContent>
      </Card>
    </div>
  )
}`

const examples = [
  {
    name: 'Método de Pagamento',
    code: `function Example() {
  return (
    <div className="p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Método de Pagamento</CardTitle>
          <CardDescription>Todas as transações são seguras e criptografadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Nome no Cartão" placeholder="John Doe" />
          <div className="flex gap-2">
            <Button variant="primary" size="sm">Salvar</Button>
            <Button variant="outline" size="sm">Cancelar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Membros da Equipe',
    code: `function Example() {
  return (
    <div className="p-4 max-w-md">
      <Card>
        <CardHeader>
          <div className="flex -space-x-2 mb-4">
            <Avatar fallback="JD" size="md" className="border-2 border-background bg-primary/20 text-primary" />
            <Avatar fallback="MS" size="md" className="border-2 border-background bg-primary/20 text-primary" />
            <Avatar fallback="PC" size="md" className="border-2 border-background bg-primary/20 text-primary" />
          </div>
          <CardTitle>Sem Membros da Equipe</CardTitle>
          <CardDescription>Convide sua equipe para</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="primary" size="sm" className="w-full">Convidar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Autenticação de Dois Fatores',
    code: `function Example() {
  return (
    <div className="p-4 max-w-md">
      <Card>
        <CardHeader>
          <div className="mb-4">
            <Input placeholder="https://" />
          </div>
          <CardTitle>Autenticação de dois fatores</CardTitle>
          <CardDescription>Verifique via email ou número de telefone.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="primary" size="sm">Habilitar</Button>
        </CardContent>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Formulário',
    code: `function Example() {
  const [checked, setChecked] = React.useState(false)
  const [toggled, setToggled] = React.useState(false)
  const [selectValue, setSelectValue] = React.useState([])
  
  const options = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' },
  ]

  return (
    <div className="p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
          <CardDescription>Exemplo de formulário completo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Email" placeholder="email@example.com" />
          <Select label="País" options={options} value={selectValue} onChange={(values) => setSelectValue(values || [])} />
          <div className="space-y-3">
            <Checkbox label="Aceito os termos" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <Toggle label="Receber notificações" checked={toggled} onChange={(e) => setToggled(e.target.checked)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full">Enviar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Status',
    code: `function Example() {
  return (
    <div className="p-4 max-w-md">
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
            <Badge variant="default" className="bg-primary text-primary-foreground border-primary">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline" className="border-primary text-primary">Outline</Badge>
          </div>
          <ProgressBar value={65} color="blue" showLabel />
        </CardContent>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Botões',
    code: `function Example() {
  return (
    <div className="p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Botões</CardTitle>
          <CardDescription>Diferentes variantes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Métricas',
    code: `function Example() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total de Vendas" value="R$ 125.430" subtitle="+12.5% vs mês anterior" variant="blue" className="border-primary bg-gradient-to-br from-primary to-primary/90 text-primary-foreground" />
        <MetricCard title="Novos Usuários" value="1.234" subtitle="+8.2% vs mês anterior" variant="success" />
        <MetricCard title="Taxa de Conversão" value="3.24%" subtitle="+0.5% vs mês anterior" variant="warning" />
        <MetricCard title="Taxa de Rejeição" value="2.1%" subtitle="-1.2% vs mês anterior" variant="default" />
      </div>
    </div>
  )
}`,
  },
  {
    name: 'Atividades Recentes',
    code: `function Example() {
  return (
    <div className="p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar fallback="JD" size="sm" className="bg-primary/20 text-primary" />
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
              <Avatar fallback="MS" size="sm" className="bg-primary/20 text-primary" />
              <div>
                <p className="text-sm font-medium">Maria atualizou perfil</p>
                <p className="text-xs text-muted-foreground">Há 15 minutos</p>
              </div>
            </div>
            <StatusBadge status="completed">Concluído</StatusBadge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Progresso do Projeto',
    code: `function Example() {
  return (
    <div className="p-4 max-w-md">
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
            <ProgressBar value={75} color="blue" showLabel />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Desenvolvimento</span>
              <span>45%</span>
            </div>
            <ProgressBar value={45} color="green" showLabel />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Testes</span>
              <span>20%</span>
            </div>
            <ProgressBar value={20} color="yellow" showLabel />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Tarefas',
    code: `function Example() {
  const [todo1, setTodo1] = React.useState(false)
  const [progress1, setProgress1] = React.useState(true)
  const [done1, setDone1] = React.useState(true)

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Para Fazer</CardTitle>
            <CardDescription>3 tarefas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-start gap-3">
                <Checkbox checked={todo1} onChange={(e) => setTodo1(e.target.checked)} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Revisar design</p>
                  <p className="text-xs text-muted-foreground">Prioridade alta</p>
                </div>
                <Badge variant="high">Alta</Badge>
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
                <Checkbox checked={progress1} onChange={(e) => setProgress1(e.target.checked)} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Implementar feature</p>
                  <p className="text-xs text-muted-foreground">60% completo</p>
                  <ProgressBar value={60} color="blue" className="mt-2" />
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
                <Checkbox checked={done1} onChange={(e) => setDone1(e.target.checked)} />
                <div className="flex-1">
                  <p className="text-sm font-medium line-through">Setup do projeto</p>
                  <p className="text-xs text-muted-foreground">Concluído há 2 dias</p>
                </div>
                <StatusBadge status="completed">✓</StatusBadge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}`,
  },
  {
    name: 'Nova Tarefa',
    code: `function Example() {
  const [selectValue, setSelectValue] = React.useState([])
  
  const options = [
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Média' },
    { value: 'low', label: 'Baixa' },
  ]

  return (
    <div className="p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Nova Tarefa</CardTitle>
          <CardDescription>Adicione uma nova tarefa à lista</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Título" placeholder="Digite o título da tarefa" />
          <Input label="Descrição" placeholder="Digite a descrição" />
          <Select label="Prioridade" options={options} value={selectValue} onChange={(values) => setSelectValue(values || [])} />
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full">Adicionar Tarefa</Button>
        </CardFooter>
      </Card>
    </div>
  )
}`,
  },
  {
    name: 'Produto',
    code: `function Example() {
  return (
    <div className="p-4 max-w-sm">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <div className="text-6xl">📱</div>
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle>Smartphone Pro Max</CardTitle>
              <CardDescription>128GB, Tela 6.7", 5G</CardDescription>
            </div>
            <StatusBadge status="active">Em Estoque</StatusBadge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
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
              <p className="text-2xl font-bold">R$ 2.499</p>
              <p className="text-sm text-muted-foreground line-through">R$ 2.999</p>
            </div>
            <Badge variant="high">-17%</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="primary" className="flex-1">Adicionar ao Carrinho</Button>
          <Button variant="outline">♡</Button>
        </CardFooter>
      </Card>
    </div>
  )
}`,
  },
]

const createScope = (_theme: typeof themes[0]) => ({
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  Button,
  Input,
  Select: PlaygroundSelect,
  Checkbox,
  Toggle,
  Card: PlaygroundCard,
  CardHeader: PlaygroundCardHeader,
  CardTitle: PlaygroundCardTitle,
  CardDescription: PlaygroundCardDescription,
  CardContent: PlaygroundCardContent,
  CardFooter: PlaygroundCardFooter,
  StatusBadge,
  Badge,
  ProgressBar,
  Avatar,
  MetricCard,
  Separator,
})

const tailwindColors = {
  slate: {
    50: { hsl: '210 40% 98%', hex: '#f8fafc', rgb: '248 250 252' },
    100: { hsl: '210 40% 96.1%', hex: '#f1f5f9', rgb: '241 245 249' },
    200: { hsl: '214.3 31.8% 91.4%', hex: '#e2e8f0', rgb: '226 232 240' },
    300: { hsl: '217.2 32.6% 17.5%', hex: '#cbd5e1', rgb: '203 213 225' },
    400: { hsl: '215 20.2% 65.1%', hex: '#94a3b8', rgb: '148 163 184' },
    500: { hsl: '215.4 16.3% 46.9%', hex: '#64748b', rgb: '100 116 139' },
    600: { hsl: '215.3 19.3% 34.5%', hex: '#475569', rgb: '71 85 105' },
    700: { hsl: '215.3 25% 27.1%', hex: '#334155', rgb: '51 65 85' },
    800: { hsl: '217.2 32.6% 17.5%', hex: '#1e293b', rgb: '30 41 59' },
    900: { hsl: '222.2 47.4% 11.2%', hex: '#0f172a', rgb: '15 23 42' },
    950: { hsl: '222.2 84% 4.9%', hex: '#020617', rgb: '2 6 23' },
  },
  gray: {
    50: { hsl: '0 0% 98%', hex: '#f9fafb', rgb: '249 250 251' },
    100: { hsl: '220 13% 18%', hex: '#f3f4f6', rgb: '243 244 246' },
    200: { hsl: '220 13% 18%', hex: '#e5e7eb', rgb: '229 231 235' },
    300: { hsl: '220 13% 18%', hex: '#d1d5db', rgb: '209 213 219' },
    400: { hsl: '220 13% 18%', hex: '#9ca3af', rgb: '156 163 175' },
    500: { hsl: '220 13% 18%', hex: '#6b7280', rgb: '107 114 128' },
    600: { hsl: '220 13% 18%', hex: '#4b5563', rgb: '75 85 99' },
    700: { hsl: '220 13% 18%', hex: '#374151', rgb: '55 65 81' },
    800: { hsl: '220 13% 18%', hex: '#1f2937', rgb: '31 41 55' },
    900: { hsl: '220 13% 18%', hex: '#111827', rgb: '17 24 39' },
    950: { hsl: '220 13% 18%', hex: '#030712', rgb: '3 7 18' },
  },
  zinc: {
    50: { hsl: '0 0% 98%', hex: '#fafafa', rgb: '250 250 250' },
    100: { hsl: '0 0% 96.1%', hex: '#f4f4f5', rgb: '244 244 245' },
    200: { hsl: '240 4.8% 95.9%', hex: '#e4e4e7', rgb: '228 228 231' },
    300: { hsl: '240 5.9% 90%', hex: '#d4d4d8', rgb: '212 212 216' },
    400: { hsl: '240 5.2% 33.9%', hex: '#a1a1aa', rgb: '161 161 170' },
    500: { hsl: '240 3.8% 46.1%', hex: '#71717a', rgb: '113 113 122' },
    600: { hsl: '240 5.4% 26.1%', hex: '#52525b', rgb: '82 82 91' },
    700: { hsl: '240 5.9% 10%', hex: '#3f3f46', rgb: '63 63 70' },
    800: { hsl: '240 5.9% 10%', hex: '#27272a', rgb: '39 39 42' },
    900: { hsl: '240 5.9% 10%', hex: '#18181b', rgb: '24 24 27' },
    950: { hsl: '240 5.9% 10%', hex: '#09090b', rgb: '9 9 11' },
  },
  neutral: {
    50: { hsl: '0 0% 98%', hex: '#fafafa', rgb: '250 250 250' },
    100: { hsl: '0 0% 96.1%', hex: '#f5f5f5', rgb: '245 245 245' },
    200: { hsl: '0 0% 89.8%', hex: '#e5e5e5', rgb: '229 229 229' },
    300: { hsl: '0 0% 82.9%', hex: '#d4d4d4', rgb: '212 212 212' },
    400: { hsl: '0 0% 64.9%', hex: '#a3a3a3', rgb: '163 163 163' },
    500: { hsl: '0 0% 45.1%', hex: '#737373', rgb: '115 115 115' },
    600: { hsl: '0 0% 32.2%', hex: '#525252', rgb: '82 82 82' },
    700: { hsl: '0 0% 23.1%', hex: '#404040', rgb: '64 64 64' },
    800: { hsl: '0 0% 14.9%', hex: '#262626', rgb: '38 38 38' },
    900: { hsl: '0 0% 9%', hex: '#171717', rgb: '23 23 23' },
    950: { hsl: '0 0% 3.9%', hex: '#0a0a0a', rgb: '10 10 10' },
  },
  stone: {
    50: { hsl: '0 0% 98%', hex: '#fafaf9', rgb: '250 250 249' },
    100: { hsl: '24 9.8% 10%', hex: '#f5f5f4', rgb: '245 245 244' },
    200: { hsl: '24 9.8% 10%', hex: '#e7e5e4', rgb: '231 229 228' },
    300: { hsl: '24 9.8% 10%', hex: '#d6d3d1', rgb: '214 211 209' },
    400: { hsl: '24 9.8% 10%', hex: '#a8a29e', rgb: '168 162 158' },
    500: { hsl: '24 9.8% 10%', hex: '#78716c', rgb: '120 113 108' },
    600: { hsl: '24 9.8% 10%', hex: '#57534e', rgb: '87 83 78' },
    700: { hsl: '24 9.8% 10%', hex: '#44403c', rgb: '68 64 60' },
    800: { hsl: '24 9.8% 10%', hex: '#292524', rgb: '41 37 36' },
    900: { hsl: '24 9.8% 10%', hex: '#1c1917', rgb: '28 25 23' },
    950: { hsl: '24 9.8% 10%', hex: '#0c0a09', rgb: '12 10 9' },
  },
  red: {
    50: { hsl: '0 86.7% 97.1%', hex: '#fef2f2', rgb: '254 242 242' },
    100: { hsl: '0 93.2% 94%', hex: '#fee2e2', rgb: '254 226 226' },
    200: { hsl: '0 96.3% 89.4%', hex: '#fecaca', rgb: '254 202 202' },
    300: { hsl: '0 93.5% 81.8%', hex: '#fca5a5', rgb: '252 165 165' },
    400: { hsl: '0 90.6% 70.8%', hex: '#f87171', rgb: '248 113 113' },
    500: { hsl: '0 84.2% 60.2%', hex: '#ef4444', rgb: '239 68 68' },
    600: { hsl: '0 72.2% 50.6%', hex: '#dc2626', rgb: '220 38 38' },
    700: { hsl: '0 73.7% 41.8%', hex: '#b91c1c', rgb: '185 28 28' },
    800: { hsl: '0 70% 35.3%', hex: '#991b1b', rgb: '153 27 27' },
    900: { hsl: '0 63% 31%', hex: '#7f1d1d', rgb: '127 29 29' },
    950: { hsl: '0 75% 15.1%', hex: '#450a0a', rgb: '69 10 10' },
  },
  orange: {
    50: { hsl: '33.3 100% 96.5%', hex: '#fff7ed', rgb: '255 247 237' },
    100: { hsl: '34.3 100% 91.8%', hex: '#ffedd5', rgb: '255 237 213' },
    200: { hsl: '32.1 94.6% 83.7%', hex: '#fed7aa', rgb: '254 215 170' },
    300: { hsl: '30.7 97.2% 72.4%', hex: '#fdba74', rgb: '253 186 116' },
    400: { hsl: '27.3 96% 61%', hex: '#fb923c', rgb: '251 146 60' },
    500: { hsl: '24.6 95% 53.1%', hex: '#f97316', rgb: '249 115 22' },
    600: { hsl: '20.5 90.2% 48.2%', hex: '#ea580c', rgb: '234 88 12' },
    700: { hsl: '17.5 88.5% 40%', hex: '#c2410c', rgb: '194 65 12' },
    800: { hsl: '15 79.1% 33.7%', hex: '#9a3412', rgb: '154 52 18' },
    900: { hsl: '15.3 74.6% 27.8%', hex: '#7c2d12', rgb: '124 45 18' },
    950: { hsl: '12.2 81.7% 14.9%', hex: '#431407', rgb: '67 20 7' },
  },
  amber: {
    50: { hsl: '48 100% 96.1%', hex: '#fffbeb', rgb: '255 251 235' },
    100: { hsl: '48 96.5% 88.8%', hex: '#fef3c7', rgb: '254 243 199' },
    200: { hsl: '48 96.6% 76.7%', hex: '#fde68a', rgb: '253 230 138' },
    300: { hsl: '43.3 96.4% 56.3%', hex: '#fcd34d', rgb: '252 211 77' },
    400: { hsl: '38.7 92.1% 50%', hex: '#fbbf24', rgb: '251 191 36' },
    500: { hsl: '43.3 96.4% 56.3%', hex: '#f59e0b', rgb: '245 158 11' },
    600: { hsl: '38.7 92.1% 50%', hex: '#d97706', rgb: '217 119 6' },
    700: { hsl: '32.1 94.6% 43.7%', hex: '#b45309', rgb: '180 83 9' },
    800: { hsl: '26 90.5% 36.9%', hex: '#92400e', rgb: '146 64 14' },
    900: { hsl: '23.4 83.1% 31.4%', hex: '#78350f', rgb: '120 53 15' },
    950: { hsl: '23.2 87.4% 16.5%', hex: '#451a03', rgb: '69 26 3' },
  },
  yellow: {
    50: { hsl: '54.5 91.7% 95.3%', hex: '#fefce8', rgb: '254 252 232' },
    100: { hsl: '54.9 96.7% 88%', hex: '#fef9c3', rgb: '254 249 195' },
    200: { hsl: '52.8 98.3% 76.9%', hex: '#fef08a', rgb: '254 240 138' },
    300: { hsl: '50.4 97.8% 63.5%', hex: '#fde047', rgb: '253 224 71' },
    400: { hsl: '47.9 95.8% 53.1%', hex: '#facc15', rgb: '250 204 21' },
    500: { hsl: '47.9 95.8% 53.1%', hex: '#eab308', rgb: '234 179 8' },
    600: { hsl: '45.4 93.4% 47.5%', hex: '#ca8a04', rgb: '202 138 4' },
    700: { hsl: '40.6 96.1% 40.4%', hex: '#a16207', rgb: '161 98 7' },
    800: { hsl: '35.5 91.7% 32.9%', hex: '#854d0e', rgb: '133 77 14' },
    900: { hsl: '31.8 81.2% 28.8%', hex: '#713f12', rgb: '113 63 18' },
    950: { hsl: '26 83.3% 14.1%', hex: '#422006', rgb: '66 32 6' },
  },
  lime: {
    50: { hsl: '78.3 92% 95.1%', hex: '#f7fee7', rgb: '247 254 231' },
    100: { hsl: '79.7 89.1% 89.2%', hex: '#ecfccb', rgb: '236 252 203' },
    200: { hsl: '80.9 88.5% 79.4%', hex: '#d9f99d', rgb: '217 249 157' },
    300: { hsl: '82 85.2% 67.1%', hex: '#bef264', rgb: '190 242 100' },
    400: { hsl: '82.7 78% 55.5%', hex: '#a3e635', rgb: '163 230 53' },
    500: { hsl: '84.4 78.7% 41.8%', hex: '#84cc16', rgb: '132 204 22' },
    600: { hsl: '81.7 67.4% 33.9%', hex: '#65a30d', rgb: '101 163 13' },
    700: { hsl: '78.2 61.7% 27.1%', hex: '#4d7c0f', rgb: '77 124 15' },
    800: { hsl: '75.7 58.6% 22.4%', hex: '#365314', rgb: '54 83 20' },
    900: { hsl: '72.7 54.5% 19.4%', hex: '#1a2e05', rgb: '26 46 5' },
    950: { hsl: '78.4 61% 10%', hex: '#1a2e05', rgb: '26 46 5' },
  },
  green: {
    50: { hsl: '138.5 76.5% 96.7%', hex: '#f0fdf4', rgb: '240 253 244' },
    100: { hsl: '141 84.2% 93%', hex: '#dcfce7', rgb: '220 252 231' },
    200: { hsl: '141.7 78.9% 85.1%', hex: '#bbf7d0', rgb: '187 247 208' },
    300: { hsl: '141.9 76.6% 73.1%', hex: '#86efac', rgb: '134 239 172' },
    400: { hsl: '142.1 70.6% 58.2%', hex: '#4ade80', rgb: '74 222 128' },
    500: { hsl: '142.1 76.2% 36.3%', hex: '#22c55e', rgb: '34 197 94' },
    600: { hsl: '142.4 71.8% 29.2%', hex: '#16a34a', rgb: '22 163 74' },
    700: { hsl: '142.7 70.7% 23.3%', hex: '#15803d', rgb: '21 128 61' },
    800: { hsl: '143.8 61.2% 20%', hex: '#166534', rgb: '22 101 52' },
    900: { hsl: '144.9 60.7% 15%', hex: '#14532d', rgb: '20 83 45' },
    950: { hsl: '145.3 80.4% 10%', hex: '#052e16', rgb: '5 46 22' },
  },
  emerald: {
    50: { hsl: '151.8 81% 96%', hex: '#ecfdf5', rgb: '236 253 245' },
    100: { hsl: '149.3 80.4% 90%', hex: '#d1fae5', rgb: '209 250 229' },
    200: { hsl: '152.4 76% 80.4%', hex: '#a7f3d0', rgb: '167 243 208' },
    300: { hsl: '156.2 71.6% 66.9%', hex: '#6ee7b7', rgb: '110 231 183' },
    400: { hsl: '158.1 64.4% 51.6%', hex: '#34d399', rgb: '52 211 153' },
    500: { hsl: '158.1 64.4% 51.6%', hex: '#10b981', rgb: '16 185 129' },
    600: { hsl: '159.6 64.1% 41.8%', hex: '#059669', rgb: '5 150 105' },
    700: { hsl: '161.2 63.6% 34.1%', hex: '#047857', rgb: '4 120 87' },
    800: { hsl: '163.1 61.2% 28%', hex: '#065f46', rgb: '6 95 70' },
    900: { hsl: '164.2 70.6% 20.6%', hex: '#064e3b', rgb: '6 78 59' },
    950: { hsl: '166.2 76% 12.5%', hex: '#022c22', rgb: '2 44 34' },
  },
  teal: {
    50: { hsl: '166.2 76.1% 96.7%', hex: '#f0fdfa', rgb: '240 253 250' },
    100: { hsl: '167.2 85.2% 89.2%', hex: '#ccfbf1', rgb: '204 251 241' },
    200: { hsl: '168.4 83.8% 78.2%', hex: '#99f6e4', rgb: '153 246 228' },
    300: { hsl: '170.6 76.9% 64.3%', hex: '#5eead4', rgb: '94 234 212' },
    400: { hsl: '172.5 66% 50.4%', hex: '#2dd4bf', rgb: '45 212 191' },
    500: { hsl: '173.4 80.4% 40%', hex: '#14b8a6', rgb: '20 184 166' },
    600: { hsl: '174.7 83.9% 32.5%', hex: '#0d9488', rgb: '13 148 136' },
    700: { hsl: '175.3 77.8% 26.5%', hex: '#0f766e', rgb: '15 118 110' },
    800: { hsl: '175.9 69.2% 22.2%', hex: '#115e59', rgb: '17 94 89' },
    900: { hsl: '176.1 61.5% 19.2%', hex: '#134e4a', rgb: '19 78 74' },
    950: { hsl: '176.3 84.1% 12.2%', hex: '#042f2e', rgb: '4 47 46' },
  },
  cyan: {
    50: { hsl: '183.2 100% 96.3%', hex: '#ecfeff', rgb: '236 254 255' },
    100: { hsl: '185.1 95.9% 90.4%', hex: '#cffafe', rgb: '207 250 254' },
    200: { hsl: '186.2 93.5% 81.8%', hex: '#a5f3fc', rgb: '165 243 252' },
    300: { hsl: '187 92.4% 69%', hex: '#67e8f9', rgb: '103 232 249' },
    400: { hsl: '187.9 85.7% 53.3%', hex: '#22d3ee', rgb: '34 211 238' },
    500: { hsl: '188.7 94.5% 42.7%', hex: '#06b6d4', rgb: '6 182 212' },
    600: { hsl: '191.6 91.4% 36.5%', hex: '#0891b2', rgb: '8 145 178' },
    700: { hsl: '192.9 82.3% 31.4%', hex: '#0e7490', rgb: '14 116 144' },
    800: { hsl: '194.4 69.6% 27.1%', hex: '#155e75', rgb: '21 94 117' },
    900: { hsl: '196.4 63.6% 23.7%', hex: '#164e63', rgb: '22 78 99' },
    950: { hsl: '197 78.9% 14.1%', hex: '#083344', rgb: '8 51 68' },
  },
  sky: {
    50: { hsl: '204 100% 97.1%', hex: '#f0f9ff', rgb: '240 249 255' },
    100: { hsl: '204 96.3% 93.7%', hex: '#e0f2fe', rgb: '224 242 254' },
    200: { hsl: '200.6 94.4% 86.1%', hex: '#bae6fd', rgb: '186 230 253' },
    300: { hsl: '199.4 95.5% 73.9%', hex: '#7dd3fc', rgb: '125 211 252' },
    400: { hsl: '198 93.2% 59.6%', hex: '#38bdf8', rgb: '56 189 248' },
    500: { hsl: '199 89.1% 48.2%', hex: '#0ea5e9', rgb: '14 165 233' },
    600: { hsl: '200.4 98% 39.4%', hex: '#0284c7', rgb: '2 132 199' },
    700: { hsl: '201.3 96.3% 32.2%', hex: '#0369a1', rgb: '3 105 161' },
    800: { hsl: '201.3 90.3% 27.5%', hex: '#075985', rgb: '7 89 133' },
    900: { hsl: '202 80.3% 23.9%', hex: '#0c4a6e', rgb: '12 74 110' },
    950: { hsl: '204 80.2% 16.1%', hex: '#082f49', rgb: '8 47 73' },
  },
  blue: {
    50: { hsl: '214.3 100% 96.9%', hex: '#eff6ff', rgb: '239 246 255' },
    100: { hsl: '213.1 96.9% 92.7%', hex: '#dbeafe', rgb: '219 234 254' },
    200: { hsl: '212.7 96.4% 85.9%', hex: '#bfdbfe', rgb: '191 219 254' },
    300: { hsl: '213.1 93.9% 75.3%', hex: '#93c5fd', rgb: '147 197 253' },
    400: { hsl: '213.3 96.9% 62.7%', hex: '#60a5fa', rgb: '96 165 250' },
    500: { hsl: '217.2 91.2% 59.8%', hex: '#3b82f6', rgb: '59 130 246' },
    600: { hsl: '221.2 83.2% 53.3%', hex: '#2563eb', rgb: '37 99 235' },
    700: { hsl: '224.3 76.3% 48%', hex: '#1d4ed8', rgb: '29 78 216' },
    800: { hsl: '225.9 70.7% 40.2%', hex: '#1e40af', rgb: '30 64 175' },
    900: { hsl: '224.4 64.3% 32.9%', hex: '#1e3a8a', rgb: '30 58 138' },
    950: { hsl: '226.2 57% 21%', hex: '#172554', rgb: '23 37 84' },
  },
  indigo: {
    50: { hsl: '225.9 100% 96.7%', hex: '#eef2ff', rgb: '238 242 255' },
    100: { hsl: '226.5 100% 93.9%', hex: '#e0e7ff', rgb: '224 231 255' },
    200: { hsl: '228.7 100% 87.1%', hex: '#c7d2fe', rgb: '199 210 254' },
    300: { hsl: '229.7 93.5% 77.1%', hex: '#a5b4fc', rgb: '165 180 252' },
    400: { hsl: '234.5 89.5% 66.7%', hex: '#818cf8', rgb: '129 140 248' },
    500: { hsl: '238.7 83.5% 66.7%', hex: '#6366f1', rgb: '99 102 241' },
    600: { hsl: '243.4 75.4% 58.6%', hex: '#4f46e5', rgb: '79 70 229' },
    700: { hsl: '244.5 57.9% 50.6%', hex: '#4338ca', rgb: '67 56 202' },
    800: { hsl: '243.7 54.5% 41.4%', hex: '#3730a3', rgb: '55 48 163' },
    900: { hsl: '242.2 47.4% 34.3%', hex: '#312e81', rgb: '49 46 129' },
    950: { hsl: '243.6 75.4% 18.8%', hex: '#1e1b4b', rgb: '30 27 75' },
  },
  violet: {
    50: { hsl: '250 100% 97.6%', hex: '#f5f3ff', rgb: '245 243 255' },
    100: { hsl: '251.4 95.8% 93.7%', hex: '#ede9fe', rgb: '237 233 254' },
    200: { hsl: '251.3 91.3% 87.1%', hex: '#ddd6fe', rgb: '221 214 254' },
    300: { hsl: '252.5 94.7% 78.4%', hex: '#c4b5fd', rgb: '196 181 253' },
    400: { hsl: '255.1 91.7% 66.5%', hex: '#a78bfa', rgb: '167 139 250' },
    500: { hsl: '258.3 89.5% 66.3%', hex: '#8b5cf6', rgb: '139 92 246' },
    600: { hsl: '262.1 83.3% 57.8%', hex: '#7c3aed', rgb: '124 58 237' },
    700: { hsl: '263.4 70% 50.4%', hex: '#6d28d9', rgb: '109 40 217' },
    800: { hsl: '263.5 69.3% 42.2%', hex: '#5b21b6', rgb: '91 33 182' },
    900: { hsl: '264.4 67.3% 35.3%', hex: '#4c1d95', rgb: '76 29 149' },
    950: { hsl: '258.8 89.1% 21.4%', hex: '#2e1065', rgb: '46 16 101' },
  },
  purple: {
    50: { hsl: '270 100% 98%', hex: '#faf5ff', rgb: '250 245 255' },
    100: { hsl: '268.1 100% 95.1%', hex: '#f3e8ff', rgb: '243 232 255' },
    200: { hsl: '268.6 100% 88.8%', hex: '#e9d5ff', rgb: '233 213 255' },
    300: { hsl: '269.2 97.4% 79.2%', hex: '#d8b4fe', rgb: '216 180 254' },
    400: { hsl: '270.7 91% 65.1%', hex: '#c084fc', rgb: '192 132 252' },
    500: { hsl: '270.7 91% 65.1%', hex: '#a855f7', rgb: '168 85 247' },
    600: { hsl: '271.5 81.3% 55.9%', hex: '#9333ea', rgb: '147 51 234' },
    700: { hsl: '272.1 71.7% 47.1%', hex: '#7e22ce', rgb: '126 34 206' },
    800: { hsl: '272.9 67.2% 39.1%', hex: '#6b21a8', rgb: '107 33 168' },
    900: { hsl: '273.6 65.6% 32.5%', hex: '#581c87', rgb: '88 28 135' },
    950: { hsl: '277.4 91.5% 18.4%', hex: '#3b0764', rgb: '59 7 100' },
  },
  fuchsia: {
    50: { hsl: '292.2 100% 97.5%', hex: '#fdf4ff', rgb: '253 244 255' },
    100: { hsl: '292.4 100% 94.5%', hex: '#fae8ff', rgb: '250 232 255' },
    200: { hsl: '292.5 100% 88.4%', hex: '#f5d0fe', rgb: '245 208 254' },
    300: { hsl: '292.4 97.3% 78.8%', hex: '#f0abfc', rgb: '240 171 252' },
    400: { hsl: '292 95.1% 66.3%', hex: '#e879f9', rgb: '232 121 249' },
    500: { hsl: '292 84.1% 60.6%', hex: '#d946ef', rgb: '217 70 239' },
    600: { hsl: '291.1 72.8% 52.9%', hex: '#c026d3', rgb: '192 38 211' },
    700: { hsl: '289.1 70.4% 45.1%', hex: '#a21caf', rgb: '162 28 175' },
    800: { hsl: '287.8 66% 38.4%', hex: '#86198f', rgb: '134 25 143' },
    900: { hsl: '286.2 60.6% 32.5%', hex: '#701a75', rgb: '112 26 117' },
    950: { hsl: '287.4 87.9% 17.1%', hex: '#4a044e', rgb: '74 4 78' },
  },
  pink: {
    50: { hsl: '327.2 73.2% 97.1%', hex: '#fdf2f8', rgb: '253 242 248' },
    100: { hsl: '325.7 77.8% 94.7%', hex: '#fce7f3', rgb: '252 231 243' },
    200: { hsl: '327.4 87.1% 88.8%', hex: '#fbcfe8', rgb: '251 207 232' },
    300: { hsl: '329.3 86.1% 79.4%', hex: '#f9a8d4', rgb: '249 168 212' },
    400: { hsl: '330.7 81% 60.4%', hex: '#f472b6', rgb: '244 114 182' },
    500: { hsl: '330.7 81% 60.4%', hex: '#ec4899', rgb: '236 72 153' },
    600: { hsl: '330.4 78.1% 52.4%', hex: '#db2777', rgb: '219 39 119' },
    700: { hsl: '331.4 74.4% 45.3%', hex: '#be185d', rgb: '190 24 93' },
    800: { hsl: '332.1 69.1% 38.5%', hex: '#9f1239', rgb: '159 18 57' },
    900: { hsl: '333.3 64.6% 32.5%', hex: '#831843', rgb: '131 24 67' },
    950: { hsl: '335.1 77.6% 18%', hex: '#500724', rgb: '80 7 36' },
  },
  rose: {
    50: { hsl: '355.7 100% 97.3%', hex: '#fff1f2', rgb: '255 241 242' },
    100: { hsl: '355.6 100% 94.7%', hex: '#ffe4e6', rgb: '255 228 230' },
    200: { hsl: '352.7 96.1% 90%', hex: '#fecdd3', rgb: '254 205 211' },
    300: { hsl: '351.3 95.5% 82.9%', hex: '#fda4af', rgb: '253 164 175' },
    400: { hsl: '349.7 89.2% 70.2%', hex: '#fb7185', rgb: '251 113 133' },
    500: { hsl: '346.8 77.2% 49.8%', hex: '#f43f5e', rgb: '244 63 94' },
    600: { hsl: '346.8 77.2% 49.8%', hex: '#e11d48', rgb: '225 29 72' },
    700: { hsl: '347.9 75.8% 40.6%', hex: '#be123c', rgb: '190 18 60' },
    800: { hsl: '348.2 69.2% 34.1%', hex: '#9f1239', rgb: '159 18 57' },
    900: { hsl: '347.8 66.4% 28.8%', hex: '#881337', rgb: '136 19 55' },
    950: { hsl: '346.2 80.4% 16.9%', hex: '#4c0519', rgb: '76 5 25' },
  },
}

export default function Playground() {
  const [code, setCode] = useState(defaultCode)
  const [selectedExample, setSelectedExample] = useState('')
  const [showResetModal, setShowResetModal] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('blue')
  const [selectedColorFormat, setSelectedColorFormat] = useState<'hsl' | 'hex' | 'rgb'>('hsl')
  const { showToast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const theme = themes.find(t => t.value === currentTheme) || themes[0]
    
    const rootStyles = getComputedStyle(document.documentElement)
    const getCSSVar = (varName: string) => rootStyles.getPropertyValue(varName).trim()
    
    const applyToElement = (element: Element) => {
      const htmlEl = element as HTMLElement
      
      htmlEl.style.setProperty('--primary', theme.primary)
      htmlEl.style.setProperty('--primary-foreground', theme.primaryForeground)
      
      htmlEl.style.setProperty('--background', getCSSVar('--background') || '0 0% 100%')
      htmlEl.style.setProperty('--foreground', getCSSVar('--foreground') || '222.2 84% 4.9%')
      htmlEl.style.setProperty('--card', getCSSVar('--card') || '0 0% 100%')
      htmlEl.style.setProperty('--card-foreground', getCSSVar('--card-foreground') || '222.2 84% 4.9%')
      htmlEl.style.setProperty('--popover', getCSSVar('--popover') || '0 0% 100%')
      htmlEl.style.setProperty('--popover-foreground', getCSSVar('--popover-foreground') || '222.2 84% 4.9%')
      htmlEl.style.setProperty('--secondary', getCSSVar('--secondary') || '210 40% 96%')
      htmlEl.style.setProperty('--secondary-foreground', getCSSVar('--secondary-foreground') || '222.2 84% 4.9%')
      htmlEl.style.setProperty('--muted', getCSSVar('--muted') || '210 40% 96%')
      htmlEl.style.setProperty('--muted-foreground', getCSSVar('--muted-foreground') || '215.4 16.3% 46.9%')
      htmlEl.style.setProperty('--accent', getCSSVar('--accent') || '210 40% 96%')
      htmlEl.style.setProperty('--accent-foreground', getCSSVar('--accent-foreground') || '222.2 84% 4.9%')
      htmlEl.style.setProperty('--destructive', getCSSVar('--destructive') || '0 84.2% 60.2%')
      htmlEl.style.setProperty('--destructive-foreground', getCSSVar('--destructive-foreground') || '210 40% 98%')
      htmlEl.style.setProperty('--border', getCSSVar('--border') || '214.3 31.8% 91.4%')
      htmlEl.style.setProperty('--input', getCSSVar('--input') || '214.3 31.8% 91.4%')
      htmlEl.style.setProperty('--ring', theme.primary)
      htmlEl.style.setProperty('--radius', getCSSVar('--radius') || '0.5rem')
      
      const allDescendants = element.querySelectorAll('*')
      allDescendants.forEach(descendant => {
        const descEl = descendant as HTMLElement
        descEl.style.setProperty('--primary', theme.primary)
        descEl.style.setProperty('--primary-foreground', theme.primaryForeground)
        descEl.style.setProperty('--ring', theme.primary)
      })
    }
    
    const applyToPreviewContainer = () => {
      const previewContainer = document.querySelector('[data-preview-container]')
      if (previewContainer) {
        applyToElement(previewContainer)
        
        const allElements = previewContainer.querySelectorAll('*')
        allElements.forEach(el => {
          const htmlEl = el as HTMLElement
          htmlEl.style.setProperty('--primary', theme.primary)
          htmlEl.style.setProperty('--primary-foreground', theme.primaryForeground)
          htmlEl.style.setProperty('--ring', theme.primary)
        })
      }
    }
    
    applyToPreviewContainer()
    
    const previewContainer = document.querySelector('[data-preview-container]')
    if (previewContainer) {
      const observer = new MutationObserver(() => {
        applyToPreviewContainer()
      })
      
      observer.observe(previewContainer, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      })
      
      const timeouts = [
        setTimeout(applyToPreviewContainer, 50),
        setTimeout(applyToPreviewContainer, 100),
        setTimeout(applyToPreviewContainer, 200),
        setTimeout(applyToPreviewContainer, 300),
        setTimeout(applyToPreviewContainer, 500),
        setTimeout(applyToPreviewContainer, 1000),
      ]
      
      return () => {
        observer.disconnect()
        timeouts.forEach(timeout => clearTimeout(timeout))
      }
    }
  }, [currentTheme])


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      showToast({
        title: t('playground.copySuccess'),
        variant: 'success',
        duration: 2000,
      })
    } catch (err) {
      showToast({
        title: t('playground.copyError'),
        variant: 'error',
        duration: 2000,
      })
    }
  }

  const handleReset = () => {
    setShowResetModal(true)
  }

  const confirmReset = () => {
    setCode(defaultCode)
    setSelectedExample('')
    setShowResetModal(false)
    showToast({
      title: t('playground.reset'),
      description: t('playground.resetSuccess'),
      variant: 'success',
      duration: 2000,
    })
  }

  const handleExampleChange = (exampleName: string) => {
    const example = examples.find((ex) => ex.name === exampleName)
    if (example) {
      setSelectedExample(exampleName)
      setCode(example.code)
      showToast({
        title: t('playground.exampleLoaded'),
        description: t('playground.exampleLoadedDesc').replace('{name}', exampleName),
        variant: 'success',
        duration: 2000,
      })
    }
  }

  const formatColor = (color: { hsl: string; hex: string; rgb: string }, format: 'hsl' | 'hex' | 'rgb'): string => {
    switch (format) {
      case 'hsl':
        return `hsl(${color.hsl})`
      case 'hex':
        return color.hex
      case 'rgb':
        return `rgb(${color.rgb})`
      default:
        return `hsl(${color.hsl})`
    }
  }

  const copyColor = (_colorName: string, _shade: string, colorValue: { hsl: string; hex: string; rgb: string }) => {
    const text = formatColor(colorValue, selectedColorFormat)
    navigator.clipboard.writeText(text).then(() => {
      showToast({
        title: t('playground.copySuccess'),
        variant: 'success',
        duration: 2000,
      })
    })
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {t('playground.title')}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-2">
          {t('playground.subtitle')}
        </p>
        <p className="text-sm text-muted-foreground">
          {t('playground.instructions')}
        </p>
      </div>

      <LiveProvider 
        code={code} 
        scope={createScope(themes.find(t => t.value === currentTheme) || themes[0])}
        key={`provider-${selectedExample || 'default'}-${currentTheme}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CodeBracketIcon className="h-5 w-5" />
                    {t('playground.editor')}
                  </CardTitle>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
                    >
                      <ClipboardIcon className="h-4 w-4" />
                      {t('playground.copy')}
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                      {t('playground.reset')}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label={t('playground.examples')}
                    options={examples.map((ex) => ({ value: ex.name, label: ex.name }))}
                    value={selectedExample || ''}
                    onChange={(value: string | string[]) => {
                      const exampleName = Array.isArray(value) ? value[0] : value
                      if (exampleName && typeof exampleName === 'string') {
                        handleExampleChange(exampleName)
                      }
                    }}
                    placeholder={t('playground.selectExample')}
                    mode="single"
                  />
                  <Select
                    label={t('playground.theme')}
                    options={themes.map((theme) => ({ value: theme.value, label: theme.name }))}
                    value={currentTheme || ''}
                    onChange={(value: string | string[]) => {
                      const themeValue = Array.isArray(value) ? value[0] : value
                      if (themeValue && typeof themeValue === 'string') {
                        setCurrentTheme(themeValue)
                      }
                    }}
                    placeholder={t('playground.theme')}
                    mode="single"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <LiveEditor
                key={`editor-${selectedExample || 'default'}-${code.substring(0, 20)}`}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  padding: '16px',
                  minHeight: '500px',
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  overflow: 'auto',
                }}
                onChange={setCode}
              />
              <LiveError className="p-4 bg-red-500/10 border-t border-red-500/20 text-red-500 text-sm" />
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <CodeBracketIcon className="h-5 w-5" />
                {t('playground.preview')}
                <span className="ml-auto text-xs font-normal text-muted-foreground">
                  Atualização automática
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-auto bg-muted/30 min-h-[500px]">
              <div 
                className="p-4 flex items-center justify-center min-h-full"
                data-preview-container
                style={{
                  '--primary': themes.find(t => t.value === currentTheme)?.primary || themes[0].primary,
                  '--primary-foreground': themes.find(t => t.value === currentTheme)?.primaryForeground || themes[0].primaryForeground,
                  '--ring': themes.find(t => t.value === currentTheme)?.primary || themes[0].primary,
                } as React.CSSProperties}
              >
                <div 
                  key={`preview-wrapper-${selectedExample || 'default'}-${currentTheme}`}
                  className="w-full"
                  style={{
                    '--primary': themes.find(t => t.value === currentTheme)?.primary || themes[0].primary,
                    '--primary-foreground': themes.find(t => t.value === currentTheme)?.primaryForeground || themes[0].primaryForeground,
                    '--ring': themes.find(t => t.value === currentTheme)?.primary || themes[0].primary,
                  } as React.CSSProperties}
                >
                  <LivePreview />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </LiveProvider>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <SwatchIcon className="h-5 w-5" />
              {t('playground.colors')}
            </CardTitle>
            <div className="flex gap-2">
              {(['hsl', 'hex', 'rgb'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedColorFormat(format)}
                  className={`
                    px-3 py-1 text-xs font-medium rounded-md transition-colors
                    ${selectedColorFormat === format
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                    }
                  `}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion
            type="multiple"
            items={Object.entries(tailwindColors).map(([colorName, shades]) => {
              const previewShades: Array<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'> = ['50', '300', '500', '700', '950']
              const previewColors = previewShades.map(shade => ({
                shade,
                color: shades[shade]
              })).filter(item => item.color)
              
              return {  
                value: colorName,
                trigger: (
                  <div className="flex items-center gap-3 w-full">
                    <span className="capitalize font-semibold flex-1">{colorName}</span>
                    <div className="flex items-center gap-1.5">
                      {previewColors.map(({ shade, color }) => (
                        <div
                          key={shade}
                          className="w-6 h-6 rounded border border-border shadow-sm"
                          style={{ backgroundColor: `hsl(${color.hsl})` }}
                          title={`${colorName}-${shade}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground italic">
                      {t('playground.clickToExpand')}
                    </span>
                  </div>
                ),
                content: (
                  <div className="grid grid-cols-11 gap-1 pt-2">
                    {Object.entries(shades).map(([shade, color]) => (
                      <button
                        key={shade}
                        onClick={() => copyColor(colorName, shade, color)}
                        className="group relative flex flex-col items-center gap-0.5 p-1 rounded hover:bg-accent transition-colors"
                        title={`${colorName}-${shade}: ${formatColor(color, selectedColorFormat)}`}
                      >
                        <div
                          className="w-full h-8 rounded border border-border shadow-sm group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: `hsl(${color.hsl})` }}
                        />
                        <span className="text-[9px] font-medium text-muted-foreground">{shade}</span>
                      </button>
                    ))}
                  </div>
                ),
                defaultOpen: false,
              }
            })}
          />
        </CardContent>
      </Card>

      <Dialog
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title={t('playground.reset')}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {t('playground.resetConfirm')}
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowResetModal(false)}
              className="px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
            >
              {t('playground.cancel')}
            </button>
            <button
              onClick={confirmReset}
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t('playground.reset')}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

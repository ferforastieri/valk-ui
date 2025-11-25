import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Button, 
  Input, 
  Select, 
  MetricCard,
  StatusBadge,
  ProgressBar
} from '@/components'
import type { SelectOption } from '@/components'
import { CodeBracketIcon, CheckCircleIcon, BookOpenIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [selectValue, setSelectValue] = useState<string[]>([])

  const selectOptions: SelectOption[] = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/logo.png" alt="Valk UI" className="h-14 w-14" />
          <h1 className="text-5xl font-bold text-foreground">Valk UI</h1>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 inline-block">
          <p className="text-sm text-primary font-medium">🎨 Demonstração Interativa</p>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Biblioteca moderna de componentes UI para React e Blade. 
          Crie interfaces bonitas e consistentes com componentes prontos para produção.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
          <Link to="/components">
            <Button variant="primary" size="lg">
              <CodeBracketIcon className="h-5 w-5 mr-2" />
              Veja Mais
            </Button>
          </Link>
          <Link to="/docs">
            <Button variant="outline" size="lg">
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Ver Documentação
            </Button>
          </Link>
          <a 
            href="https://github.com/ferforastieri/valk-ui" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              <ArrowUpRightIcon className="h-5 w-5 mr-2" />
              Repositório
            </Button>
          </a>
        </div>
      </div>

      {/* Características */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircleIcon className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Pronto para Produção</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Componentes testados e otimizados para uso em projetos reais.
          </p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircleIcon className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">TypeScript</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Totalmente tipado com TypeScript para melhor experiência de desenvolvimento.
          </p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircleIcon className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Dark Mode</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Suporte nativo a modo escuro em todos os componentes.
          </p>
        </div>
      </div>

      {/* Exemplos Rápidos */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Exemplos Rápidos</h2>
          <p className="text-sm text-muted-foreground mt-2">Interaja com os componentes abaixo - esta é uma demonstração</p>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Formulários</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
              <Input label="Nome" placeholder="Digite seu nome" />
              <Select
                label="Selecione"
                options={selectOptions}
                value={selectValue}
                onChange={(value: string | string[]) => setSelectValue(Array.isArray(value) ? value : [value])}
                mode="multi"
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="active">Ativo</StatusBadge>
                <StatusBadge status="completed">Concluído</StatusBadge>
                <StatusBadge status="pending">Pendente</StatusBadge>
              </div>
              <ProgressBar value={75} color="blue" showLabel />
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
                <MetricCard
                  title="Taxa"
                  value="3.2%"
                  subtitle="Conversão"
                  variant="warning"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instalação Rápida */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Instalação Rápida</h2>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <code className="text-green-400 text-sm">
            <div className="mb-2">npx valk-ui</div>
          </code>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Execute o CLI interativo e escolha os componentes que deseja instalar.
        </p>
      </div>
    </div>
  )
}

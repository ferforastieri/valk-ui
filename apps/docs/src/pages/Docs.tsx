import { CodeBracketIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Docs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Documentação</h1>
        <p className="text-lg text-muted-foreground">
          Aprenda a instalar e usar os componentes Valk UI no seu projeto.
        </p>
      </div>

      {/* Instalação */}
      <section className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Instalação</h2>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Via CLI (Recomendado)</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              <div className="mb-2"># Instalar globalmente</div>
              <div className="mb-2">npm install -g valk-ui</div>
              <div className="mb-2"># ou executar diretamente</div>
              <div>npx valk-ui</div>
            </code>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">React / TypeScript</h3>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              1. Execute o CLI e selecione React:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">npx valk-ui</code>
            </div>
            <p className="text-muted-foreground">
              2. Escolha os componentes desejados (por categoria ou individualmente)
            </p>
            <p className="text-muted-foreground">
              3. Os componentes serão copiados para <code className="bg-muted px-1 rounded">./src/components/ui</code>
            </p>
            <p className="text-muted-foreground">
              4. O CLI configurará automaticamente:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>tailwind.config.js com as variáveis CSS necessárias</li>
              <li>CSS global com variáveis de tema (light/dark mode)</li>
              <li>Arquivos index.ts para exportação dos componentes</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Blade / Laravel</h3>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              1. Execute o CLI e selecione Blade:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">npx valk-ui</code>
            </div>
            <p className="text-muted-foreground">
              2. Escolha os componentes desejados
            </p>
            <p className="text-muted-foreground">
              3. Os componentes serão copiados para <code className="bg-muted px-1 rounded">./resources/views/components</code>
            </p>
          </div>
        </div>
      </section>

      {/* Uso Básico */}
      <section className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Uso Básico</h2>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">React</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              <div className="mb-2">import {'{'} Button, Input {'}'} from '@/components/ui'</div>
              <div className="mb-2"></div>
              <div className="mb-2">function App() {'{'}</div>
              <div className="mb-2">  return (</div>
              <div className="mb-2">    {'<'}{'>'}</div>
              <div className="mb-2">      {'<'}Button variant="primary"{'>'}Clique aqui{'<'}/Button{'>'}</div>
              <div className="mb-2">      {'<'}Input label="Nome" placeholder="Digite seu nome" /{'>'}</div>
              <div className="mb-2">    {'<'}/{'>'}</div>
              <div className="mb-2">  )</div>
              <div>{'}'}</div>
            </code>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Blade</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              <div className="mb-2">{'<'}x-ui.button variant="primary"{'>'}Clique aqui{'<'}/x-ui.button{'>'}</div>
              <div className="mb-2">{'<'}x-ui.input label="Nome" placeholder="Digite seu nome" /{'>'}</div>
            </code>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Requisitos</h2>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">React</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>React 18+</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>TypeScript (recomendado)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Tailwind CSS 3+</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Heroicons (para ícones)</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Blade / Laravel</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Laravel 10+</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Tailwind CSS 3+</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Alpine.js (para interatividade)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Customização */}
      <section className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Customização</h2>
        <p className="text-muted-foreground">
          Todos os componentes são totalmente customizáveis. Você pode modificar as classes CSS diretamente nos arquivos dos componentes ou usar as variáveis CSS do tema para personalizar cores e espaçamentos.
        </p>
        <p className="text-muted-foreground">
          O CLI configura automaticamente as variáveis CSS no seu <code className="bg-muted px-1 rounded">tailwind.config.js</code> e no arquivo CSS global, permitindo fácil customização de temas.
        </p>
      </section>
    </div>
  )
}


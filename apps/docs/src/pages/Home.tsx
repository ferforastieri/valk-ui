import { Button, MetricCard, StatusBadge, ProgressBar } from '@/components'
import { 
  ArrowDownTrayIcon, 
  CodeBracketIcon, 
  SparklesIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <SparklesIcon className="h-12 w-12 text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Valk UI
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Biblioteca moderna de componentes UI para React e Blade. 
          Crie interfaces bonitas e consistentes com componentes prontos para produção.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" variant="primary">
            <CodeBracketIcon className="h-5 w-5 mr-2" />
            Começar
          </Button>
          <Button size="lg" variant="outline">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Instalar
          </Button>
        </div>
      </div>

      {/* Installation Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CodeBracketIcon className="h-8 w-8 text-blue-600" />
          Instalação
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Via CLI (Recomendado)
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                <div className="mb-2"># Instalar globalmente</div>
                <div className="mb-2">npm install -g valk-ui</div>
                <div className="mb-2"># ou</div>
                <div>npx valk-ui</div>
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              React / TypeScript
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                <div className="mb-2"># Execute o CLI e selecione React</div>
                <div className="mb-2">npx valk-ui</div>
                <div className="mb-2"># Escolha os componentes desejados</div>
                <div># Os componentes serão copiados para ./src/components/ui</div>
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Blade / Laravel
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                <div className="mb-2"># Execute o CLI e selecione Blade</div>
                <div className="mb-2">npx valk-ui</div>
                <div className="mb-2"># Escolha os componentes desejados</div>
                <div># Os componentes serão copiados para ./resources/views/components</div>
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CodeBracketIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              ⚛️ React / TypeScript
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Componentes React totalmente tipados com TypeScript, prontos para uso em qualquer projeto React.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Totalmente tipado com TypeScript
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Customizável e acessível
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Dark mode suportado
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <CodeBracketIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              🔷 Blade / Laravel
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Componentes Blade para Laravel com Tailwind CSS, integração perfeita com Alpine.js.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Integração com Alpine.js
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Tailwind CSS incluído
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Fácil de customizar
            </li>
          </ul>
        </div>
      </div>

      {/* Demo Components */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Componentes em Ação
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Componentes"
            value="15+"
            subtitle="Prontos para uso"
            variant="blue"
          />
          <MetricCard
            title="Categorias"
            value="4"
            subtitle="Forms, Feedback, Layout, Charts"
            variant="default"
          />
          <MetricCard
            title="Tecnologias"
            value="2"
            subtitle="React e Blade"
            variant="success"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Status Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="active">Ativo</StatusBadge>
            <StatusBadge status="completed">Concluído</StatusBadge>
            <StatusBadge status="pending">Pendente</StatusBadge>
            <StatusBadge status="error">Erro</StatusBadge>
            <StatusBadge status="warning">Aviso</StatusBadge>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Progress Bars
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Progresso 75%</p>
              <ProgressBar value={75} color="blue" showLabel />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Progresso 50%</p>
              <ProgressBar value={50} color="green" showLabel />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Progresso 25%</p>
              <ProgressBar value={25} color="purple" showLabel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

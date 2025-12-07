import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from '../contexts/TranslationContext'

export default function Docs() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.docs.title}</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          {t.docs.subtitle}
        </p>
      </div>

      {/* Aviso de Customização */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Todos os componentes são customizáveis</h3>
            <p className="text-sm text-muted-foreground">
              Recomendamos fortemente que você customize os componentes para se adequarem ao seu design. Todos os componentes são copiados para o seu projeto, então você tem controle total sobre o código e pode modificá-los conforme necessário.
            </p>
          </div>
        </div>
      </div>

      {/* Instalação */}
      <section className="bg-card border rounded-lg p-4 md:p-6 space-y-5">
        <h2 className="text-2xl font-bold text-foreground">{t.docs.installation}</h2>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">{t.docs.viaCLI}</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              <div className="mb-2">{t.docs.installGlobally}</div>
              <div className="mb-2">npm install -g ui-valk</div>
              <div className="mb-2">{t.docs.orRunDirectly}</div>
              <div>npx ui-valk</div>
            </code>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">{t.docs.react}</h3>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              {t.docs.reactStep1}
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">npx ui-valk</code>
            </div>
            <p className="text-muted-foreground">
              {t.docs.reactStep2}
            </p>
            <p className="text-muted-foreground">
              {t.docs.reactStep3} <code className="bg-muted px-1 rounded">./src/components/ui</code>
            </p>
            <p className="text-muted-foreground">
              {t.docs.reactStep4}
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>{t.docs.reactStep4Item1}</li>
              <li>{t.docs.reactStep4Item2}</li>
              <li>{t.docs.reactStep4Item3}</li>
            </ul>
          </div>
        </div>

      </section>

      {/* Uso Básico */}
      <section className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{t.docs.basicUsage}</h2>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">{t.docs.reactReq}</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              <div className="mb-2">import {'{'} Button, Input {'}'} from '@/components/ui'</div>
              <div className="mb-2"></div>
              <div className="mb-2">function App() {'{'}</div>
              <div className="mb-2">  return (</div>
              <div className="mb-2">    {'<'}{'>'}</div>
              <div className="mb-2">      {'<'}Button variant="primary"{'>'}Click here{'<'}/Button{'>'}</div>
              <div className="mb-2">      {'<'}Input label="Name" placeholder="Enter your name" /{'>'}</div>
              <div className="mb-2">    {'<'}/{'>'}</div>
              <div className="mb-2">  )</div>
              <div>{'}'}</div>
            </code>
          </div>
        </div>

      </section>

      {/* Requisitos */}
      <section className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{t.docs.requirements}</h2>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">{t.docs.reactReq}</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{t.docs.reactReq1}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{t.docs.reactReq2}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{t.docs.reactReq3}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{t.docs.reactReq4}</span>
            </li>
          </ul>
        </div>

      </section>
    </div>
  )
}


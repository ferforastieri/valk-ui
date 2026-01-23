# Valk UI

<div align="center">

![Valk UI](https://img.shields.io/badge/Valk%20UI-v1.4.3-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18%20%7C%2019-blue?style=for-the-badge&logo=react)

**Biblioteca moderna de componentes UI para React com TypeScript**

[Documentação](#-documentação) • [Instalação](#-instalação) • [Componentes](#-componentes-disponíveis) • [CLI](#-usando-o-cli)

</div>

---

## ✨ Características

- 🎨 **Design Moderno**: Componentes bonitos e consistentes com Tailwind CSS
- ⚛️ **React 18 & 19**: Suporte para React 18 e React 19
- 📘 **TypeScript**: Totalmente tipado e pronto para produção
- 🌙 **Dark Mode**: Suporte nativo a modo escuro
- 📦 **CLI Interativo**: Instale apenas os componentes que você precisa
- 🎯 **Zero Dependências Pesadas**: Componentes leves e performáticos
- ♿ **Acessível**: Construído com acessibilidade em mente
- 🔧 **Customizável**: Fácil de personalizar e estender

## 🚀 Instalação

### Instalar o pacote

```bash
npm install ui-valk
# ou
pnpm add ui-valk
# ou
yarn add ui-valk
```

### Instalar dependências peer

```bash
npm install react react-dom @heroicons/react @headlessui/react
```

Para componentes de gráficos (opcional):
```bash
npm install chart.js react-chartjs-2
```

## 📦 Usando o CLI

O Valk UI inclui um CLI interativo para instalar componentes diretamente no seu projeto:

```bash
npx ui-valk
```

O CLI permite:
- ✅ Escolher idioma (PT, EN, ES)
- ✅ Instalar por categoria ou individualmente
- ✅ Definir diretório de instalação personalizado
- ✅ Configuração automática do Tailwind CSS

## 🎨 Componentes Disponíveis

### 📝 Formulários (`forms/`)

- **Button** - Botões com múltiplas variantes (primary, secondary, outline, ghost, destructive) e tamanhos
- **Input** - Campos de entrada com suporte a ícones, labels e validação
- **Select** - Seletor customizado com busca e modo múltiplo
- **Checkbox** - Checkbox customizado com label e descrição
- **Toggle** - Switch toggle com diferentes tamanhos
- **DatePicker** - Seletor de data com calendário interativo

### 💬 Feedback (`feedback/`)

- **Modal** - Modal responsivo com diferentes tamanhos
- **Dialog** - Diálogo acessível com overlay
- **Toast** - Sistema de notificações toast
- **ToastContext** - Context provider para toasts
- **StatusBadge** - Badges para indicar status
- **Badge** - Badge genérico customizável
- **ProgressBar** - Barra de progresso com diferentes cores
- **DropdownMenu** - Menu dropdown acessível
- **Command** - Command palette (busca de comandos)
- **ThemeToggle** - Toggle para alternar tema claro/escuro

### 📐 Layout (`layout/`)

- **Card** - Card com header, content e footer
- **Avatar** - Avatar com fallback para iniciais
- **MetricCard** - Card para exibir métricas e KPIs
- **PaginatedTable** - Tabela paginada com busca e ordenação
- **Navigation** - Componente de navegação
- **Sidebar** - Sidebar colapsável
- **Tabs** - Sistema de abas
- **Accordion** - Accordion expansível
- **Separator** - Separador visual
- **Sheet** - Painel lateral (drawer)
- **DocsSidebar** - Sidebar para documentação

### 📊 Gráficos (`charts/`)

- **BarChart** - Gráfico de barras comparativo
- **DonutChart** - Gráfico de rosca (donut)
- **LineChart** - Gráfico de linha temporal

## 🎯 Uso Básico

### Importar componentes

```tsx
import { Button, Input, Modal, Card } from 'ui-valk'
```

### Exemplo completo

```tsx
import { Button, Input, Modal, Card, CardHeader, CardTitle, CardContent } from 'ui-valk'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao Valk UI</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            label="Email" 
            placeholder="email@example.com" 
            type="email"
          />
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setIsOpen(true)}
          >
            Abrir Modal
          </Button>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Título do Modal"
      >
        <p>Conteúdo do modal aqui</p>
      </Modal>
    </div>
  )
}
```

## 🛠️ Requisitos

- **React**: ^18.0.0 || ^19.0.0
- **React DOM**: ^18.0.0 || ^19.0.0
- **TypeScript**: ^5.0.0 (recomendado)
- **Tailwind CSS**: ^3.0.0
- **Node.js**: ^18.0.0

### Dependências Peer

- `@heroicons/react`: ^2.0.0 (para ícones)
- `@headlessui/react`: ^2.0.0 (para componentes acessíveis)
- `react-router-dom`: ^7.0.0 (opcional, para navegação)

### Dependências Opcionais

- `chart.js`: ^4.0.0 e `react-chartjs-2`: ^5.0.0 (para componentes de gráficos)

## ⚙️ Configuração do Tailwind CSS

O Valk UI requer Tailwind CSS. Adicione ao seu `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/ui-valk/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Suas customizações
    },
  },
  plugins: [],
}
```

E importe o CSS no seu arquivo principal:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📖 Documentação Completa

Para documentação completa com exemplos, acesse:
- [Documentação Online](https://valk-ui.dev) (em breve)
- [GitHub Repository](https://github.com/ferforastieri/valk-ui)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Heroicons](https://heroicons.com/) - Ícones SVG
- [Chart.js](https://www.chartjs.org/) - Biblioteca de gráficos
- [Headless UI](https://headlessui.com/) - Componentes acessíveis

## 📧 Suporte

- **Issues**: [GitHub Issues](https://github.com/ferforastieri/valk-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ferforastieri/valk-ui/discussions)

---

<div align="center">

Feito com ❤️ por [Fernando Forastieri](https://github.com/ferforastieri)

⭐ Se este projeto foi útil para você, considere dar uma estrela!

</div>


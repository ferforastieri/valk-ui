export type Language = 'pt' | 'en' | 'es'

export interface Translations {
  nav: {
    docs: string
    components: string
    changelog: string
    search: string
  }
  home: {
    announcement: string
    title: string
    subtitle: string
    getStarted: string
    viewComponents: string
    examples: string
    dashboard: string
    tasks: string
    theme: string
    paymentMethod: string
    paymentDescription: string
    nameOnCard: string
    noTeamMembers: string
    inviteTeam: string
    twoFactorAuth: string
    twoFactorDescription: string
    enable: string
    copyPaste: string
    copyPasteDesc: string
    fullyCustomizable: string
    fullyCustomizableDesc: string
    typescript: string
    typescriptDesc: string
  }
  docs: {
    title: string
    subtitle: string
    installation: string
    viaCLI: string
    installGlobally: string
    orRunDirectly: string
    react: string
    reactStep1: string
    reactStep2: string
    reactStep3: string
    reactStep4: string
    reactStep4Item1: string
    reactStep4Item2: string
    reactStep4Item3: string
    basicUsage: string
    requirements: string
    reactReq: string
    reactReq1: string
    reactReq2: string
    reactReq3: string
    reactReq4: string
    customization: string
    customizationDesc: string
    customizationDesc2: string
  }
  components: {
    title: string
    subtitle: string
    forms: string
    feedback: string
    layout: string
    charts: string
  }
    changelog: {
      title: string
      subtitle: string
      currentVersion: string
      totalVersions: string
      releases: string
      lastUpdate: string
      lastVersion: string
      major: string
      minor: string
      patch: string
      added: string
      fixed: string
      improved: string
      changed?: string
      removed?: string
      loading: string
      viewOnGitHub: string
      stableRelease: string
      noReleasesFound: string
      usingDefault: string
      releaseNotesAvailable: string
    }
    colors: {
      title: string
      subtitle: string
      format: string
      formatDescription: string
      clickToCopy: string
      copySuccess: string
      copyError: string
    }
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      docs: 'Documentação',
      components: 'Componentes',
      changelog: 'Changelog',
      search: 'Buscar documentação...',
    },
    home: {
      announcement: 'Novos Componentes: Field, Input Group, Item e mais →',
      title: 'A Base para seu Design System',
      subtitle: 'Um conjunto de componentes cuidadosamente projetados que você pode copiar, personalizar e estender. Construa seu design system com componentes de código aberto e totalmente customizáveis.',
      getStarted: 'Começar',
      viewComponents: 'Ver Componentes',
      examples: 'Exemplos',
      dashboard: 'Dashboard',
      tasks: 'Tarefas',
      theme: 'Tema: Neutro',
      paymentMethod: 'Método de Pagamento',
      paymentDescription: 'Todas as transações são seguras e criptografadas',
      nameOnCard: 'Nome no Cartão',
      noTeamMembers: 'Sem Membros da Equipe',
      inviteTeam: 'Convide sua equipe para',
      twoFactorAuth: 'Autenticação de dois fatores',
      twoFactorDescription: 'Verifique via email ou número de telefone.',
      enable: 'Habilitar',
      copyPaste: 'Copiar e Colar',
      copyPasteDesc: 'Copie e cole componentes diretamente no seu projeto. Sem dependências adicionais, sem complicações. Você tem controle total sobre o código.',
      fullyCustomizable: 'Totalmente Customizável',
      fullyCustomizableDesc: 'Cada componente é construído com Tailwind CSS e pode ser facilmente modificado para se adequar ao seu design. O código é seu.',
      typescript: 'TypeScript',
      typescriptDesc: 'Construído com TypeScript para oferecer melhor experiência de desenvolvimento, autocompletar inteligente e segurança de tipos.',
    },
    docs: {
      title: 'Documentação',
      subtitle: 'Aprenda como instalar, configurar e usar os componentes Valk UI no seu projeto React.',
      installation: 'Instalação',
      viaCLI: 'Via CLI (Recomendado)',
      installGlobally: '# Instalar globalmente',
      orRunDirectly: '# ou executar diretamente',
      react: 'React / TypeScript',
      reactStep1: '1. Execute o CLI e selecione React:',
      reactStep2: '2. Escolha os componentes desejados (por categoria ou individualmente)',
      reactStep3: '3. Os componentes serão copiados para',
      reactStep4: '4. O CLI configurará automaticamente:',
      reactStep4Item1: 'tailwind.config.js com as variáveis CSS necessárias',
      reactStep4Item2: 'CSS global com variáveis de tema (light/dark mode)',
      reactStep4Item3: 'Arquivos index.ts para exportação dos componentes',
      basicUsage: 'Uso Básico',
      requirements: 'Requisitos',
      reactReq: 'React',
      reactReq1: 'React 18+',
      reactReq2: 'TypeScript (recomendado)',
      reactReq3: 'Tailwind CSS 3+',
      reactReq4: 'Heroicons (para ícones)',
      customization: 'Customização',
      customizationDesc: 'Todos os componentes são totalmente customizáveis. Você pode modificar as classes CSS diretamente nos arquivos dos componentes ou usar as variáveis CSS do tema para personalizar cores e espaçamentos.',
      customizationDesc2: 'O CLI configura automaticamente as variáveis CSS no seu tailwind.config.js e no arquivo CSS global, permitindo fácil customização de temas.',
    },
    components: {
      title: 'Componentes',
      subtitle: 'Explore todos os componentes disponíveis na biblioteca Valk UI. Cada componente inclui exemplos de uso e documentação completa.',
      forms: 'Formulários',
      feedback: 'Feedback',
      layout: 'Layout',
      charts: 'Gráficos',
    },
    changelog: {
      title: 'Changelog',
      subtitle: 'Acompanhe todas as mudanças, melhorias e novas funcionalidades da biblioteca Valk UI. Histórico completo de versões e releases.',
      currentVersion: 'Versão Atual',
      totalVersions: 'Total de Versões',
      releases: 'Lançamentos',
      lastUpdate: 'Última Atualização',
      lastVersion: 'Última versão publicada',
      major: 'Major',
      minor: 'Minor',
      added: 'Adicionado',
      fixed: 'Corrigido',
      improved: 'Melhorado',
      changed: 'Alterado',
      removed: 'Removido',
      loading: 'Carregando changelog...',
      viewOnGitHub: 'Ver no GitHub',
      stableRelease: 'Release estável',
      noReleasesFound: 'Nenhum release encontrado',
      usingDefault: 'Usando dados padrão do changelog',
      releaseNotesAvailable: 'Notas de release disponíveis no GitHub',
      patch: 'Patch',
    },
    colors: {
      title: 'Cores do Tailwind em Todos os Formatos',
      subtitle: 'A paleta completa de cores do Tailwind em HEX, RGB, HSL, variáveis CSS e classes. Pronto para copiar e colar no seu projeto.',
      format: 'Formato',
      formatDescription: 'Escolha o formato que deseja visualizar as cores',
      clickToCopy: 'Clique para copiar',
      copySuccess: 'Copiado!',
      copyError: 'Erro ao copiar',
    },
  },
  en: {
    nav: {
      docs: 'Docs',
      components: 'Components',
      changelog: 'Changelog',
      search: 'Search documentation...',
    },
    home: {
      announcement: 'New Components: Field, Input Group, Item and more →',
      title: 'The Foundation for your Design System',
      subtitle: 'A carefully crafted set of components that you can copy, customize, and extend. Build your design system with open source, fully customizable components.',
      getStarted: 'Get Started',
      viewComponents: 'View Components',
      examples: 'Examples',
      dashboard: 'Dashboard',
      tasks: 'Tasks',
      theme: 'Theme: Neutral',
      paymentMethod: 'Payment Method',
      paymentDescription: 'All transactions are secure and encrypted',
      nameOnCard: 'Name on Card',
      noTeamMembers: 'No Team Members',
      inviteTeam: 'Invite your team to',
      twoFactorAuth: 'Two-factor authentication',
      twoFactorDescription: 'Verify via email or phone number.',
      enable: 'Enable',
      copyPaste: 'Copy & Paste',
      copyPasteDesc: 'Copy components directly into your app. No dependencies, no hassle.',
      fullyCustomizable: 'Fully Customizable',
      fullyCustomizableDesc: 'Every component is built with Tailwind CSS and can be easily customized.',
      typescript: 'TypeScript',
      typescriptDesc: 'Built with TypeScript for better developer experience and type safety.',
    },
    docs: {
      title: 'Documentation',
      subtitle: 'Learn how to install, configure, and use Valk UI components in your React project.',
      installation: 'Installation',
      viaCLI: 'Via CLI (Recommended)',
      installGlobally: '# Install globally',
      orRunDirectly: '# or run directly',
      react: 'React / TypeScript',
      reactStep1: '1. Run the CLI and select React:',
      reactStep2: '2. Choose the desired components (by category or individually)',
      reactStep3: '3. Components will be copied to',
      reactStep4: '4. The CLI will automatically configure:',
      reactStep4Item1: 'tailwind.config.js with necessary CSS variables',
      reactStep4Item2: 'Global CSS with theme variables (light/dark mode)',
      reactStep4Item3: 'index.ts files for component exports',
      basicUsage: 'Basic Usage',
      requirements: 'Requirements',
      reactReq: 'React',
      reactReq1: 'React 18+',
      reactReq2: 'TypeScript (recommended)',
      reactReq3: 'Tailwind CSS 3+',
      reactReq4: 'Heroicons (for icons)',
      customization: 'Customization',
      customizationDesc: 'All components are fully customizable. You can modify CSS classes directly in component files or use theme CSS variables to customize colors and spacing.',
      customizationDesc2: 'The CLI automatically configures CSS variables in your tailwind.config.js and in the global CSS file, allowing easy theme customization.',
    },
    components: {
      title: 'Components',
      subtitle: 'Explore all available components in the Valk UI library. Each component includes usage examples and complete documentation.',
      forms: 'Forms',
      feedback: 'Feedback',
      layout: 'Layout',
      charts: 'Charts',
    },
    changelog: {
      title: 'Changelog',
      subtitle: 'Track all changes, improvements, and new features in the Valk UI library. Complete version history and releases.',
      currentVersion: 'Current Version',
      totalVersions: 'Total Versions',
      releases: 'Releases',
      lastUpdate: 'Last Update',
      lastVersion: 'Last published version',
      major: 'Major',
      minor: 'Minor',
      added: 'Added',
      fixed: 'Fixed',
      improved: 'Improved',
      changed: 'Changed',
      removed: 'Removed',
      loading: 'Loading changelog...',
      viewOnGitHub: 'View on GitHub',
      stableRelease: 'Stable release',
      noReleasesFound: 'No releases found',
      usingDefault: 'Using default changelog data',
      releaseNotesAvailable: 'Release notes available on GitHub',
      patch: 'Patch',
    },
    colors: {
      title: 'Tailwind Colors in Every Format',
      subtitle: 'The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project.',
      format: 'Format',
      formatDescription: 'Choose the format you want to view the colors in',
      clickToCopy: 'Click to copy',
      copySuccess: 'Copied!',
      copyError: 'Error copying',
    },
  },
  es: {
    nav: {
      docs: 'Docs',
      components: 'Componentes',
      changelog: 'Changelog',
      search: 'Buscar documentación...',
    },
    home: {
      announcement: 'Nuevos Componentes: Field, Input Group, Item y más →',
      title: 'La Base para tu Design System',
      subtitle: 'Un conjunto de componentes cuidadosamente diseñados que puedes copiar, personalizar y extender. Construye tu design system con componentes de código abierto y totalmente personalizables.',
      getStarted: 'Comenzar',
      viewComponents: 'Ver Componentes',
      examples: 'Ejemplos',
      dashboard: 'Dashboard',
      tasks: 'Tareas',
      theme: 'Tema: Neutral',
      paymentMethod: 'Método de Pago',
      paymentDescription: 'Todas las transacciones son seguras y encriptadas',
      nameOnCard: 'Nombre en la Tarjeta',
      noTeamMembers: 'Sin Miembros del Equipo',
      inviteTeam: 'Invita a tu equipo a',
      twoFactorAuth: 'Autenticación de dos factores',
      twoFactorDescription: 'Verifica por correo electrónico o número de teléfono.',
      enable: 'Habilitar',
      copyPaste: 'Copiar y Pegar',
      copyPasteDesc: 'Copia componentes directamente en tu app. Sin dependencias, sin complicaciones.',
      fullyCustomizable: 'Totalmente Personalizable',
      fullyCustomizableDesc: 'Cada componente está construido con Tailwind CSS y puede ser fácilmente personalizado.',
      typescript: 'TypeScript',
      typescriptDesc: 'Construido con TypeScript para mejor experiencia de desarrollo y seguridad de tipos.',
    },
    docs: {
      title: 'Documentación',
      subtitle: 'Aprende cómo instalar, configurar y usar los componentes Valk UI en tu proyecto React.',
      installation: 'Instalación',
      viaCLI: 'Via CLI (Recomendado)',
      installGlobally: '# Instalar globalmente',
      orRunDirectly: '# o ejecutar directamente',
      react: 'React / TypeScript',
      reactStep1: '1. Ejecuta el CLI y selecciona React:',
      reactStep2: '2. Elige los componentes deseados (por categoría o individualmente)',
      reactStep3: '3. Los componentes serán copiados a',
      reactStep4: '4. El CLI configurará automáticamente:',
      reactStep4Item1: 'tailwind.config.js con las variables CSS necesarias',
      reactStep4Item2: 'CSS global con variables de tema (modo claro/oscuro)',
      reactStep4Item3: 'Archivos index.ts para exportación de componentes',
      basicUsage: 'Uso Básico',
      requirements: 'Requisitos',
      reactReq: 'React',
      reactReq1: 'React 18+',
      reactReq2: 'TypeScript (recomendado)',
      reactReq3: 'Tailwind CSS 3+',
      reactReq4: 'Heroicons (para iconos)',
      customization: 'Personalización',
      customizationDesc: 'Todos los componentes son totalmente personalizables. Puedes modificar las clases CSS directamente en los archivos de componentes o usar las variables CSS del tema para personalizar colores y espaciados.',
      customizationDesc2: 'El CLI configura automáticamente las variables CSS en tu tailwind.config.js y en el archivo CSS global, permitiendo fácil personalización de temas.',
    },
    components: {
      title: 'Componentes',
      subtitle: 'Explora todos los componentes disponibles en la biblioteca Valk UI. Cada componente incluye ejemplos de uso y documentación completa.',
      forms: 'Formularios',
      feedback: 'Retroalimentación',
      layout: 'Diseño',
      charts: 'Gráficos',
    },
    changelog: {
      title: 'Changelog',
      subtitle: 'Sigue todos los cambios, mejoras y nuevas funcionalidades de la biblioteca Valk UI. Historial completo de versiones y lanzamientos.',
      currentVersion: 'Versión Actual',
      totalVersions: 'Total de Versiones',
      releases: 'Lanzamientos',
      lastUpdate: 'Última Actualización',
      lastVersion: 'Última versión publicada',
      major: 'Major',
      minor: 'Minor',
      added: 'Agregado',
      fixed: 'Corregido',
      improved: 'Mejorado',
      changed: 'Cambiado',
      removed: 'Eliminado',
      loading: 'Cargando changelog...',
      viewOnGitHub: 'Ver en GitHub',
      stableRelease: 'Release estable',
      noReleasesFound: 'No se encontraron releases',
      usingDefault: 'Usando datos predeterminados del changelog',
      releaseNotesAvailable: 'Notas de release disponibles en GitHub',
      patch: 'Patch',
    },
    colors: {
      title: 'Colores de Tailwind en Todos los Formatos',
      subtitle: 'La paleta completa de colores de Tailwind en HEX, RGB, HSL, variables CSS y clases. Listo para copiar y pegar en tu proyecto.',
      format: 'Formato',
      formatDescription: 'Elige el formato en el que deseas ver los colores',
      clickToCopy: 'Haz clic para copiar',
      copySuccess: '¡Copiado!',
      copyError: 'Error al copiar',
    },
  },
}


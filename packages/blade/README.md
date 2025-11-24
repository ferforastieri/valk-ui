# Valk UI Blade

Biblioteca moderna de componentes Blade para Laravel com Tailwind CSS.

## 📦 Instalação

```bash
composer require valk-ui/blade
```

## 🚀 Uso Rápido

```blade
<x-forms.button variant="primary" size="lg">
    Clique aqui
</x-forms.button>

<x-forms.input label="Email" placeholder="email@example.com" />

<x-feedback.modal isOpen="true" title="Título">
    Conteúdo do modal
</x-feedback.modal>
```

## 🎨 Componentes Disponíveis

### Formulários
- Button, Input, Select, Checkbox, Toggle, DatePicker

### Feedback
- Modal, StatusBadge, ProgressBar

### Layout
- Avatar, MetricCard, PaginatedTable

### Gráficos
- BarChart, DonutChart, LineChart

## 📋 Requisitos

- PHP ^8.1
- Laravel ^10.0|^11.0
- Tailwind CSS ^3.0.0
- Alpine.js (recomendado para interatividade)

## 📝 Licença

MIT


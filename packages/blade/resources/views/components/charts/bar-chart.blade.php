@props([
    'title' => '',
    'previousPeriod' => 0,
    'selectedPeriod' => 0,
    'maxValue' => null,
    'showLegend' => true,
    'colorScheme' => 'blue-green',
    'isCurrency' => false,
])

@php
    $colors = [
        'blue-green' => ['previous' => '#3b82f6', 'selected' => '#10b981'],
        'pink-blue' => ['previous' => '#ec4899', 'selected' => '#1e40af'],
    ];
    $currentColors = $colors[$colorScheme] ?? $colors['blue-green'];
    $chartId = 'bar-chart-' . uniqid();
    $calculatedMax = max($previousPeriod, $selectedPeriod) * 1.2;
    $finalMaxValue = $maxValue ?? ($calculatedMax > 0 ? $calculatedMax : 100);
@endphp

<div {{ $attributes->merge(['class' => 'rounded-2xl border-2 border-gray-200 bg-white p-3 sm:p-4 shadow-sm flex flex-col dark:border-gray-700 dark:bg-gray-800 h-[280px] 2xl:h-[350px]']) }}>
    <h3 class="flex-shrink-0 mb-2 font-semibold leading-tight break-words text-blue-600 dark:text-blue-400 sm:mb-3 text-sm sm:text-base">
        {{ $title }}
    </h3>
    
    <div class="flex-1 h-[200px] 2xl:h-[270px] relative" id="{{ $chartId }}-container">
        <canvas id="{{ $chartId }}"></canvas>
    </div>
    
    @if($showLegend)
        <div class="flex items-center gap-4 mt-2 text-xs">
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded" style="background-color: {{ $currentColors['previous'] }}"></div>
                <span>Período Anterior</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded" style="background-color: {{ $currentColors['selected'] }}"></div>
                <span>Período Selecionado</span>
            </div>
        </div>
    @endif
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('{{ $chartId }}');
    if (!ctx) return;
    
    // Requer Chart.js - adicione: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não está carregado. Por favor, adicione Chart.js ao seu projeto.');
        return;
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['{{ $title }}'],
            datasets: [{
                label: 'Período Anterior',
                data: [{{ $previousPeriod }}],
                backgroundColor: '{{ $currentColors['previous'] }}',
                borderColor: '{{ $currentColors['previous'] }}',
                borderWidth: 1,
                borderRadius: 4,
            }, {
                label: 'Período Selecionado',
                data: [{{ $selectedPeriod }}],
                backgroundColor: '{{ $currentColors['selected'] }}',
                borderColor: '{{ $currentColors['selected'] }}',
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: {{ $finalMaxValue }}
                }
            }
        }
    });
});
</script>
@endpush


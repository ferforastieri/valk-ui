@props([
    'title' => '',
    'data' => [],
])

@php
    $chartId = 'donut-chart-' . uniqid();
    $firstItem = $data[0] ?? null;
    $percentage = $firstItem['percentage'] ?? 0;
    $remainingPercentage = 100 - $percentage;
    $color = $firstItem['color'] ?? '#0066B3';
@endphp

<div {{ $attributes->merge(['class' => 'rounded-2xl bg-white p-4 sm:p-6 shadow-sm flex flex-col dark:bg-gray-800 min-h-[280px]']) }}>
    <div class="flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0 min-h-[2rem]">
        <h3 class="font-semibold text-blue-600 dark:text-blue-400 leading-tight text-center break-words px-2 text-sm sm:text-base">
            {{ $title }}
        </h3>
    </div>
    
    <div class="flex flex-col items-center justify-center flex-1">
        <div class="relative flex-shrink-0 w-full max-w-[200px]" style="height: 150px">
            <canvas id="{{ $chartId }}"></canvas>
            <div class="absolute inset-0 flex items-end justify-center pointer-events-none pb-2">
                <span class="text-xl sm:text-2xl font-bold" style="color: {{ $color }}">
                    {{ $percentage }}%
                </span>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('{{ $chartId }}');
    if (!ctx) return;
    
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não está carregado. Por favor, adicione Chart.js ao seu projeto.');
        return;
    }
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['{{ $firstItem['label'] ?? '' }}', 'Restante'],
            datasets: [{
                data: [{{ $percentage }}, {{ $remainingPercentage }}],
                backgroundColor: ['{{ $color }}', 'rgba(229, 231, 235, 0.3)'],
                borderColor: ['{{ $color }}', 'rgba(229, 231, 235, 0.3)'],
                borderWidth: 0,
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
            cutout: '70%',
            rotation: -90,
            circumference: 180,
        }
    });
});
</script>
@endpush


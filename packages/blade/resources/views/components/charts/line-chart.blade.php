@props([
    'title' => '',
    'data' => [],
    'labels' => [],
    'color' => '#3b82f6',
])

@php
    $chartId = 'line-chart-' . uniqid();
    $dataJson = json_encode($data);
    $labelsJson = json_encode($labels);
@endphp

<div {{ $attributes->merge(['class' => 'bg-white rounded-lg shadow-sm p-6 h-[400px] dark:bg-gray-800']) }}>
    <canvas id="{{ $chartId }}"></canvas>
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
        type: 'line',
        data: {
            labels: {!! $labelsJson !!},
            datasets: [{
                label: '{{ $title }}',
                data: {!! $dataJson !!},
                borderColor: '{{ $color }}',
                backgroundColor: '{{ $color }}20',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '{{ $color }}',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: '{{ $title }}',
                    font: {
                        size: 16,
                        weight: 'bold',
                    },
                    padding: {
                        top: 10,
                        bottom: 20,
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        }
    });
});
</script>
@endpush


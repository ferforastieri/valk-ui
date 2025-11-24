@props([
    'value' => 0,
    'max' => 100,
    'color' => 'blue',
    'size' => 'md',
    'showLabel' => false,
])

@php
    $percentage = min(max(($value / $max) * 100, 0), 100);
    
    $colors = [
        'blue' => 'bg-blue-500',
        'green' => 'bg-green-500',
        'purple' => 'bg-purple-500',
        'orange' => 'bg-orange-500',
        'red' => 'bg-red-500',
        'yellow' => 'bg-yellow-500',
    ];
    
    $sizes = [
        'sm' => 'h-2',
        'md' => 'h-3',
        'lg' => 'h-4',
    ];
    
    $colorClass = $colors[$color] ?? $colors['blue'];
    $sizeClass = $sizes[$size] ?? $sizes['md'];
@endphp

<div {{ $attributes->merge(['class' => 'w-full']) }}>
    <div class="w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 {{ $sizeClass }}">
        <div
            class="h-full transition-all duration-500 ease-out rounded-full {{ $colorClass }}"
            style="width: {{ $percentage }}%"
        ></div>
    </div>
    @if($showLabel)
        <div class="mt-1 text-xs text-gray-600 dark:text-gray-400 text-center">
            {{ number_format($percentage, 1) }}%
        </div>
    @endif
</div>

@props([
    'title' => '',
    'value' => '',
    'subtitle' => null,
    'secondaryValue' => null,
    'variant' => 'default',
    'trend' => null,
])

@php
    $variants = [
        'default' => 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
        'success' => 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
        'warning' => 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20',
        'danger' => 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
        'blue' => 'border-blue-600 bg-gradient-to-br from-blue-600 to-blue-500 text-white dark:from-blue-600 dark:to-blue-500',
        'blue-light' => 'border-blue-400 bg-blue-400/60 text-white dark:border-blue-400 dark:bg-blue-400/40 dark:text-white',
        'dark' => 'border-gray-800 bg-gray-900 text-white dark:border-gray-600 dark:bg-gray-700',
    ];
    
    $variantClass = $variants[$variant] ?? $variants['default'];
    $textClass = in_array($variant, ['blue', 'dark', 'blue-light']) ? 'text-white' : 'text-gray-900 dark:text-gray-100';
    $textMutedClass = in_array($variant, ['blue', 'dark', 'blue-light']) ? 'text-white/70' : 'text-gray-600 dark:text-gray-400';
@endphp

<div {{ $attributes->merge([
    'class' => 'rounded-2xl border-2 p-4 sm:p-5 lg:p-6 shadow-sm transition-all hover:shadow-md flex flex-col ' . $variantClass
]) }}>
    <div class="flex items-center justify-between gap-2 sm:gap-3">
        <div class="flex-1 flex flex-col justify-start min-w-0">
            <div class="min-w-0">
                <p class="font-medium leading-tight truncate sm:break-words text-sm {{ $textMutedClass }}" title="{{ $title }}">
                    {{ $title }}
                </p>
                <p class="font-bold mt-1 leading-tight truncate sm:break-all text-lg sm:text-xl {{ $textClass }}" title="{{ $value }}">
                    {{ $value }}
                </p>
            </div>
            <div class="mt-1">
                @if($secondaryValue)
                    <p class="text-xs sm:text-sm leading-tight {{ $textMutedClass }}">
                        {{ $secondaryValue }}
                    </p>
                @endif
                @if($subtitle)
                    <p class="text-xs sm:text-sm leading-tight {{ $textMutedClass }}">
                        {{ $subtitle }}
                    </p>
                @endif
            </div>
        </div>
    </div>
    
    @if($trend)
        <div class="mt-2 flex items-center">
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 {{ ($trend['isPositive'] ?? true) ? 'text-green-600' : 'text-red-600' }}" fill="currentColor" viewBox="0 0 20 20">
                @if($trend['isPositive'] ?? true)
                    <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                @else
                    <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                @endif
            </svg>
            <span class="text-xs sm:text-sm font-medium {{ ($trend['isPositive'] ?? true) ? 'text-green-600' : 'text-red-600' }}">
                {{ ($trend['value'] ?? 0) > 0 ? '+' : '' }}{{ $trend['value'] ?? 0 }} {{ $trend['label'] ?? '' }}
            </span>
        </div>
    @endif
</div>


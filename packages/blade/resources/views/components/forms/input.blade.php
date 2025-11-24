@props([
    'label' => null,
    'error' => null,
    'leftIcon' => null,
    'rightIcon' => null,
    'id' => null,
])

@php
    $inputId = $id ?? ($label ? strtolower(str_replace(' ', '-', $label)) : null);
@endphp

<div class="space-y-2">
    @if($label)
        <label
            for="{{ $inputId }}"
            class="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
            {{ $label }}
        </label>
    @endif
    <div class="relative">
        @if($leftIcon)
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div class="h-5 w-5 text-gray-400">{{ $leftIcon }}</div>
            </div>
        @endif
        <input
            type="{{ $attributes->get('type', 'text') }}"
            id="{{ $inputId }}"
            {{ $attributes->merge([
                'class' => 'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:ring-blue-600' .
                    ($leftIcon ? ' pl-10' : '') .
                    ($rightIcon ? ' pr-10' : '') .
                    ($error ? ' border-red-500 focus:ring-red-500' : '')
            ]) }}
        />
        @if($rightIcon)
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div class="h-5 w-5 text-gray-400">{{ $rightIcon }}</div>
            </div>
        @endif
    </div>
    @if($error)
        <p class="text-sm text-red-600 dark:text-red-400">{{ $error }}</p>
    @endif
</div>

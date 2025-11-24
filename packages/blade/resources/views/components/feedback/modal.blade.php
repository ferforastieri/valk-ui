@props([
    'isOpen' => false,
    'title' => '',
    'size' => 'md',
    'showCloseButton' => true,
])

@php
    $sizeClasses = [
        'sm' => 'max-w-md',
        'md' => 'max-w-lg',
        'lg' => 'max-w-2xl',
        'xl' => 'max-w-4xl',
    ];
@endphp

@if($isOpen)
    <div class="fixed inset-0 z-50 overflow-y-auto" x-data="{ open: @js($isOpen) }" x-show="open" @keydown.escape.window="open = false">
        <div class="flex min-h-full items-center justify-center p-4">
            <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity" @click="open = false"></div>
            
            <div class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all w-full {{ $sizeClasses[$size] }}">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                        {{ $title }}
                    </h3>
                    @if($showCloseButton)
                        <button
                            type="button"
                            class="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            @click="open = false"
                        >
                            <span class="sr-only">Fechar</span>
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    @endif
                </div>
                {{ $slot }}
            </div>
        </div>
    </div>
@endif

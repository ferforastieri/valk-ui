@props([
    'label' => null,
    'description' => null,
    'error' => null,
    'id' => null,
    'checked' => false,
])

@php
    $checkboxId = $id ?? ($label ? strtolower(str_replace(' ', '-', $label)) : null);
@endphp

<div class="space-y-2">
    <div class="flex items-start space-x-3">
        <div class="relative flex items-center">
            <input
                type="checkbox"
                id="{{ $checkboxId }}"
                {{ $attributes->merge(['class' => 'sr-only']) }}
                @if($checked) checked @endif
            />
            <div
                class="w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center border-gray-300 bg-white hover:border-blue-600 @if($checked) bg-blue-600 border-blue-600 hover:bg-blue-700 @endif @if($error) border-red-500 @endif dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-600 @if($checked) dark:bg-blue-600 dark:border-blue-600 @endif"
                onclick="document.getElementById('{{ $checkboxId }}').click()"
            >
                @if($checked)
                    <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                @endif
            </div>
        </div>
        @if($label || $description)
            <div class="flex-1 min-w-0">
                @if($label)
                    <label
                        for="{{ $checkboxId }}"
                        class="text-sm font-medium cursor-pointer select-none text-gray-900 dark:text-gray-100 @if($error) text-red-600 dark:text-red-400 @endif"
                    >
                        {{ $label }}
                    </label>
                @endif
                @if($description)
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 @if($error) text-red-500 dark:text-red-400 @endif">
                        {{ $description }}
                    </p>
                @endif
            </div>
        @endif
    </div>
    @if($error)
        <p class="text-sm text-red-600 dark:text-red-400 ml-8">{{ $error }}</p>
    @endif
</div>

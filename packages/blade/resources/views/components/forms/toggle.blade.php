@props([
    'label' => null,
    'description' => null,
    'size' => 'md',
    'id' => null,
    'checked' => false,
    'disabled' => false,
])

@php
    $toggleId = $id ?? ($label ? strtolower(str_replace(' ', '-', $label)) : null);
    $sizes = [
        'sm' => ['container' => 'w-8 h-4', 'thumb' => 'w-3 h-3', 'translate' => 'translate-x-4'],
        'md' => ['container' => 'w-11 h-6', 'thumb' => 'w-5 h-5', 'translate' => 'translate-x-5'],
        'lg' => ['container' => 'w-14 h-7', 'thumb' => 'w-6 h-6', 'translate' => 'translate-x-7'],
    ];
    $sizeClasses = $sizes[$size] ?? $sizes['md'];
@endphp

<div class="flex items-center space-x-3">
    <label
        for="{{ $toggleId }}"
        class="relative inline-flex items-center rounded-full border-2 transition-all duration-200 cursor-pointer {{ $sizeClasses['container'] }} border-gray-300 bg-gray-200 @if($checked) bg-blue-600 border-blue-600 @endif @if($disabled) opacity-50 cursor-not-allowed @endif dark:border-gray-600 dark:bg-gray-700 @if($checked) dark:bg-blue-600 dark:border-blue-600 @endif"
    >
        <input
            type="checkbox"
            id="{{ $toggleId }}"
            class="sr-only"
            {{ $attributes }}
            @if($checked) checked @endif
            @if($disabled) disabled @endif
        />
        <div
            class="absolute bg-white rounded-full shadow-lg transition-transform duration-200 {{ $sizeClasses['thumb'] }} left-0.5 @if($checked) {{ $sizeClasses['translate'] }} @endif"
        />
    </label>

    @if($label || $description)
        <div class="flex-1 min-w-0">
            @if($label)
                <span class="text-sm font-medium cursor-pointer select-none text-gray-900 dark:text-gray-100 @if($disabled) opacity-50 cursor-not-allowed @endif">
                    {{ $label }}
                </span>
            @endif
            @if($description)
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 @if($disabled) opacity-50 @endif">
                    {{ $description }}
                </p>
            @endif
        </div>
    @endif
</div>

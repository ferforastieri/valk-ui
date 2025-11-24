@props([
    'label' => null,
    'error' => null,
    'placeholder' => 'Selecione uma opção',
    'options' => [],
    'value' => null,
    'id' => null,
    'required' => false,
    'disabled' => false,
])

@php
    $selectId = $id ?? ($label ? strtolower(str_replace(' ', '-', $label)) : null);
@endphp

<div class="space-y-2 w-full" x-data="{ 
    isOpen: false, 
    selectedValue: @js($value),
    searchTerm: '',
    options: @js($options)
}">
    @if($label)
        <label
            for="{{ $selectId }}"
            class="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
            {{ $label }}
            @if($required)
                <span class="text-red-500 ml-1">*</span>
            @endif
        </label>
    @endif
    
    <div class="relative w-full">
        <div
            @click="isOpen = !isOpen"
            :class="{
                'ring-2 ring-blue-600 border-transparent': isOpen
            }"
            class="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-600 @if($error) border-red-500 focus:ring-red-500 @endif"
        >
            <div class="flex-1 flex items-center gap-2 min-w-0">
                <span x-show="!selectedValue" class="text-gray-500 dark:text-gray-400">
                    {{ $placeholder }}
                </span>
                <span x-show="selectedValue" x-text="options.find(o => o.value === selectedValue)?.label" class="truncate"></span>
            </div>
            
            <div class="flex items-center gap-1">
                <svg x-show="selectedValue" @click.stop="selectedValue = null; $dispatch('select-change', null)" class="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <svg :class="{ 'rotate-180': isOpen }" class="h-4 w-4 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <div 
            x-show="isOpen"
            @click.away="isOpen = false"
            x-cloak
            class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden"
        >
            <div class="overflow-y-auto pb-3" style="max-height: 220px">
                <template x-for="option in options.filter(o => o.label.toLowerCase().includes(searchTerm.toLowerCase()))" :key="option.value">
                    <div
                        @click="selectedValue = option.value; isOpen = false; $dispatch('select-change', option.value)"
                        :class="{
                            'bg-blue-600/10 text-blue-600': selectedValue === option.value
                        }"
                        class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                    >
                        <span x-text="option.label" class="flex-1"></span>
                        <div x-show="selectedValue === option.value" class="h-2 w-2 bg-blue-600 rounded-full"></div>
                    </div>
                </template>
            </div>
        </div>
    </div>
    
    @if($error)
        <p class="text-sm text-red-600 dark:text-red-400">{{ $error }}</p>
    @endif
</div>


@props([
    'label' => null,
    'error' => null,
    'id' => null,
    'value' => null,
])

@php
    $dateId = $id ?? ($label ? strtolower(str_replace(' ', '-', $label)) : null);
    $displayValue = $value ? \Carbon\Carbon::parse($value)->format('d/m/Y') : '';
@endphp

<div class="space-y-2" x-data="{ 
    isOpen: false, 
    displayValue: @js($displayValue),
    currentMonth: new Date(),
    selectedDate: @js($value)
}">
    @if($label)
        <label
            for="{{ $dateId }}"
            class="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
            {{ $label }}
        </label>
    @endif
    <div class="relative">
        <input
            type="text"
            id="{{ $dateId }}"
            placeholder="dd/mm/aaaa"
            x-model="displayValue"
            class="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-600 transition-all duration-200 hover:border-blue-600/50 dark:hover:border-blue-600/50 @if($error) border-red-500 focus:ring-red-500 @endif"
            {{ $attributes }}
        />
        <button
            type="button"
            @click="isOpen = !isOpen"
            class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
        >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </button>
    </div>
    
    <div 
        x-show="isOpen"
        @click.away="isOpen = false"
        x-cloak
        class="absolute z-50 mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800"
    >
        <div class="p-2">
            <div class="mb-1 grid grid-cols-7 gap-1">
                @foreach(['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as $day)
                    <div class="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                        {{ $day }}
                    </div>
                @endforeach
            </div>
            <div class="grid grid-cols-7 gap-1" x-html="renderCalendar()"></div>
        </div>
    </div>
    
    @if($error)
        <p class="text-sm text-red-600 dark:text-red-400">{{ $error }}</p>
    @endif
</div>


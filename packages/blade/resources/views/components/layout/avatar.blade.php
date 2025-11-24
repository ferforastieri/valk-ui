@props([
    'src' => null,
    'alt' => 'Avatar',
    'fallback' => null,
    'size' => 'md',
    'shape' => 'circle',
])

@php
    $sizes = [
        'sm' => 'h-8 w-8 text-xs',
        'md' => 'h-10 w-10 text-sm',
        'lg' => 'h-12 w-12 text-base',
        'xl' => 'h-16 w-16 text-lg',
    ];
    
    $shapes = [
        'circle' => 'rounded-full',
        'square' => 'rounded-lg',
    ];
    
    $sizeClass = $sizes[$size] ?? $sizes['md'];
    $shapeClass = $shapes[$shape] ?? $shapes['circle'];
    
    $getInitials = function($name) {
        return strtoupper(substr(implode('', array_map(function($word) {
            return substr($word, 0, 1);
        }, explode(' ', $name))), 0, 2));
    };
    
    $initials = $fallback ? $getInitials($fallback) : '?';
@endphp

<div {{ $attributes->merge([
    'class' => 'relative flex items-center justify-center overflow-hidden bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 ' . $sizeClass . ' ' . $shapeClass
]) }}>
    @if($src)
        <img
            src="{{ $src }}"
            alt="{{ $alt }}"
            class="h-full w-full object-cover"
        />
    @else
        <span class="font-medium">
            {{ $initials }}
        </span>
    @endif
</div>

@props([
    'columns' => [],
    'data' => [],
    'loading' => false,
    'emptyText' => 'Nenhum dado encontrado',
    'pageSize' => 10,
    'totalItems' => 0,
    'currentPage' => 1,
    'searchable' => true,
    'searchPlaceholder' => 'Pesquisar...',
])

@php
    $totalPages = ceil($totalItems / $pageSize);
    $startItem = ($currentPage - 1) * $pageSize + 1;
    $endItem = min($currentPage * $pageSize, $totalItems);
    $showEmptyState = !$loading && count($data) === 0;
@endphp

<div {{ $attributes->merge(['class' => 'overflow-hidden rounded-lg border bg-white dark:bg-gray-800 relative']) }}>
    @if($searchable)
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex-1 max-w-md">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="{{ $searchPlaceholder }}"
                        class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-sm text-gray-900 dark:text-gray-100"
                    />
                </div>
            </div>
        </div>
    @endif

    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="border-b bg-blue-600">
                <tr>
                    @foreach($columns as $column)
                        <th class="px-6 py-3 text-left text-xs font-medium text-white select-none">
                            {{ $column['title'] ?? $column }}
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                @if($loading)
                    @for($i = 0; $i < $pageSize; $i++)
                        <tr>
                            @foreach($columns as $column)
                                <td class="px-6 py-4">
                                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </td>
                            @endforeach
                        </tr>
                    @endfor
                @elseif($showEmptyState)
                    <tr>
                        <td colspan="{{ count($columns) }}" class="px-6 py-8 text-center">
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {{ $emptyText }}
                            </p>
                        </td>
                    </tr>
                @else
                    @foreach($data as $row)
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                            @foreach($columns as $column)
                                <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                    {{ $row[$column['key'] ?? $column] ?? '' }}
                                </td>
                            @endforeach
                        </tr>
                    @endforeach
                @endif
            </tbody>
        </table>
    </div>

    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">Mostrar</span>
                <select class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm text-gray-900 dark:text-gray-100">
                    <option value="10">10 por página</option>
                    <option value="25">25 por página</option>
                    <option value="50">50 por página</option>
                    <option value="100">100 por página</option>
                </select>
            </div>
            <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ $startItem }}-{{ $endItem }}, de {{ $totalItems }} registros
            </span>
        </div>

        <div class="flex items-center space-x-2">
            <button class="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" @if($currentPage <= 1) disabled @endif>
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            
            @for($i = max(1, $currentPage - 2); $i <= min($totalPages, $currentPage + 2); $i++)
                <button class="px-3 py-2 text-sm rounded-md border @if($i === $currentPage) border-blue-600 bg-blue-600 text-white @else border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 @endif">
                    {{ $i }}
                </button>
            @endfor
            
            <button class="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" @if($currentPage >= $totalPages) disabled @endif>
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</div>


<?php

namespace ValkUI\Blade;

use Illuminate\Support\ServiceProvider;

class ValkUIBladeServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'valk-ui');
    }

    public function register()
    {
        //
    }
}


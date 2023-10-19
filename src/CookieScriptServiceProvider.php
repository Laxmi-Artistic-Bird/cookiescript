<?php

namespace Artisticbird\Cookiescript;


use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Session;

class CookieScriptServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->publishes([
            __DIR__.'/cookie.php' => resource_path('views/cookies/index.blade.php'),
            __DIR__.'/public' => public_path(),
        ], 'cookiescript');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

    }
}

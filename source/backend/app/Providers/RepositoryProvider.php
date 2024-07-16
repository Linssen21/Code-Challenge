<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $customerRepository = [
            'CustomerRepository',
        ];

        foreach ($customerRepository as $repository) {
            $interface = "App\Contracts\\I{$repository}";
            $implementation = "App\Repository\Mysql\\{$repository}";
            $this->app->bind($interface, $implementation);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('contact', function (Request $request): Limit {
            $email = $request->input('email');
            $sender = is_string($email) ? mb_strtolower(trim($email)) : '';

            return Limit::perHour(5)->by('email:'.hash('sha256', $sender));
        });
    }
}

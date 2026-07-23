<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
        Inertia::share([
            'user' => function () {
                if ($user = Auth::user()) {
                    return [
                        'id' => $user->user_id,
                        'name' => $user->name,
                        'surname' => $user->surname,
                        'patronymic' => $user->patronymic,
                        'birth_date' => $user->birth_date,
                        'phone' => $user->phone,
                        'email' => $user->email,
                        'role' => $user->role->name,
                    ];
                }
                return null;
            },
        ]);
    }
}

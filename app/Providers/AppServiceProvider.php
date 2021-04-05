<?php

namespace App\Providers;

use App\Models\Beneficiary;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Supplier;
use App\Observers\BeneficiaryObserver;
use App\Observers\PermissionObserver;
use App\Observers\RoleObserver;
use App\Observers\SupplierObserver;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        if ($this->app->environment() !== 'local') {
            $this->app['request']->server->set('HTTPS', true);
        }
        Supplier::observe(SupplierObserver::class);
        Permission::observe(PermissionObserver::class);
        Beneficiary::observe(BeneficiaryObserver::class);
        Role::observe(RoleObserver::class);
        Passport::tokensExpireIn(now()->addDays(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));
    }
}

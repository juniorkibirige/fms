<?php

namespace App\Observers;

use App\Models\Role;
use Str;

class RoleObserver
{
    public function saving(Role $supplier)
    {
        $supplier->slug = Str::slug($supplier->name);
    }
    /**
     * Handle the Role "created" event.
     *
     * @param Role $role
     * @return void
     */
    public function created(Role $role)
    {
        //
    }

    /**
     * Handle the Role "updated" event.
     *
     * @param Role $role
     * @return void
     */
    public function updated(Role $role)
    {
        //
    }

    /**
     * Handle the Role "deleted" event.
     *
     * @param Role $role
     * @return void
     */
    public function deleted(Role $role)
    {
        //
    }

    /**
     * Handle the Role "restored" event.
     *
     * @param Role $role
     * @return void
     */
    public function restored(Role $role)
    {
        //
    }

    /**
     * Handle the Role "force deleted" event.
     *
     * @param Role $role
     * @return void
     */
    public function forceDeleted(Role $role)
    {
        //
    }
}

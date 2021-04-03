<?php

namespace App\Observers;

use App\Models\Permission;
use Str;

class PermissionObserver
{
    public function saving(Permission $permission) {
        $permission->slug = Str::slug($permission->name);
    }
    /**
     * Handle the Permission "created" event.
     *
     * @param Permission $permission
     * @return void
     */
    public function created(Permission $permission)
    {
        //
    }

    /**
     * Handle the Permission "updated" event.
     *
     * @param Permission $permission
     * @return void
     */
    public function updated(Permission $permission)
    {
        //
    }

    /**
     * Handle the Permission "deleted" event.
     *
     * @param Permission $permission
     * @return void
     */
    public function deleted(Permission $permission)
    {
        //
    }

    /**
     * Handle the Permission "restored" event.
     *
     * @param Permission $permission
     * @return void
     */
    public function restored(Permission $permission)
    {
        //
    }

    /**
     * Handle the Permission "force deleted" event.
     *
     * @param Permission $permission
     * @return void
     */
    public function forceDeleted(Permission $permission)
    {
        //
    }
}

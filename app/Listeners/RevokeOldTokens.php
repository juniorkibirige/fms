<?php

namespace App\Listeners;

use Carbon\Carbon;
use Laravel\Passport\Client;
use Laravel\Passport\Events\AccessTokenCreated;

class RevokeOldTokens
{
    public function __construct()
    {
        //
    }

    public function handle(AccessTokenCreated $event)
    {
        $client = Client::find($event->clientId);
        // delete this client tokens created before one day ago:
        $client->tokens()->where('created_at', '<', Carbon::now()->subDay())->forceDelete();
    }
}

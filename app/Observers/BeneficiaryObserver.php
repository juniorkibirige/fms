<?php

namespace App\Observers;

use App\Models\Beneficiary;
use Carbon\Carbon;

class BeneficiaryObserver
{
    public function saving(Beneficiary $beneficiary){
        $s = explode('-',explode(' ',$beneficiary->date_of_birth)[0]);
        $a = Carbon::createFromDate($s[0], $s[1], $s[2]);
        $t = explode('-',explode(' ',today())[0]);
        $beneficiary->age = $t[0] - $s[0];
        $beneficiary->is_pwd = $beneficiary->is_pwd === 'true' ? 1 : 0;
    }
    /**
     * Handle the Beneficiary "created" event.
     *
     * @param Beneficiary $beneficiary
     * @return void
     */
    public function created(Beneficiary $beneficiary)
    {
        //
    }

    /**
     * Handle the Beneficiary "updated" event.
     *
     * @param Beneficiary $beneficiary
     * @return void
     */
    public function updated(Beneficiary $beneficiary)
    {
        //
    }

    /**
     * Handle the Beneficiary "deleted" event.
     *
     * @param Beneficiary $beneficiary
     * @return void
     */
    public function deleted(Beneficiary $beneficiary)
    {
        //
    }

    /**
     * Handle the Beneficiary "restored" event.
     *
     * @param Beneficiary $beneficiary
     * @return void
     */
    public function restored(Beneficiary $beneficiary)
    {
        //
    }

    /**
     * Handle the Beneficiary "force deleted" event.
     *
     * @param Beneficiary $beneficiary
     * @return void
     */
    public function forceDeleted(Beneficiary $beneficiary)
    {
        //
    }
}

<?php

namespace App\Observers;

use App\Models\Input;
use App\Models\Office;
use App\Models\Supplier;
use App\Models\SupplierContact;
use App\Models\SupplierContract;
use Str;

class SupplierObserver
{
    public function saving(Supplier $supplier)
    {
        $supplier->slug = Str::slug($supplier->name);
        $inputs = $supplier->inputs;
        $ins = [];
        for ($i=0;$i<count($inputs);$i++){
            $input = $inputs[$i];
            $inputModel = Input::find($input['input_id']);
            $officeModel = Office::find($input['office_id']);
            $input['input_id'] = $inputModel->name;
            $input['office_id'] = $officeModel->name;
            $ins[$i] = $input;
        }
        $supplier->inputs = $ins;
    }

    /**
     * Handle the supplier "created" event.
     *
     * @param Supplier $supplier
     * @return void
     */
    public function created(Supplier $supplier)
    {
        $this->updateData($supplier);
    }

    public function updateData(Supplier $supplier)
    {
        $cID = $supplier->supplier_contacts_id;
        $crID = $supplier->supplier_contracts_id;
        $contact = SupplierContact::find($cID);
        $contract = SupplierContract::find($crID);
        $name = $supplier->name;
    }

    /**
     * Handle the supplier "updated" event.
     *
     * @param Supplier $supplier
     * @return void
     */
    public function updated(Supplier $supplier)
    {
        $this->updateData($supplier);
    }

    /**
     * Handle the supplier "deleted" event.
     *
     * @param Supplier $supplier
     * @return void
     */
    public function deleted(Supplier $supplier)
    {
        //
    }

    /**
     * Handle the supplier "restored" event.
     *
     * @param Supplier $supplier
     * @return void
     */
    public function restored(Supplier $supplier)
    {
        $this->updateData($supplier);
    }

    /**
     * Handle the supplier "force deleted" event.
     *
     * @param Supplier $supplier
     * @return void
     */
    public function forceDeleted(Supplier $supplier)
    {
        //
    }
}

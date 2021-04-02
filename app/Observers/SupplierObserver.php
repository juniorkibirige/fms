<?php

namespace App\Observers;

use App\Models\Input;
use App\Models\Office;
use App\Models\Supplier;
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

    public function saved(Supplier $supplier) {
//        $this->inputPivotUpdateOrCreate($supplier);
    }

    /**
     * Handle the supplier "created" event.
     *
     * @param Supplier $supplier
     * @return void
     */
    public function created(Supplier $supplier)
    {
//        $this->inputPivotUpdateOrCreate($supplier);
    }

    public function inputPivotUpdateOrCreate(Supplier $supplier)
    {
        if(!request()->has('inputs')){
            return;
        }
        $inputs = json_decode(request('inputs'));
        $inputs = collect($inputs);
        if($supplier->inputsRel()->exists()) {
            $supplier->inputsRel()->delete();
        }
        $i = [];
//        foreach ( as $key => $value) {
//            foreach ($value as $k => $v) {
//                if ($k == "inputs") {
////                    $input['input_id'] = [];
//                } else {
//                    if ($k != 'office_id[]')
//                        $input[$value['inputs']][$k] = $v;
//                    else
//                        $input[$value['inputs']]['office_id'] = json_encode($v);
//                }
//            }
//            $input[$value['inputs']]['created_at'] = Carbon::now();
//            $input[$value['inputs']]['updated_at'] = Carbon::now();
//            $item->inputsRel()->sync($input, false);
//        }
        print_r($inputs);
        $inputs->each(function($input) use ($supplier) {

        });
    }

    /**
     * Handle the supplier "updated" event.
     *
     * @param Supplier $supplier
     * @return void
     */
    public function updated(Supplier $supplier)
    {
        //
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
        //
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

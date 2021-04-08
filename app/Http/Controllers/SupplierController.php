<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Models\Constituency;
use App\Models\District;
use App\Models\Parishes;
use App\Models\Region;
use App\Models\Supplier;
use App\Models\SupplierContact;
use App\Models\SupplierContract;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $suppliers = Supplier::get();
        $s = [];
        $i = 0;
        foreach ($suppliers as $supplier) {
            $did = District::find($supplier->district_id)->name;
            $rid = Region::find($supplier->region_id)->name;
            $supplier->district = $did;
            $supplier->region = $rid;
            $phone = SupplierContact::find($supplier->supplier_contacts_id);
            if($phone !== null){
                $supplier->p = $phone;
                $supplier->phone = $phone->phone_number;
            } else {
                $supplier->phone = 'N/A';
            }
            $s[$i++] = $supplier;
        }
        $res = ['suppliers' => $s];
        return \response($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param SupplierRequest $request
     * @return Response
     */
    public function store(SupplierRequest $request): Response
    {
        $supplierData = $request->supplier_data;
        $contactData = $request->contact_data;
        $contactData['name'] = $supplierData['name'].' Contact';
        $contractData = $request->contract_data;
        $contractData['name'] = $supplierData['name'].' Contract';
        $cId = SupplierContact::create($contactData)->id;
        $crId = SupplierContract::create($contractData)->id;
        $supplierData['supplier_contacts_id'] = $cId;
        $supplierData['supplier_contracts_id'] = $crId;
        $s = Supplier::create($supplierData);
        $inputData = $supplierData['inputs'];
        $inputs = [];
        for ($i = 0; $i < count($supplierData['inputs']); $i++) {
            $input = $supplierData['inputs'][$i];
            $input['created_at'] = Carbon::now();
            $input['updated_at'] = Carbon::now();
            $inputs[$i] = $input;
        }
        $s->inputsRel()->sync($inputs, false);
        $res = ['supplier' => $s];
        return \response($res, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}

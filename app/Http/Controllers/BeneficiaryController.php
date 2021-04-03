<?php

namespace App\Http\Controllers;

use App\Http\Requests\BeneficiaryRequest;
use App\Models\Beneficiary;
use App\Models\Constituency;
use App\Models\District;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BeneficiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $beneficiaries = Beneficiary::get();
        $b = [];
        $i = 0;
        foreach ($beneficiaries as $beneficiary){
            $did = District::find($beneficiary->district_id)->name;
            $rid = Constituency::find($beneficiary->county_id)->name;
            $beneficiary->district = $did;
            $beneficiary->county = $rid;
            $b[$i++] = $beneficiary;
        }
        $res = ['beneficiaries' => $b];
        return \response($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BeneficiaryRequest $request
     * @return Response
     */
    public function store(BeneficiaryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
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
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}

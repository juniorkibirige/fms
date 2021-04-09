<?php

namespace App\Http\Controllers;

use App\Http\Requests\DistributionRequest;
use App\Models\Beneficiary;
use App\Models\Distribution;
use App\Models\Office;
use Illuminate\Http\Response;

class DistributionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $distributions = Distribution::get();
        $dis = [];
        $i = 0;
        foreach ($distributions as $distribution) {
            $distribution->office = Office::find($distribution->id)->name;
            $distribution->beneficiary = Beneficiary::find($distribution->beneficiary_id)->name;
            $dis[$i++] = $distribution;
        }

        $res = ['distributions' => $dis];

        return \response($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param DistributionRequest $request
     * @return Response
     */
    public function store(DistributionRequest $request): Response
    {
        $res[] = $request->all();
        return \response($res, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(int $id): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param DistributionRequest $request
     * @param int $id
     * @return Response
     */
    public function update(DistributionRequest $request, int $id): Response
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(int $id): Response
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\DistributionRequest;
use App\Models\Beneficiary;
use App\Models\Distribution;
use App\Models\Input;
use App\Models\Office;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

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
            $distribution->date_of_distribution = explode(' ', $distribution->distributed_on)[0];
            $distribution->supplier = Supplier::find($distribution->delivered_by)->name;
            $inputs = DB::table('distribution_input')
                ->where(['distribution_id' => $distribution->id])
                ->get(['input_id', 'quantity']);
            $is = [];
            $it = 0;
            foreach ($inputs as $input) {
                $input->name = Input::find($input->input_id)->name;
                $is[$it++] = '('.$input->name.', '.$input->quantity.'),';
            }
            $distribution->inputs = $is;
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
        $res = [];
        $d = $request['distribution_data'];
        $ins = $request['inputs.inputs'];
        $inputs = [];
        $dist = Distribution::create($d);
        for ($i = 0; $i < count($ins); $i++) {
            $input = $ins[$i];
            $input['distribution_id'] = $dist->id;
            $inputs[$i] = $input;
        }
        $dist->inputs()->sync($inputs, false);
        $res = ['distribution'=>$dist, 'inputs'=>$dist->inputs()];
        return \response($res, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
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
     * @param int $id
     * @return Response
     */
    public function destroy(int $id): Response
    {
        //
    }
}

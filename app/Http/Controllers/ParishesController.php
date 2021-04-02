<?php

namespace App\Http\Controllers;

use App\Models\Parishes;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ParishesController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param int $rid
     * @param int $did
     * @param int $cid
     * @return Response
     */
    public function show(int $rid, int $did, int $cid): Response
    {
        $regions = Parishes::query()->where(['region_id'=> $rid,'district_id'=> $did,'county_id'=> $cid])->get(['id', 'name', 'slug']);
        return \response(json_encode($regions), 200);

    }
}

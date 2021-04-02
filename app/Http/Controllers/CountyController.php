<?php

namespace App\Http\Controllers;

use App\Models\Constituency;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CountyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param int $rid
     * @param int $did
     * @return Response
     */
    public function show(int $rid, int $did): Response
    {
        $regions = Constituency::query()->where(['region_id'=> $rid,'district_id'=> $did])->get(['id', 'name', 'slug']);
        return \response(json_encode($regions), 200);
    }
}

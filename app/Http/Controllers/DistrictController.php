<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

class DistrictController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Application|ResponseFactory|Response
     */
    public function show(int $id)
    {
        $regions = District::query()->where(['region_id' => $id])->get(['id', 'name', 'slug']);
        return \response(json_encode($regions), 200);

    }
}

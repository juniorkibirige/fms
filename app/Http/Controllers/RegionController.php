<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Response;

class RegionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $regions = Region::query()->get(['id', 'name', 'slug']);
        return \response(json_encode($regions), 200);
    }
}

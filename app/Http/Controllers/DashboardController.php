<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\Distribution;
use App\Models\Input;
use App\Models\Supplier;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Returns counters for required data
     * @return JsonResponse
     */
    public function counters(): JsonResponse
    {
        $ben = count(Beneficiary::get());
        $sup = count(Supplier::get());
        $inps = count(Input::get());
        $dist = count(Distribution::get());
        return response()->json([
            'beneficiaries' => $ben,
            'suppliers' => $sup,
            'inputs' => $inps,
            'distributions' => $dist,
        ]);
    }
}

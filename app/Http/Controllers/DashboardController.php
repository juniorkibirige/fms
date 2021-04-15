<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\Constituency;
use App\Models\Distribution;
use App\Models\District;
use App\Models\Input;
use App\Models\Parishes;
use App\Models\Region;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use function response;

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

    /**
     * Returns data to be fed into a pie chart for gender
     * @return JsonResponse
     */
    public function byGender(): JsonResponse
    {
        $beneficiaries = [
            'Male' => 0,
            'Female' => 0,
        ];
        $bens = Beneficiary::get();

        foreach ($bens as $ben) {
            if ($ben->gender === 'female') {
                $beneficiaries['Female']++;
            } else if ($ben->gender === 'male') {
                $beneficiaries['Male']++;
            } else {
                $beneficiaries['Other']++;
            }
        }


        return response()->json([
            'beneficiaries' => $beneficiaries
        ]);

    }

    /**
     * Returns data to be fed into a bar chart for distributions
     * @return JsonResponse
     */
    public function byMonth(): JsonResponse
    {
        $chartData = [];
        $data = [];
        $d = Distribution::orderBy('created_at', 'desc')
            ->get();
        $index = 0;
        foreach ($d as $dat) {
            $inps = DB::table('distribution_input')
                ->where(['distribution_id' => $dat->id])
                ->get(['input_id', 'quantity']);
            $is = [];
            $it = 0;
            foreach ($inps as $input) {
                $input->name = Input::find($input->input_id)->name;
                $is[$it++] = $input;
            }
            $dat->inputs = $is;
            $dat->beneficiary = Beneficiary::find($dat->beneficiary_id);
            $dat->beneficiary->region = Region::find($dat->beneficiary->region_id)->name;
            $dat->beneficiary->district = District::find($dat->beneficiary->district_id)->name;
            $dat->beneficiary->county = Constituency::find($dat->beneficiary->county_id)->name;
            $dat->beneficiary->parish = Parishes::find($dat->beneficiary->parish_id)->name;
            $data[$index++] = $dat;
        }
        $month = explode('-', date('d-m-Y'))[1];
        $day = explode('-', date('d-m-Y'))[0];
        $week = [];
        $dMonth = [
            01 => 31, 28, 31, 30, 31, 30,
            07 => 31, 31, 30, 31, 30, 31
        ];
        $monday = Carbon::now()->startOfWeek();
        for ($it = 1, $cday = $monday; $it < 8; $it++) {
            $week[$it] = explode('-', explode('T', json_encode($cday))[0])[2];
            $cday = $cday->copy()->addDay();
        }
        $pM = 0;
        $pD = 0;
        $pW = 0;
        $result = [];
        $prev = '';
        $sort = [];
        $m = 0;
        $f = 0;
        $all = 0;
        $ag = 0;
        for ($it = 0; $it <= $dMonth[intval($month)]; $it++) {
            if ($it == 0) {
                $sort['None'][$it] = 0;
            } else {
                $sort['None'][$it] = null;
            }
        }
        $uuid = 0;
        $offenceTypeCount = [];
        foreach ($data as $formData) { // Getting perMonthPerDay for Graph by
            if (isset($sort['None']))
                $sort = [];
            if (!isset($sort[$formData->beneficiary->district])) {
                $sort[$formData->beneficiary->district] = null;
                for ($it = 0; $it <= $dMonth[intval($month)]; $it++) {
                    if ($it == 0) {
                        $sort[$formData->beneficiary->district][$it] = 0;
                    } else {
                        $sort[$formData->beneficiary->district][$it] = null;
                    }
                }
            }
//            echo count($sort);
            $ret['id'] = $formData->id;
            $ret['refNo'] = $formData->refNo;
            $ret['victimName'] = $formData->fName . " " . $formData->mName;
            $ret['district'] = $formData->beneficiary->district;
            $ret['nin'] = $formData->nin;
            $ret['contact'] = $formData->pref_mode === 'email' ? $formData->email : $formData->tel;
            $ret['incidentType'] = $formData->incidentType;
            $ret['done'] = $formData->done;
            $ret['open'] = $formData->open;
            $ret['underInv'] = $formData->underInv;
            array_push($result, (object)$ret);
            $uuid = $uuid + 1;
            try {
                $offenceTypeCount[$formData->incidentType]++;
            } catch (\Throwable $th) {
                $offenceTypeCount[$formData->incidentType] = 1;
            }
            $date = explode(' ', $formData->created_at)[0];
            $cm = explode('-', $date)[1];
            $cd = explode('-', $date)[2];
            if ($cm == $month) {
                if (($prev === '') || ($prev !== $formData->beneficiary->district)) {
                    $prev = $formData->beneficiary->district;
                    for ($it = 1; $it <= $dMonth[intval($month)]; $it++) {
                        if ($sort[$prev][$it] == NULL) {
                            $sort[$prev][$it] = 0;
                        }
                        if (intval($cd) == $it) {
                            $sort[$prev][$it] = $sort[$prev][$it] + 1;
                            break;
                        }
                    }
                } else {
                    for ($i = 1; $i <= $dMonth[intval($month)]; $i++) {
                        if ($sort[$prev][$i] == NULL) {
                            $sort[$prev][$i] = 0;
                        }
                        if (intval($cd) == $i) {
                            $sort[$prev][$i] = $sort[$prev][$i] + 1;
                            break;
                        }
                    }
                }
            }
        }

        return response()->json([
            'distributions' => $sort
        ]);

    }
}

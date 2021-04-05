<?php

namespace App\Http\Controllers;

use App\Http\Requests\BeneficiaryRequest;
use App\Models\Beneficiary;
use App\Models\Constituency;
use App\Models\District;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;

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
        foreach ($beneficiaries as $beneficiary) {
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
     * @return Application|RedirectResponse|Response|Redirector
     */
    public function store(BeneficiaryRequest $request)
    {
        $fileLocation = '';
        $ben = [];
        if ($request->hasFile('profile_pic') &&
            $request->file('profile_pic')->isValid() &&
            in_array($request->file('profile_pic')->guessExtension(), ["jpg", "jpeg", "png"])) {
            $fileLocation = $request->file('profile_pic')->store('public/profile_images');
//            $fileLocation = cloudinary()->upload($request->file('profile_pic')->getRealPath())->getSecurePath();
//            echo $fileLocation;
        }
        $ben = $request->all();
        $ben['profile_pic'] = $fileLocation;
        $b = Beneficiary::create($ben);
        $res = ['beneficiary' => $b];
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

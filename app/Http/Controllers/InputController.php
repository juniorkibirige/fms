<?php

namespace App\Http\Controllers;

use App\Http\Requests\InputRequest;
use App\Models\Input;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InputController extends Controller
{
    public function edit(int $id)
    {
    }

    public function create()
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $inputs = Input::query()
            ->where(['deleted_at' => null])
            ->get(['id', 'name', 'type', 'description', 'extras', 'office_id']);
        $b = [];
        $i = 0;
        foreach ($inputs as $beneficiary) {
            $did = Office::find($beneficiary->office_id)->name;
            $beneficiary->office = $did;
            $b[$i++] = $beneficiary;
        }
        $res = ['inputs' => $b];
        return \response($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param InputRequest $request
     * @return Response
     */
    public function store(InputRequest $request): Response
    {
        $b = Input::create($request->all());
        $res = ['input' => $b];
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

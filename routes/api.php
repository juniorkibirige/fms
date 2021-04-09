<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
// Auth::routes();
Route::get('parishes/{rid}/{did}/{cid}', 'ParishesController@show');
Route::get('districts/{rid}', 'DistrictController@show');
Route::resource('regions', 'RegionController')->except([
    'create', 'edit', 'store', 'destroy', 'show', 'update'
]);
Route::get('counties/{rid}/{did}', 'CountyController@show');
Route::resource('offices', 'OfficesController')->except([
    'edit', 'create'
]);
Route::post('login', ['as'=>'login', 'uses' => 'Auth\AuthController@login'])->name('login.api');
 Route::post('/register', 'Auth\AuthController@register')->name('register.api');
Route::post('/logout', 'Auth\AuthController@logout')->name('logout.api');
Route::group(['middleware' => ['auth:api', 'cors', 'json.response']], function () {
    Route::resource('supplier', 'SupplierController')->except([
        'edit', 'create'
    ]);
    Route::resource('input', 'InputController');
    Route::resource('beneficiary', 'BeneficiaryController')->except([
        'edit', 'create'
    ]);
    Route::resource('distributions', 'DistributionController')->except([
        'edit', 'create'
    ]);
});

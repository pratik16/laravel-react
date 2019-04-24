<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/docs', function (Request $request) {
    $data = file_get_contents('dummy/data.json');

    return response()->json([
        'status' => '200',
        'data' => $data
    ], 200);
});


Route::post('/docs', function (Request $request) {
    $data = file_get_contents('dummy/data.json');

    return response()->json([
        'status' => '200',
        'data' => $data
    ], 200);
});

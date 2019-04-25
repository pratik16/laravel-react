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
    $a = json_decode($data, true);
    $b = end($a);
    $id = $b['id']+1;

    $name = $request->file('docfile')->hashName();
    $arr = array(
        'id' => $id,
        'title' => "Document #" . $id,
        'description' => "Me, Dustin",
        'image' => $name,
        'class' => ''
    );

    $a[] = $arr;
    $json = json_encode($a);

    file_put_contents('dummy/data.json', $json);
    Storage::disk('local')->put('./', $request->file('docfile'));
    return response()->json([
        'status' => '200',
        'data' => $data
    ], 200);
});

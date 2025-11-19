<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Middleware\ValidateJwtToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function () { return ['msg' => 'ok']; });

// Tus rutas protegidas
Route::middleware([ValidateJwtToken::class])->group(function () {
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('orders', OrderController::class);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
});

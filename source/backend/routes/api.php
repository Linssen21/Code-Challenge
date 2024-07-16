<?php

use App\Http\Controllers\Api\CustomerController;
use Illuminate\Support\Facades\Route;

Route::prefix('v2')->group(function () {
    Route::prefix('customer')->group(function () {
        Route::post('/register', [CustomerController::class, 'register']);
        Route::post('/update', [CustomerController::class, 'update']);
        Route::post('/delete', [CustomerController::class, 'delete']);
        Route::get('/list', [CustomerController::class, 'list']);
        Route::get('/profile/{id}', [CustomerController::class, 'profile']);
    });
});

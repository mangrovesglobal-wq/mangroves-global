<?php

use App\Http\Controllers\Api\QuoteRequestApiController;
use Illuminate\Support\Facades\Route;

Route::post('/quote-requests', [QuoteRequestApiController::class, 'store'])
    ->middleware('throttle:10,1');

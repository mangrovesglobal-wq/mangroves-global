<?php

use App\Http\Controllers\Api\QuoteRequestApiController;
use App\Http\Controllers\Api\BlogPostApiController;
use App\Http\Controllers\Api\ServiceApiController;
use Illuminate\Support\Facades\Route;

Route::post('/quote-requests', [QuoteRequestApiController::class, 'store'])
    ->middleware('throttle:10,1');

Route::get('/blog-posts', [BlogPostApiController::class, 'index']);
Route::get('/blog-posts/{division}/{slug}', [BlogPostApiController::class, 'show']);

Route::get('/services', [ServiceApiController::class, 'index']);
Route::get('/services/{division}/{slug}', [ServiceApiController::class, 'show']);

<?php

use App\Http\Controllers\Api\QuoteRequestApiController;
use App\Http\Controllers\Api\BlogPostApiController;
use App\Http\Controllers\Api\ServiceApiController;
use App\Http\Controllers\Api\PortfolioProjectApiController;
use App\Http\Controllers\Api\SupplierPartnershipApiController;
use App\Http\Controllers\Api\SiteSettingApiController;
use App\Http\Controllers\Api\NavItemApiController;
use App\Http\Controllers\Api\PageSectionApiController;
use App\Http\Controllers\Api\PageSeoApiController;
use Illuminate\Support\Facades\Route;

Route::post('/quote-requests', [QuoteRequestApiController::class, 'store'])
    ->middleware('throttle:10,1');

Route::post('/supplier-partnership', [SupplierPartnershipApiController::class, 'store'])
    ->middleware('throttle:10,1');

Route::get('/blog-posts', [BlogPostApiController::class, 'index']);
Route::get('/blog-posts/{division}/{slug}', [BlogPostApiController::class, 'show']);

Route::get('/services', [ServiceApiController::class, 'index']);
Route::get('/services/{division}/{slug}', [ServiceApiController::class, 'show']);
Route::get('/portfolio-projects', [PortfolioProjectApiController::class, 'index']);

Route::get('/settings', [SiteSettingApiController::class, 'index']);
Route::get('/seo-integrations', [SiteSettingApiController::class, 'seoIntegrations']);
Route::get('/navigation', [NavItemApiController::class, 'index']);
Route::get('/pages/{pageKey}', [PageSectionApiController::class, 'show']);
Route::get('/seo/{pageKey}', [PageSeoApiController::class, 'show']);

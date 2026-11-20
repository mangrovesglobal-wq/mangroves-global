<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuoteRequestController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PortfolioProjectController;
use App\Http\Controllers\SupplierPartnershipController;
use App\Http\Controllers\SiteSettingController;
use App\Http\Controllers\NavItemController;
use App\Http\Controllers\PageContentController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\AiController;
use App\Http\Controllers\MediaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// TEMPORARY — delete after use
Route::get('/setup-admin', function () {
    \App\Models\User::where('email', 'mangrovesglobal@gmail.com')->delete();
    \App\Models\User::create([
        'name' => 'Admin',
        'email' => 'mangrovesglobal@gmail.com',
        'password' => bcrypt('MGTenak@2026'),
        'email_verified_at' => now(),
    ]);
    return 'Admin user created successfully. Delete this route now.';
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/quote-requests', [QuoteRequestController::class, 'index'])->name('quote-requests.index');
    Route::get('/quote-requests/{quoteRequest}', [QuoteRequestController::class, 'show'])->name('quote-requests.show');
    Route::patch('/quote-requests/{quoteRequest}', [QuoteRequestController::class, 'updateStatus'])->name('quote-requests.update-status');

    Route::resource('blog-posts', BlogPostController::class)->except(['show']);
    Route::resource('services', ServiceController::class)->except(['show']);
    Route::resource('portfolio', PortfolioProjectController::class)->except(['show']);

    Route::get('/supplier-partnership', [SupplierPartnershipController::class, 'index'])->name('supplier-partnership.index');
    Route::get('/supplier-partnership/{supplierPartnership}', [SupplierPartnershipController::class, 'show'])->name('supplier-partnership.show');
    Route::patch('/supplier-partnership/{supplierPartnership}', [SupplierPartnershipController::class, 'updateStatus'])->name('supplier-partnership.update-status');

    // Site Settings
    Route::get('/site-settings', [SiteSettingController::class, 'index'])->name('site-settings.index');
    Route::put('/site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');

    // Navigation
    Route::get('/navigation', [NavItemController::class, 'index'])->name('navigation.index');
    Route::post('/navigation', [NavItemController::class, 'store'])->name('navigation.store');
    Route::patch('/navigation/{navItem}', [NavItemController::class, 'update'])->name('navigation.update');
    Route::delete('/navigation/{navItem}', [NavItemController::class, 'destroy'])->name('navigation.destroy');
    Route::post('/navigation/reorder', [NavItemController::class, 'reorder'])->name('navigation.reorder');

    // Page Content
    Route::get('/page-contents', [PageContentController::class, 'index'])->name('page-contents.index');
    Route::get('/page-contents/{pageKey}', [PageContentController::class, 'show'])->name('page-contents.show');
    Route::put('/page-contents/{pageKey}', [PageContentController::class, 'update'])->name('page-contents.update');

    // SEO
    Route::get('/seo', [SeoController::class, 'overview'])->name('seo.overview');
    Route::get('/seo/pages/{pageKey}/edit', [SeoController::class, 'edit'])->name('seo.edit');
    Route::put('/seo/pages/{pageKey}', [SeoController::class, 'update'])->name('seo.update');

    // SEO Integrations
    Route::get('/seo/integrations', [SeoController::class, 'integrations'])->name('seo.integrations');
    Route::put('/seo/integrations', [SeoController::class, 'integrationsUpdate'])->name('seo.integrations.update');

    // Media Library
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::post('/media/scan', [MediaController::class, 'scan'])->name('media.scan');
    Route::patch('/media/{media}', [MediaController::class, 'update'])->name('media.update');
    Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');

    // AI Assistant
    Route::post('/ai/chat', [AiController::class, 'chat'])->name('ai.chat');

    // Redirects (under SEO)
    Route::get('/seo/redirects', [SeoController::class, 'redirects'])->name('seo.redirects');
    Route::post('/seo/redirects', [SeoController::class, 'redirectStore'])->name('seo.redirects.store');
    Route::patch('/seo/redirects/{redirect}', [SeoController::class, 'redirectUpdate'])->name('seo.redirects.update');
    Route::delete('/seo/redirects/{redirect}', [SeoController::class, 'redirectDestroy'])->name('seo.redirects.destroy');
});

require __DIR__.'/auth.php';

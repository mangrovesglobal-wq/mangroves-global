<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuoteRequestController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
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
});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\Master\ClientController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    // Platform
    Route::group(['prefix' => 'platform'], function () {
        require __DIR__.'/platform.php';
    });
    Route::get('clients', [ClientController::class, 'index'])->name('clients.index');


    // API
    Route::group(['prefix' => 'api'], function () {
        require __DIR__.'/api.php';
    });
});

require __DIR__.'/settings.php';

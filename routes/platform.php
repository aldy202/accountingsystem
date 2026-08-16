<?php

use App\Http\Controllers\Platform\AccountspayableController;
use App\Http\Controllers\Platform\ClientinvoiceController;
use App\Http\Controllers\Platform\DashboardController;
use App\Http\Controllers\Platform\GeneralledgerController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;

// dashboard
Route::group(['prefix' => 'dashboard'], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');
});

// accountspayable
Route::group(['prefix' => 'accountspayable'], function () {
    Route::get('/', [AccountspayableController::class, 'index'])->name('accountspayable.index');
});

// client invoices
Route::group(['prefix' => 'clientinvoices'], function () {
    Route::get('/', [ClientinvoiceController::class, 'index'])->name('clientinvoices.index');
});

// General Ledger
Route::prefix('generalledger')->group(function () {
    Route::get('/', [GeneralledgerController::class, 'index'])->name('generalledger.index');
});

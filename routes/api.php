<?php

use App\Http\Controllers\Api\Platform\AccountsPayableController;
use App\Http\Controllers\Api\Platform\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->group(function () {
    Route::get('stats', [DashboardController::class, 'stats']);
    Route::get('monthly-profitability', [DashboardController::class, 'monthlyProfitability']);
    Route::get('top-spending-projects', [DashboardController::class, 'topSpendingProjects']);
});

Route::prefix('accounts-payable')->group(function () {
    Route::get('bills', [AccountsPayableController::class, 'bills']);
});

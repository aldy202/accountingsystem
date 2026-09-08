<?php

use App\Http\Controllers\Api\Platform\AccountsPayableController;
use App\Http\Controllers\Api\Platform\ClientInvoiceController;
use App\Http\Controllers\Api\Platform\DashboardController;
use App\Http\Controllers\Api\Platform\GeneralLedgerController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->group(function () {
    Route::get('stats', [DashboardController::class, 'stats']);
    Route::get('monthly-profitability', [DashboardController::class, 'monthlyProfitability']);
    Route::get('top-spending-projects', [DashboardController::class, 'topSpendingProjects']);
});

Route::prefix('accounts-payable')->group(function () {
    Route::get('bills', [AccountsPayableController::class, 'bills']);
    Route::get('bills/{id}', [AccountsPayableController::class, 'show']);
});

Route::prefix('client-invoices')->group(function () {
    Route::get('/', [ClientInvoiceController::class, 'index']);
});

Route::prefix('general-ledger')->group(function () {
    Route::get('/', [GeneralLedgerController::class, 'index']);
    Route::get('/{id}', [GeneralLedgerController::class, 'show']);
});

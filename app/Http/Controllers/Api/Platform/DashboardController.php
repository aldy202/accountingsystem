<?php

namespace App\Http\Controllers\Api\Platform;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        // TODO: ganti dengan query asli setelah skema database final
        return response()->json([
            'cashPosition' => -1297507226,
            'outstandingAp' => 465085969,
            'outstandingAr' => 0,
            'revenueMom' => 0,
            'expenseMom' => 0,
        ]);
    }

    public function monthlyProfitability(): JsonResponse
    {
        // TODO: ganti dengan query asli, groupBy bulan dari tabel transaksi
        return response()->json([
            ['period' => 'March 2026', 'revenue' => 0, 'expense' => 0, 'netProfit' => 0],
            ['period' => 'April 2026', 'revenue' => 0, 'expense' => 0, 'netProfit' => 0],
            ['period' => 'May 2026', 'revenue' => 0, 'expense' => 0, 'netProfit' => 0],
            ['period' => 'June 2026', 'revenue' => 0, 'expense' => 0, 'netProfit' => 0],
            ['period' => 'July 2026', 'revenue' => 0, 'expense' => 1738001641, 'netProfit' => -1738001641],
            ['period' => 'August 2026', 'revenue' => 0, 'expense' => 0, 'netProfit' => 0],
        ]);
    }

    public function topSpendingProjects(): JsonResponse
    {
        // TODO: ganti dengan query asli dari tabel project_expenses atau serupa
        return response()->json([]);
    }
}

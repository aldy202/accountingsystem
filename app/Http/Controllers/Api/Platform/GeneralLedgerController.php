<?php

namespace App\Http\Controllers\Api\Platform;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class GeneralLedgerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $allLedger = $this->dummyLedger();

        $status = $request->query('status');
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        $filtered = $allLedger
            ->when(filled($status) && $status !== 'all', function (Collection $ledgers) use ($status) {
                return $ledgers->where('status', $status);
            })
            ->when(filled($startDate), function (Collection $ledgers) use ($startDate) {
                return $ledgers->filter(fn ($ledger) => $ledger['date'] >= $startDate);
            })
            ->when(filled($endDate), function (Collection $ledgers) use ($endDate) {
                return $ledgers->filter(fn ($ledger) => $ledger['date'] <= $endDate);
            })
            ->values();

        $perPage = 5;
        $page = max((int) $request->query('page', 1), 1);
        $totalCount = $filtered->count();
        $pageCount = max((int) ceil($totalCount / $perPage), 1);

        $paged = $filtered->forPage($page, $perPage)->values();

        return response()->json([
            'data' => $paged,
            'currentPage' => $page,
            'pageCount' => $pageCount,
            'totalCount' => $totalCount,
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $ledger = $this->dummyLedger()->firstWhere('id', $id);

        if (! $ledger) {
            return response()->json(['message' => 'Not found'], 404);
        }

        // TODO: ganti dengan query asli setelah model Journal/JournalLine dibuat
        return response()->json([
            ...$ledger,
            'subtitle' => 'Expense AP #813 (Q2_Koko Krunch_Campaign_MAY_2026)',
            'sourceReference' => 'account_payable_expense #813',
            'lines' => [
                [
                    'id' => '1',
                    'accountCode' => '5100 - Beban Operasional',
                    'description' => 'Q2_Koko Krunch_Campaign_MAY_2026',
                    'tag' => null,
                    'debit' => $ledger['total'],
                    'credit' => 0,
                ],
                [
                    'id' => '2',
                    'accountCode' => '2100 - Hutang Usaha',
                    'description' => 'Hutang Q2_Koko Krunch_Campaign_MAY_2026',
                    'tag' => null,
                    'debit' => 0,
                    'credit' => $ledger['total'],
                ],
            ],
        ]);
    }

    private function dummyLedger(): Collection
    {
        return collect([
            [
                'id' => '1',
                'noJurnal' => 'JV-202607-00692',
                'date' => '2026-07-31',
                'description' => 'Pembayaran Hutang',
                'sumber' => 'AP Expense',
                'total' => 21500000,
                'status' => 'POSTED',
            ],
            [
                'id' => '2',
                'noJurnal' => 'JV-202607-00691',
                'date' => '2026-07-30',
                'description' => 'Pembelian Perlengkapan Kantor',
                'sumber' => 'AP Invoice',
                'total' => 4200000,
                'status' => 'POSTED',
            ],
            [
                'id' => '3',
                'noJurnal' => 'JV-202607-00690',
                'date' => '2026-07-30',
                'description' => 'Pembayaran Biaya Operasional',
                'sumber' => 'AP Expense',
                'total' => 2605000,
                'status' => 'POSTED',
            ],
            [
                'id' => '4',
                'noJurnal' => 'JV-202607-00689',
                'date' => '2026-07-29',
                'description' => 'Penerimaan Pembayaran Customer',
                'sumber' => 'AR Payment',
                'total' => 15750000,
                'status' => 'POSTED',
            ],
            [
                'id' => '5',
                'noJurnal' => 'JV-202607-00688',
                'date' => '2026-07-28',
                'description' => 'Pembayaran Gaji Karyawan',
                'sumber' => 'Payroll',
                'total' => 85000000,
                'status' => 'POSTED',
            ],
            [
                'id' => '6',
                'noJurnal' => 'JV-202607-00687',
                'date' => '2026-07-27',
                'description' => 'Pembayaran Sewa Gedung',
                'sumber' => 'AP Expense',
                'total' => 30000000,
                'status' => 'POSTED',
            ],
            [
                'id' => '7',
                'noJurnal' => 'JV-202607-00686',
                'date' => '2026-07-25',
                'description' => 'Pembelian Peralatan Komputer',
                'sumber' => 'AP Invoice',
                'total' => 12300000,
                'status' => 'DRAFT',
            ],
            [
                'id' => '8',
                'noJurnal' => 'JV-202607-00685',
                'date' => '2026-07-24',
                'description' => 'Penerimaan Pendapatan Jasa',
                'sumber' => 'AR Payment',
                'total' => 9800000,
                'status' => 'POSTED',
            ],
            [
                'id' => '9',
                'noJurnal' => 'JV-202607-00684',
                'date' => '2026-07-23',
                'description' => 'Pembayaran Tagihan Internet',
                'sumber' => 'AP Expense',
                'total' => 1250000,
                'status' => 'POSTED',
            ],
            [
                'id' => '10',
                'noJurnal' => 'JV-202607-00683',
                'date' => '2026-07-22',
                'description' => 'Pembayaran Listrik dan Air',
                'sumber' => 'AP Expense',
                'total' => 3400000,
                'status' => 'POSTED',
            ],
            [
                'id' => '11',
                'noJurnal' => 'JV-202607-00682',
                'date' => '2026-07-21',
                'description' => 'Pembelian ATK',
                'sumber' => 'AP Invoice',
                'total' => 750000,
                'status' => 'DRAFT',
            ],
            [
                'id' => '12',
                'noJurnal' => 'JV-202607-00681',
                'date' => '2026-07-20',
                'description' => 'Pembayaran Biaya Transportasi',
                'sumber' => 'AP Expense',
                'total' => 2100000,
                'status' => 'POSTED',
            ],
            [
                'id' => '13',
                'noJurnal' => 'JV-202607-00680',
                'date' => '2026-07-18',
                'description' => 'Penerimaan Pelunasan Piutang',
                'sumber' => 'AR Payment',
                'total' => 18900000,
                'status' => 'POSTED',
            ],
            [
                'id' => '14',
                'noJurnal' => 'JV-202607-00679',
                'date' => '2026-07-17',
                'description' => 'Pembayaran Jasa Konsultan',
                'sumber' => 'AP Expense',
                'total' => 6500000,
                'status' => 'VOID',
            ],
            [
                'id' => '15',
                'noJurnal' => 'JV-202607-00678',
                'date' => '2026-07-15',
                'description' => 'Pembelian Software dan Lisensi',
                'sumber' => 'AP Invoice',
                'total' => 4750000,
                'status' => 'POSTED',
            ],
        ]);
    }
}

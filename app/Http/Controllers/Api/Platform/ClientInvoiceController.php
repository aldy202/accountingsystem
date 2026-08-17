<?php

namespace App\Http\Controllers\Api\Platform;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ClientInvoiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $allInvoices = $this->dummyInvoices();

        $search = $request->query('search');
        $status = $request->query('status');
        $outstandingOnly = $request->boolean('outstandingOnly');
        $dueOnly = $request->boolean('dueOnly');

        $filtered = $allInvoices
            ->when(filled($search), function (Collection $invoices) use ($search) {
                $needle = strtolower($search);

                return $invoices->filter(
                    fn($invoice) => str_contains(strtolower($invoice['clientName']), $needle)
                        || str_contains(strtolower($invoice['id']), $needle)
                );
            })
            ->when(filled($status) && $status !== 'all', function (Collection $invoices) use ($status) {
                return $invoices->where('status', $status);
            })
            ->when($outstandingOnly, function (Collection $invoices) {
                return $invoices->where('outstanding', '>', 0);
            })
            ->when($dueOnly, function (Collection $invoices) {
                $today = now()->toDateString();

                return $invoices->filter(fn($invoice) => $invoice['dueDate'] < $today && $invoice['outstanding'] > 0);
            })
            ->values();

        $perPage = 10;
        $page = max((int) $request->integer('page', 1), 1);
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

    private function dummyInvoices(): Collection
    {
        // TODO: ganti dengan query asli setelah model ClientInvoice final
        return collect([
            [
                'id' => 'INV-001',
                'clientName' => 'Tech Solutions',
                'projectName' => 'Cloud Migration',
                'dueDate' => '2026-08-15',
                'amount' => 10000000,
                'ppn' => 1100000,
                'total' => 11100000,
                'outstanding' => 0,
                'status' => 'paid',
            ],
            [
                'id' => 'INV-002',
                'clientName' => 'Creative Agency',
                'projectName' => 'Brand Identity',
                'dueDate' => '2026-08-20',
                'amount' => 5000000,
                'ppn' => 550000,
                'total' => 5550000,
                'outstanding' => 5550000,
                'status' => 'unpaid',
            ],
        ]);
    }
}

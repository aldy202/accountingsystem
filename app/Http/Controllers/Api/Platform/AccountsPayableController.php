<?php

namespace App\Http\Controllers\Api\Platform;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class AccountsPayableController extends Controller
{
    public function bills(Request $request): JsonResponse
    {
        $allBills = $this->dummyBills();

        $filtered = $allBills
            ->when($request->filled('search'), function (Collection $bills) use ($request) {
                $search = strtolower($request->string('search'));

                return $bills->filter(
                    fn ($bill) => str_contains(strtolower($bill['vendorName']), $search)
                        || str_contains(strtolower($bill['campaignName']), $search)
                );
            })
            ->when($request->filled('status') && $request->string('status') !== 'all', function (Collection $bills) use ($request) {
                return $bills->where('status', $request->string('status'));
            })
            ->values();

        $perPage = 5;
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

    private function dummyBills(): Collection
    {
        // TODO: ganti dengan query asli setelah model ApBill/Vendor dibuat
        return collect([
            [
                'id' => '1',
                'vendorName' => 'Dwi Retno Rahastri Lerian',
                'campaignName' => 'Q2_Koko',
                'campaignCode' => 'Krunch_Campaign_MAY_2026',
                'referenceNumber' => null,
                'amount' => 21500000,
                'status' => 'finance_checked',
                'invoiceDate' => '2026-07-14',
            ],
            [
                'id' => '2',
                'vendorName' => 'Stephanie Anggraini',
                'campaignName' => 'Q3_S26_Mall Activation',
                'campaignCode' => 'JKT_JULY_2026',
                'referenceNumber' => null,
                'amount' => 2875000,
                'status' => 'unposted_ap',
                'invoiceDate' => '2026-07-14',
            ],
            [
                'id' => '3',
                'vendorName' => 'Elysa Candra',
                'campaignName' => 'Q2_S26_Mall',
                'campaignCode' => 'Activation_JUNE_2026',
                'referenceNumber' => null,
                'amount' => 2605000,
                'status' => 'rejected',
                'invoiceDate' => '2026-07-13',
            ],
            [
                'id' => '4',
                'vendorName' => 'Arzanda Jhuans',
                'campaignName' => 'Q2_Garnier_Low PH Cleanser',
                'campaignCode' => 'Massvo_APRIL_2026',
                'referenceNumber' => null,
                'amount' => 65000,
                'status' => 'payment_approved',
                'invoiceDate' => '2026-07-09',
            ],
            [
                'id' => '5',
                'vendorName' => 'Bobby Hartono',
                'campaignName' => 'Q2_Koko',
                'campaignCode' => 'Krunch_Campaign_MAY_2026',
                'referenceNumber' => null,
                'amount' => 23500000,
                'status' => 'payment_approved',
                'invoiceDate' => '2026-07-09',
            ],
        ]);
    }
}

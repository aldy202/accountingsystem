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

        $search = $request->query('search');
        $status = $request->query('status');
        $invoiceDateFrom = $request->query('invoiceDateFrom');
        $invoiceDateTo = $request->query('invoiceDateTo');

        $filtered = $allBills
            ->when(filled($search), function (Collection $bills) use ($search) {
                $needle = strtolower($search);

                return $bills->filter(
                    fn($bill) => str_contains(strtolower($bill['vendorName']), $needle)
                        || str_contains(strtolower($bill['campaignName']), $needle)
                );
            })
            ->when(filled($status) && $status !== 'all', function (Collection $bills) use ($status) {
                return $bills->where('status', $status);
            })
            ->when(filled($invoiceDateFrom), function (Collection $bills) use ($invoiceDateFrom) {
                return $bills->filter(fn($bill) => $bill['invoiceDate'] >= $invoiceDateFrom);
            })
            ->when(filled($invoiceDateTo), function (Collection $bills) use ($invoiceDateTo) {
                return $bills->filter(fn($bill) => $bill['invoiceDate'] <= $invoiceDateTo);
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
            [
                'id' => '6',
                'vendorName' => 'Andika Pratama',
                'campaignName' => 'Q3_S26_Mall Activation',
                'campaignCode' => 'JKT_AUGUST_2026',
                'referenceNumber' => null,
                'amount' => 4750000,
                'status' => 'finance_checked',
                'invoiceDate' => '2026-07-08',
            ],
            [
                'id' => '7',
                'vendorName' => 'Nadia Putri Lestari',
                'campaignName' => 'Q2_Garnier_Low PH Cleanser',
                'campaignCode' => 'Massvo_MAY_2026',
                'referenceNumber' => null,
                'amount' => 1250000,
                'status' => 'unposted_ap',
                'invoiceDate' => '2026-07-07',
            ],
            [
                'id' => '8',
                'vendorName' => 'Rizky Maulana',
                'campaignName' => 'Q2_Koko',
                'campaignCode' => 'Krunch_Campaign_APRIL_2026',
                'referenceNumber' => null,
                'amount' => 8900000,
                'status' => 'payment_approved',
                'invoiceDate' => '2026-07-06',
            ],
            [
                'id' => '9',
                'vendorName' => 'Sinta Maharani',
                'campaignName' => 'Q3_S26_Mall Activation',
                'campaignCode' => 'JKT_JUNE_2026',
                'referenceNumber' => null,
                'amount' => 3200000,
                'status' => 'rejected',
                'invoiceDate' => '2026-07-05',
            ],
            [
                'id' => '10',
                'vendorName' => 'Fajar Nugroho',
                'campaignName' => 'Q2_Garnier_Low PH Cleanser',
                'campaignCode' => 'Massvo_JUNE_2026',
                'referenceNumber' => null,
                'amount' => 6750000,
                'status' => 'finance_checked',
                'invoiceDate' => '2026-07-04',
            ],
            [
                'id' => '11',
                'vendorName' => 'Aulia Rahmawati',
                'campaignName' => 'Q2_Koko',
                'campaignCode' => 'Krunch_Campaign_JUNE_2026',
                'referenceNumber' => null,
                'amount' => 15000000,
                'status' => 'payment_approved',
                'invoiceDate' => '2026-07-03',
            ],
            [
                'id' => '12',
                'vendorName' => 'Bagas Saputra',
                'campaignName' => 'Q3_S26_Mall Activation',
                'campaignCode' => 'JKT_MAY_2026',
                'referenceNumber' => null,
                'amount' => 1850000,
                'status' => 'unposted_ap',
                'invoiceDate' => '2026-07-02',
            ],
            [
                'id' => '13',
                'vendorName' => 'Maya Sari Dewi',
                'campaignName' => 'Q2_Garnier_Low PH Cleanser',
                'campaignCode' => 'Massvo_MAY_2026',
                'referenceNumber' => null,
                'amount' => 4300000,
                'status' => 'finance_checked',
                'invoiceDate' => '2026-07-01',
            ],
            [
                'id' => '14',
                'vendorName' => 'Reza Firmansyah',
                'campaignName' => 'Q2_Koko',
                'campaignCode' => 'Krunch_Campaign_APRIL_2026',
                'referenceNumber' => null,
                'amount' => 9750000,
                'status' => 'rejected',
                'invoiceDate' => '2026-06-30',
            ],
            [
                'id' => '15',
                'vendorName' => 'Citra Amelia',
                'campaignName' => 'Q3_S26_Mall Activation',
                'campaignCode' => 'JKT_APRIL_2026',
                'referenceNumber' => null,
                'amount' => 5600000,
                'status' => 'payment_approved',
                'invoiceDate' => '2026-06-29',
            ],
            [
                'id' => '16',
                'vendorName' => 'Yoga Prasetyo',
                'campaignName' => 'Q2_Garnier_Low PH Cleanser',
                'campaignCode' => 'Massvo_APRIL_2026',
                'referenceNumber' => null,
                'amount' => 2850000,
                'status' => 'unposted_ap',
                'invoiceDate' => '2026-06-28',
            ],
            [
                'id' => '17',
                'vendorName' => 'Putri Anindita',
                'campaignName' => 'Q2_Koko',
                'campaignCode' => 'Krunch_Campaign_MAY_2026',
                'referenceNumber' => null,
                'amount' => 11250000,
                'status' => 'finance_checked',
                'invoiceDate' => '2026-06-27',
            ],
            [
                'id' => '18',
                'vendorName' => 'Dimas Arya Wijaya',
                'campaignName' => 'Q3_S26_Mall Activation',
                'campaignCode' => 'JKT_MAY_2026',
                'referenceNumber' => null,
                'amount' => 3950000,
                'status' => 'payment_approved',
                'invoiceDate' => '2026-06-26',
            ],
            [
                'id' => '19',
                'vendorName' => 'Nabila Khairunnisa',
                'campaignName' => 'Q2_Garnier_Low PH Cleanser',
                'campaignCode' => 'Massvo_JUNE_2026',
                'referenceNumber' => null,
                'amount' => 7200000,
                'status' => 'rejected',
                'invoiceDate' => '2026-06-25',
            ],
            [
                'id' => '20',
                'vendorName' => 'Rangga Aditya',
                'campaignName' => 'Q2_Koko',
                'campaignCode' => 'Krunch_Campaign_JUNE_2026',
                'referenceNumber' => null,
                'amount' => 19800000,
                'status' => 'payment_approved',
                'invoiceDate' => '2026-06-24',
            ],
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $bill = $this->dummyBills()->firstWhere('id', $id);

        if (! $bill) {
            return response()->json(['message' => 'Not found'], 404);
        }

        // TODO: ganti dengan data asli setelah model final
        return response()->json([
            ...$bill,
            'apNumber' => 'AP #1492',
            'vendor' => [
                'name' => $bill['vendorName'],
                'npwp' => null,
                'nik' => '3276024810830006',
                'pic' => 'Farida Nurul HAQ',
            ],
            'invoiceNumber' => null,
            'taxType' => null,
            'taxAmount' => 551282,
            'netAmount' => 22051282,
            'approvalStatus' => 'pending',
            'approvedBy' => null,
            'approvalDate' => null,
            'paymentSchedule' => '2026-07-22',
            'approvalNote' => null,
            'paidAmount' => null,
            'outstanding' => 21500000,
            'referenceNumber' => null,
        ]);
    }
}

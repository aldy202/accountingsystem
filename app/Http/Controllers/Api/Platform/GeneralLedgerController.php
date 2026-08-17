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

    }

    private function dummyLedger(): Collection
    {
        return collect ([
            [
                'id' => '1',
                'noJurnal' => 'JV-202607-00692',
                'date' => '2026-7-31'
            ]
        ]);
    }
}

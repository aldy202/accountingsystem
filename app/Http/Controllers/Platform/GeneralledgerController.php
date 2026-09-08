<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class GeneralledgerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('platform/generalledger/index');
    }

    public function create(): Response
    {
        return Inertia::render('platform/generalledger/create');
    }

    public function detail(string $id): Response
    {
        return Inertia::render('platform/generalledger/detail', [
            'id' => $id,
        ]);
    }
}

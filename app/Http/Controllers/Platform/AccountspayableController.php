<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountspayableController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('platform/accountspayable/index');
    }

    public function detail(string $id): Response
    {
        return Inertia::render('platform/accountspayable/detail', [
            'id' => $id,
        ]);
    }
}

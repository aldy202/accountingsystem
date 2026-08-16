<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = [
            ['id' => 1, 'name' => 'PT Maju Jaya', 'email' => 'contact@majujaya.com', 'phone' => '021-1234567'],
            ['id' => 2, 'name' => 'CV Sukses Mandiri', 'email' => 'info@suksesmandiri.co.id', 'phone' => '021-7654321'],
        ];

        return Inertia::render('master/clients/index', [
            'clients' => $clients,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientinvoiceController extends Controller
{
    public function index() : Response {
        return Inertia::render('platform/clientinvoice/index');

    }
}

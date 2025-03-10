<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AppointementCreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('appointments/create');
    }
}

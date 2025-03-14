<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AppointementCreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $dentists = User::where('role', 'dentist')->get();

        $dentistId = $request->query('dentistId');
        return Inertia::render('appointments/create', [
            'dentists' => $dentists,
            'dentistId' => $dentistId
        ]);

    }
}

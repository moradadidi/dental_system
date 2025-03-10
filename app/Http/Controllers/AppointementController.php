<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use Inertia\Inertia;

class AppointementController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $appointments = Appointment::with('patient', 'dentist')->get();

        
        return Inertia::render('appointments/index', [
            'appointments' => $appointments,
        ]);
    }
}

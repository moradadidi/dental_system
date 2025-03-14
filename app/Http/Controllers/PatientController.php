<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Dentist;
use App\Models\User;

class PatientController extends Controller
{
    public function myAppointments()
    {
        $appointments = auth()->user()->appointments()->with('dentist')->get();

        $appointments->each(function ($appointment) {
            $appointment->dentist_info = Dentist::find($appointment->dentist_id);
        });
        return Inertia::render('patients/appointments', [
            'appointments' => $appointments,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointementEditController extends Controller
{
    /**
     * Show the edit form for a specific appointment.
     */
    public function __invoke($id) // Accepts the appointment ID
    {
        // Fetch the appointment by ID
        $appointment = Appointment::with(['patient', 'dentist'])->findOrFail($id);

        // Pass the data to the frontend
        return Inertia::render('appointments/edit', [
            'appointment' => $appointment,
        ]);
    }
}

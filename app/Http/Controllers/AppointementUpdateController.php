<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;

class AppointementUpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'dentist_id' => 'required|exists:users,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'notes' => 'nullable',
        ]);

        $appointment = Appointment::find($request->id);
        $appointment->update($request->all());
        
        return redirect()->route('appointments.index');
    }
}

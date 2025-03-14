<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;

class AppointementStoreController extends Controller
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
        // if($request->user()->role === 'patient') {
        //     $request->merge(['patient_id' => $request->user()->id]);
            $request->merge(['dentist_id' => $request->input('dentist_id')]);

        // }else{
        //     $request->merge(['dentist_id' => $request->user()->id]);
        //     $request->merge(['patient_id' => $request->input('patient_id')]);
        // }

        $appointment = Appointment::create($request->all());
        // dd($appointment);

        return redirect()->route('appointments.index');
    }
}

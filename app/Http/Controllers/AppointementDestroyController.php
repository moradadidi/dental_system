<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;

class AppointementDestroyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request , $id) 
    {
        $appointment = Appointment::find($id);
        $appointment->delete();

        return redirect()->route('appointments.index');
        
    }
}

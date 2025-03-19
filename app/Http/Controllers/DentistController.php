<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Appointment;
use App\Models\Dentist;
use App\Models\User;
use Illuminate\Support\Str;

class DentistController extends Controller
{
    public function index()
    {
        $dentists = User::where('role', 'dentist')->get();
        return Inertia::render('dentists/index', [
            'dentists' => $dentists,
        ]);
    }

    public function show($id)
    {
        $dentist = User::where('role', 'dentist')->with('dentist')->findOrFail($id);
        // dd($dentist->user);
        return Inertia::render('dentists/show', [
            'dentist' => $dentist,
        ]);
    }

    public function create()
    {
        return Inertia::render('dentists/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'            => 'required',
            'email'           => 'required|email',
            'password'        => 'required',
            'phone_number'    => 'sometimes',
            'profile_picture' => 'nullable|image|max:2048', // Validate image file up to 2MB
        ]);

        // Handle file upload for profile picture
        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request->file('profile_picture')->store('dentist-profile-pictures', 'public');
        }

        User::create([
            'name'            => $request->name,
            'email'           => $request->email,
            'workos_id'       => 'user_' . Str::random(10),
            'password'        => bcrypt($request->password),
            'phone_number'    => $request->phone_number,
            'profile_picture' => $profilePicturePath,
            'role'            => 'dentist',
            'avatar'          => 'https://i.pravatar.cc/150?u=' . Str::random(10),
        ]);

        Dentist::create([
            'specialization' => 'General Dentistry',
            'credentials'    => $request->credentials ?? 'DDS',
            'bio'            => $request->bio ?? 'Experienced dentist with a passion for patient care.',
            'office_address' => $request->office_address ?? '123 Dental St, Tooth City',
        ]);

        return redirect()->route('dentists.index');
    }

    public function edit($id)
    {
        $dentist = User::where('role', 'dentist')->findOrFail($id);
        return Inertia::render('dentists/edit', [
            'dentist' => $dentist,
        ]);
    }

    public function update(Request $request, $id)
    {
        // TEMPORARY DEBUG:
        // dd($id, $request->all());
    
        $request->validate([
            'name'            => 'sometimes',
            'email'           => 'sometimes|email',
            'phone_number'    => 'sometimes',
            'profile_picture' => 'nullable|image|max:2048',
        ]);
    
        $dentist = User::where('role', 'dentist')->findOrFail($id);
    
        $data = [
            'name'         => $request->name,
            'email'        => $request->email,
            'phone_number' => $request->phone_number,
        ];
    
        // If new profile picture is uploaded
        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request
                ->file('profile_picture')
                ->store('dentist-profile-pictures', 'public');
            $data['profile_picture'] = $profilePicturePath;
        }
    
        $dentist->update($data);
    
        return redirect()->route('dentists.index');
    }
    


    public function destroy($id)
    {
        $dentist = User::where('role', 'dentist')->findOrFail($id);
        $dentist->delete();

        return redirect()->route('dentists.index');
    }

    // public function dentistAppointments($id)
    // {
    //     $appointments = Appointment::where('dentist_id', $id)->get();
    //     return Inertia::render('dentists/appointments', [
    //         'appointments' => $appointments,
    //     ]);
    // }

  // DashboardController.php
public function dashboard()
{
    // dd( Dentist::count() ,User::where('role', 'dentist')->count() );

    return Inertia::render('dashboard', [

        'stats' => [
            'totalDentists' => Dentist::count(),
            'activePatients' => User::where('role', 'patient')->count(),
            'totalAppointments' => Appointment::count(),
            'upcomingAppointments' => 125,  //Appointment::where('status', 'upcoming')->count()
            'completedAppointments' => 58,//Appointment::where('status', 'completed')->count()
            'canceledAppointments' => 56, //Appointment::where('status', 'canceled')->count()
            'totalRevenue' =>   10000,
            'revenueGrowth' => 20, // Calculate actual growth
            'patientGrowth' => 15, // Calculate actual growth
            'newDentists' => Dentist::whereMonth('created_at', now()->month)->count(),
            'revenueLabels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'revenueData' => [3000, 3500, 2500, 4000, 4500, 5000], // Replace with real data
        ],
        'recentAppointments' => Appointment::with('dentist')->latest()->take(5)->get(),
        'availableDentists' => Dentist::whereHas('schedules', function ($query) {
            $query->whereJsonContains('days_of_week', now()->format('l'));
        })->with('user')->get(),
    ]);
}


public function dentistAppointments(Request $request)
{
    $query = Appointment::where('dentist_id', auth()->id())
        ->with('patient');
        // dd($query->get());

    // Date filtering
    if ($request->has('start_date') && $request->has('end_date')) {
        $query->whereBetween('start_time', [
            $request->input('start_date'),
            $request->input('end_date')
        ]);
    }

    // Status filtering
    if ($request->status && $request->status !== 'all') {
        $query->where('status', $request->status);
    }

    // Search patients
    if ($request->search) {
        $query->whereHas('patient', function ($q) use ($request) {
            $q->where('name', 'LIKE', "%{$request->search}%");
        });
    }
    // dd($query->orderBy('start_time', 'desc')->paginate());
    return Inertia::render('dentists/appointments', [
        'appointments' => $query->orderBy('start_time', 'desc')->paginate()
    ]);
}

public function cancel(Appointment $appointment)
{
    $appointment->update(['status' => 'canceled']);
    return redirect()->back()->with('success', 'Appointment canceled');
}

public function updateStatus(Request $request, Appointment $appointment)
{
    $request->validate([
        'status' => 'required|in:confirmed,canceled,completed'
    ]);

    $appointment->update(['status' => $request->status]);

    return redirect()->back()->with('success', 'Appointment updated');
}

}

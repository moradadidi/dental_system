<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Appointment;
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
        $dentist = User::where('role', 'dentist')->findOrFail($id);
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

    public function dentistAppointments($id)
    {
        $appointments = Appointment::where('dentist_id', $id)->get();
        return Inertia::render('dentists/appointments', [
            'appointments' => $appointments,
        ]);
    }
}

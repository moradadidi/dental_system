<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Dentist;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DentistInfoController extends Controller
{

    public function index()
    {
        $dentists = Dentist::with('user')
            ->whereHas('user', function($q) {
                $q->where('role', 'dentist');
            })
            ->get()
            ->map(function($dentist) {
                return [
                    'id' => $dentist->id,
                    'user_id' => $dentist->user_id,
                    'name' => $dentist->user->name,
                    'email' => $dentist->user->email,
                    'phone_number' => $dentist->user->phone_number,
                    'profile_picture' => $dentist->user->profile_picture,
                    'specialization' => $dentist->specialization,
                    'credentials' => $dentist->credentials,
                    'bio' => $dentist->bio,
                    'office_address' => $dentist->office_address,
                    'available_today' => $dentist->available_today, // New attribute
                ];
            });
            // dd($dentists);
        return Inertia::render('dentistsInfos/index', [
            'dentists' => $dentists
        ]);
    }

    public function show($id)
    {
        $dentist = Dentist::with('user')->findOrFail($id);

        // dd($dentist);
        return Inertia::render('dentistsInfos/show', [
            'dentist' => [
                'id' => $dentist->id,
                'user_id' => $dentist->user_id,
                'name' => $dentist->user->name,
                'email' => $dentist->user->email,
                'specialization' => $dentist->specialization,
                'credentials' => $dentist->credentials,
                'bio' => $dentist->bio,
                'office_address' => $dentist->office_address,
                'available_today' => $dentist->available_today,
            ]
        ]);
    }

    public function create()
{
    $dentist = Dentist::where('user_id', auth()->id())->first();

    return Inertia::render('dentistsInfos/create', [
        'dentist' => $dentist
    ]);
}


    // This method now uses updateOrCreate so that if dentist info for the user_id exists, it will update it; if not, it will create a new record.
    public function store(Request $request)
    {

        // dd($request->all(), $request->user_id);
        $request->validate([
            'user_id'        => 'sometimes',
            'specialization' => 'sometimes',
            'credentials'    => 'sometimes',
            'bio'            => 'sometimes',
            'office_address' => 'sometimes',
        ]);

        $dentist = Dentist::updateOrCreate(
            ['user_id' => $request->user_id],
            [
                'specialization' => $request->specialization,
                'credentials'    => $request->credentials,
                'bio'            => $request->bio,
                'office_address' => $request->office_address,
            ]
        );

        return redirect()->route('dentistsInfos.create');
    }

    
    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id'        => 'required',
            'specialization' => 'required',
            'credentials'    => 'required',
            'bio'            => 'required',
            'office_address' => 'required',
        ]);

        $dentist = Dentist::find($id);

        if ($dentist) {
            // Update the existing record.
            $dentist->update($request->only([
                'specialization', 
                'credentials', 
                'bio', 
                'office_address'
            ]));
        } else {
            // Create a new record if not found.
            $dentist = Dentist::create([
                'user_id'        => $request->user_id,
                'specialization' => $request->specialization,
                'credentials'    => $request->credentials,
                'bio'            => $request->bio,
                'office_address' => $request->office_address,
            ]);
        }

        return redirect()->route('dentists.info', $dentist->id);
    }

    public function destroy($id)
    {
        $dentist = Dentist::findOrFail($id);
        $dentist->delete();

        return redirect()->route('dentists.index');
    }
}

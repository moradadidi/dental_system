<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;
use App\Http\Controllers\AppointementController;
use App\Http\Controllers\AppointementCreateController;
use App\Http\Controllers\AppointementStoreController;
use App\Http\Controllers\AppointementDestroyController;
use App\Http\Controllers\AppointementEditController;
use App\Http\Controllers\AppointementUpdateController;
use App\Http\Controllers\DentistController;
use App\Http\Controllers\DentistInfoController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ScheduleController;
use App\Http\Middleware\EnsureDentistRole;
use App\Http\Middleware\EnsurePatientRole;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Routes that require authentication
Route::middleware('auth')->group(function () {

    // Dashboard route (for both roles if needed)
    Route::get('dashboard', [DentistController::class, 'dashboard'])->name('dashboard');

    // Routes accessible only to dentists
    Route::middleware(EnsureDentistRole::class)->group(function () {
        // Appointments routes for dentists
        Route::get('/appointments', AppointementController::class)
            ->name('appointments.index');
        
        Route::get('/dentists/appointments', [DentistController::class, 'dentistAppointments'])
            ->name('dentists.appointments');
        
        Route::put('/dentist/appointments/{appointment}/status', [DentistController::class, 'updateStatus'])
            ->name('dentist.appointments.updateStatus');
        
        Route::delete('/appointments/{appointment}/cancel', [DentistController::class, 'cancel'])
            ->name('dentist.appointments.cancel');

        // Schedules routes for dentists
        Route::get('/schedules/create', [ScheduleController::class, 'create'])
            ->name('schedules.create');
        Route::get('/schedules/{id}', [ScheduleController::class, 'show'])
            ->name('schedules.show');
        Route::post('/schedules', [ScheduleController::class, 'store'])
            ->name('schedules.store');
        Route::put('/schedules/{id}', [ScheduleController::class, 'update'])
            ->name('schedules.update');
        Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy'])
            ->name('schedules.destroy');
    });

    // Routes accessible only to patients
    Route::middleware(EnsurePatientRole::class)->group(function () {
        Route::get('/myAppointments', [PatientController::class, 'myAppointments'])
            ->name('myAppointments');
    });

    // Appointments routes available to both or common actions
    Route::get('/appointments/create', AppointementCreateController::class)
        ->name('appointments.create');
    Route::post('/appointments', AppointementStoreController::class)
        ->name('appointments.store');
    Route::delete('/appointments/{id}', AppointementDestroyController::class)
        ->name('appointments.destroy');
    Route::get('/appointments/{id}/edit', AppointementEditController::class)
        ->name('appointments.edit');
    Route::put('/appointments/{id}', AppointementUpdateController::class)
        ->name('appointments.update');

    // Dentist Info routes (could be available to all authenticated users)
    Route::get('/ourDentists', [DentistInfoController::class, 'index'])
        ->name('dentistsInfos.index');
    Route::post('/dentistsInfos', [DentistInfoController::class, 'store'])
        ->name('dentistsInfos.store');
    Route::get('/dentistsInfos/create', [DentistInfoController::class, 'create'])
        ->name('dentistsInfos.create');
    Route::get('/dentistsInfos/{id}', [DentistInfoController::class, 'show'])
        ->name('dentistsInfos.show');
    Route::delete('/dentistsInfos/{id}', [DentistInfoController::class, 'destroy'])
        ->name('dentistsInfos.destroy');
    Route::put('/dentistsInfos/{id}', [DentistInfoController::class, 'update'])
        ->name('dentistsInfos.update');

    // Resource route for dentists (accessible to authenticated users)
    Route::resource('dentists', DentistController::class);
});

// If schedules routes are already defined above, remove duplicate resource declarations
// Route::resource('schedules', ScheduleController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

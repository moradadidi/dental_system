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



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::get('/appointments', AppointementController::class)->name('appointments.index');
Route::get('/appointments/create', AppointementCreateController::class)->name('appointments.create');
Route::post('/appointments', AppointementStoreController::class)->name('appointments.store');
Route::delete('/appointments/{id}', AppointementDestroyController::class)->name('appointments.destroy');
Route::get('/appointments/{id}/edit', AppointementEditController::class)->name('appointments.edit');
Route::put('/appointments/{id}', AppointementUpdateController::class)->name('appointments.update');

Route::get('/myAppointments', [PatientController::class, 'myAppointments'])->name('myAppointments');


Route::resource('dentists', DentistController::class);

Route::get('/ourDentists', [DentistInfoController::class, 'index'])->name('dentistsInfos.index');
Route::post('/dentistsInfos', [DentistInfoController::class, 'store'])->name('dentistsInfos.store');
Route::get('/dentistsInfos/create', [DentistInfoController::class, 'create'])->name('dentistsInfos.create');
Route::get('/dentistsInfos/{id}', [DentistInfoController::class, 'show'])->name('dentistsInfos');
Route::delete('/dentistsInfos/{id}', [DentistInfoController::class, 'destroy'])->name('dentistsInfos.destroy');
Route::put('/dentistsInfos/{id}', [DentistInfoController::class, 'update'])->name('dentistsInfos.update');


Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedules.store');
Route::get('/schedules/create', [ScheduleController::class, 'create'])->name('schedules.create');
Route::get('/schedules/{id}', [ScheduleController::class, 'show'])->name('schedules');
Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy'])->name('schedules.destroy');
Route::put('/schedules/{id}', [ScheduleController::class, 'update'])->name('schedules.update');




Route::resource('schedules', ScheduleController::class);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

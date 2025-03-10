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


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

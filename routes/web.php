<?php


use App\Http\Controllers\BookingController;
use App\Http\Controllers\BusController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');



Route::get('bookings', [BookingController::class, 'index'])->name('bookings.list');
Route::get('bookings/add', [BookingController::class, 'add'])->name('bookings.add');
Route::post('bookings', [BookingController::class, 'store'])->name('bookings.save');
Route::get('bookings/{booking}', [BookingController:: class, 'view'])->name('bookings.view');
Route::post('bookings/update', [BookingController::class, 'update'])->name('bookings.update');
Route::post('bookings/delete', [BookingController::class, 'destroy'])->name('bookings.delete');


Route::get('buses', [BusController::class, 'index'])->name('buses.list');
Route::get('buses/add', [BusController::class, 'add'])->name('buses.add');
Route::post('buses', [BusController::class, 'store'])->name('buses.save');
Route::get('buses/{bus}', [BusController:: class, 'view'])->name('buses.view');
Route::post('buses/update', [BusController::class, 'update'])->name('buses.update');
Route::post('buses/delete', [BusController::class, 'destroy'])->name('buses.delete');
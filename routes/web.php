<?php


use App\Http\Controllers\BookingController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\TechReportController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CityListController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');



Route::get('bookings', [BookingController::class, 'index'])->name('bookings.list');
Route::get('bookings/add', [BookingController::class, 'add'])->name('bookings.add');
Route::post('bookings', [BookingController::class, 'store'])->name('bookings.save');
Route::get('bookings/{booking}', [BookingController::class, 'view'])->name('bookings.view');
Route::post('bookings/update', [BookingController::class, 'update'])->name('bookings.update');
Route::post('bookings/delete', [BookingController::class, 'destroy'])->name('bookings.delete');


Route::get('buses', [BusController::class, 'index'])->name('buses.list');
Route::get('buses/add', [BusController::class, 'add'])->name('buses.add');
Route::post('buses', [BusController::class, 'store'])->name('buses.save');
Route::get('buses/{bus}', [BusController::class, 'view'])->name('buses.view');
Route::post('buses/update', [BusController::class, 'update'])->name('buses.update');
Route::post('buses/delete', [BusController::class, 'destroy'])->name('buses.delete');


Route::get('techreports/add', [TechReportController::class, 'add'])->name('techreports.add');
Route::get('techreports', [TechReportController::class, 'index'])->name('techreports.list');
Route::post('techreports', [TechReportController::class, 'store'])->name('techreports.save');
Route::get('techreports/{techreport}', [TechReportController::class, 'view'])->name('techreports.view');
Route::post('techreports/update', [TechReportController::class, 'update'])->name('techreports.update');
Route::post('techreports/delete', [TechReportController::class, 'destroy'])->name('techreports.delete');


Route::get('trips', [TripController::class, 'index'])->name('trips.list');
Route::get('trips/add', [TripController::class, 'add'])->name('trips.add');
Route::post('trips', [TripController::class, 'store'])->name('trips.save');
Route::get('trips/{trip}', [TripController::class, 'view'])->name('trips.view');
Route::post('trips/update', [TripController::class, 'update'])->name('trips.update');
Route::post('trips/delete', [TripController::class, 'destroy'])->name('trips.delete');


Route::get('routes/add', [RouteController::class, 'add'])->name('routes.add');
Route::post('routes', [RouteController::class, 'store'])->name('routes.save');
Route::get('routes/{route}', [RouteController::class, 'view'])->name('routes.view');
Route::post('routes/update', [RouteController::class, 'update'])->name('routes.update');
Route::post('routes/delete', [RouteController::class, 'destroy'])->name('routes.delete');

Route::get('cities', [CityController::class, 'index'])->name('cities.list');
Route::get('cities/add', [CityController::class, 'add'])->name('cities.add');
Route::post('cities', [CityController::class, 'store'])->name('cities.save');
Route::get('cities/{city}', [CityController::class, 'view'])->name('cities.view');
Route::post('cities/update', [CityController::class, 'update'])->name('cities.update');
Route::post('cities/delete', [CityController::class, 'destroy'])->name('cities.delete');


Route::get('city-lists', [CityListController::class, 'index'])->name('city-lists.list');
Route::get('city-lists/add', [CityListController::class, 'add'])->name('city-lists.add');
Route::post('city-lists', [CityListController::class, 'store'])->name('city-lists.save');
Route::get('city-lists/{city-list}', [CityListController::class, 'view'])->name('city-lists.view');
Route::post('city-lists/update', [CityListController::class, 'update'])->name('city-lists.update');
Route::post('city-lists/delete', [CityListController::class, 'destroy'])->name('city-lists.delete');

<?php


use App\Http\Controllers\BookingController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\TechReportController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CityListController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CurrentTravelsController;
use App\Http\Controllers\TravelsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;



Route::get('/', function () {
  return Inertia::render('Home');
})->name('home');

// Route::get('/login', [LoginController::class, 'index'])->name('login');       //according to authenticatable its as if im not even sending anything to auth by
// Route::post('/login', [LoginController::class, 'login'])->name('do.login');

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


  Route::get('citylists', [CityListController::class, 'index'])->name('citylists.list');
  Route::get('citylists/add', [CityListController::class, 'add'])->name('citylists.add');
  Route::post('citylists', [CityListController::class, 'store'])->name('citylists.save');
  Route::get('citylists/{citylist}', [CityListController::class, 'view'])->name('citylists.view');
  Route::post('citylists/update', [CityListController::class, 'update'])->name('citylists.update');
  Route::post('citylists/delete', [CityListController::class, 'destroy'])->name('citylists.delete');


  Route::get('travels', [TravelsController::class, 'index'])->name('travels.list');
  Route::get('travels/add', [TravelsController::class, 'add'])->name('travels.add');
  Route::post('travels', [TravelsController::class, 'store'])->name('travels.save');
  Route::get('travels/{travel}', [TravelsController::class, 'view'])->name('travels.view');
  Route::post('travels/update', [TravelsController::class, 'update'])->name('travels.update');
  Route::post('travels/delete', [TravelsController::class, 'destroy'])->name('travels.delete');


  Route::get('currenttrips', [CurrentTravelsController::class, 'index'])->name('currenttrips.list');

// Route::group(['middleware' => ['auth']], function () {
    
  

// });



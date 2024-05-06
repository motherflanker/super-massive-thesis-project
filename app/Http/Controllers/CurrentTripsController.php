<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;


class CurrentTripsController extends Controller
{
  public function index(){
    $trips = DB::table('trips')->where('isActive','=','1')->orderBy('departure_DateTime', 'asc')->paginate(5);
    return Inertia::render('CurrentTrips')->with('trips', $trips);
  }
}

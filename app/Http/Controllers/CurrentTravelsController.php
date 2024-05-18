<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use App\Models\Bus;

use Inertia\Inertia;


class CurrentTravelsController extends Controller
{
  public function index(){
    $buses = Bus::all();
    $travels = DB::table('travels')->where('status', '!=', 'отменен')->orderBy('departure_DateTime', 'asc')->paginate(5);
    $data = ['travels' => $travels, 'buses' => $buses];
    return Inertia::render('CurrentTrips')->with($data);
  }
}

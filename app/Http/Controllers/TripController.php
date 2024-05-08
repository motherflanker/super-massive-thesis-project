<?php

namespace App\Http\Controllers;

use App\Models\Trip;

use App\Services\TripService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;


class TripController extends Controller
{
  private TripService $tripService;

    private $rules = [];

    public function __construct(TripService $tripService) {
      $this->tripService = $tripService;
      $this->rules = [
        'route_id' => 'required|integer',
        'destination' => 'required|min:2|max:30',
        'origin' => 'required|min:2|max:30',
        'city_list_id' => 'required|integer',
        'tripNumber' => 'required|integer',
        'status' => 'required|string'
      ];
    }
    //date_format:Y-m-d H:i

    public function add(){
      return Inertia::render('TripsAdd');
    }

    public function index(){
      $trips = DB::table('trips')->orderBy('created_at', 'desc')->paginate(5);
      $routes = DB::table('routes')->orderBy('created_at', 'desc')->paginate(5);
      $data = ['trips' => $trips, 'routes' => $routes];
      return Inertia::render('TripsRoutes')->with($data);
    }

    public function view(Trip $trip) {
      $buses = DB::table('buses')->get();
      $data = ['buses' => $buses, 'trip' => $trip];
      return Inertia::render('TripsView')->with($data);
    }

    public function store(Request $request): RedirectResponse
    {
      $data = $request->validate($this->rules); 
      $this->tripService->createTrip($data);
      return Redirect::route('trips.list');
    }

    public function update(Request $request)
    {
      $rules = $this->rules;
      $rules['trip_id'] = 'required|exists:trips,trip_id';
      $data = $request->validate($rules);
      $this->tripService->updateTrip($data);
      return Redirect::route('trips.list');
    }

    public function destroy(Request $request)
    {
      $data = $request->validate([
        'trip_id' => 'required|integer'
      ]);
      Trip::findOrFail($data['trip_id'])->delete();
      return Redirect::route('trips.list');
    }
}

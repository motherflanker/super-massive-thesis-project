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
        'bus_id' => 'required|integer',
        'destination' => 'required|min:2|max:30',
        'origin' => 'required|min:2|max:30',
        'city_list_id' => 'required|integer',
        'name' => 'required|min:2|max:15',
        'surname' => 'required|min:2|max:24',
        'phone' => 'required|size:11',
        'max_seats'  => 'required|integer',
        'departure_DateTime' => 'required',
        'arrival_DateTime' => 'required',
      ];
    }
    //date_format:Y-m-d H:i

    public function add(){
      return Inertia::render('TripsAdd');
    }

    public function index(){
      $trips = DB::table('trips')->orderBy('created_at', 'desc')->paginate(5);
      return Inertia::render('Trips')->with('trips', $trips);
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

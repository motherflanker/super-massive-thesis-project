<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use App\Models\Bus;
use App\Models\TechReport;

use App\Services\BusService;

use Inertia\Inertia;


class BusController extends Controller
{
  private BusService $busService;
  private $rules = [];

  public function __construct(BusService $busService){
    $this->busService = $busService;
    $this->rules = [
      'name' => 'required', 
      'plate_number' => 'required|min:7|max:9',
      'max_seats' => 'required|integer|max:99',
      'status' => 'required|string'
    ];
  }

  public function map()
  {
    $buses = Bus::all();
    return Inertia::render('Map', ['buses' => $buses]);
  }


  public function updateLocation(Request $request, $bus_id) {
    \Log::info('Received data:', $request->all());
    \Log::info('Bus ID:', ['bus_id' => $bus_id]);
    $this->busService->updateLocation($bus_id, $request->latitude, $request->longitude);
    return response()->json(['message' => 'location updated']);
}

// public function updateLocation(Request $request, $bus_id) {
//   \Log::info('Received data:', $request->all());
//   \Log::info('Headers:', $request->headers->all());
//   \Log::info('Bus ID:', ['bus_id' => $bus_id]);

//   $latitude = $request->input('latitude');
//   $longitude = $request->input('longitude');

//   if (is_null($latitude) || is_null($longitude)) {
//       \Log::error('Missing latitude or longitude', ['latitude' => $latitude, 'longitude' => $longitude]);
//       return response()->json(['message' => 'Invalid data'], 400);
//   }

//   $this->busService->updateLocation($bus_id, $latitude, $longitude);
//   \Log::info('Location updated successfully');

//   return response()->json(['message' => 'Location updated']);
// }

  public function add(){
    return Inertia::render('BusesAdd');
  }

  public function index(){
    $buses = DB::table('buses')->orderBy('created_at', 'asc')->paginate(10);
    $techreports = DB::table('techreports')->orderBy('created_at', 'asc')->paginate(10);
    $data = ['buses' => $buses, 'techreports' => $techreports];
    return Inertia::render('Buses')->with($data);
  }  

  public function locations()
  {
    \Log::info('Entered the method');
    $busLocations = DB::table('buses')->select('bus_id', 'latitude', 'longitude')->get();
    return response()->json($busLocations);
  }

  public function view(Bus $bus){
    $techreports = DB::table('techreports')->orderBy('created_at', 'desc')->get();
    $data = ['bus' => $bus, 'techreports' => $techreports];
    return Inertia::render('BusesView')->with($data);
  }

  public function store(Request $request): RedirectResponse{
    $data = $request->validate($this->rules);
    $this->busService->createBus($data);
    return Redirect::route('buses.list');
  }

  public function update(Request $request){
    $rules = $this->rules;
    $rules['bus_id'] = 'required|exists:buses,bus_id';
    $data = $request->validate($rules);
    $this->busService->updateBus($data);
    return Redirect::route('buses.list');
  }

  public function destroy(Request $request){
    $data = $request->validate(['bus_id' => 'required']);
    Bus::findOrFail($data['bus_id'])->delete();
    return Redirect::route('buses.list');
  }
}

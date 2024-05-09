<?php

namespace App\Http\Controllers;

use App\Models\Travel;

use App\Services\TravelService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class TravelsController extends Controller
{
  private TravelService $travelService;
  private $rules = [];

  public function __construct(TravelService $travelService) {
    $this->travelService = $travelService;
    $this->rules = [
      'trip_id' => 'required|integer',
      'tripNumber' => 'required|integer',
      'destination'	=> 'required|min:2|max:30',
      'origin' => 'required|min:2|max:30',	
      'name' => 'required|min:2|max:15',	
      'surname' => 'required|min:2|max:24',	
      'phone' => 'required|size:11',	
      'bus_id' => 'required|integer',	
      'max_seats' => 'required|integer',	
      'departure_DateTime' => 'required|date_format:Y-m-d H:i',	
      'arrival_DateTime' => 'required|date_format:Y-m-d H:i',	
      'status' => 'required|string',	
      'type' => 'required|string',
    ];
  }
  
  //date_format:Y-m-d H:i

  public function index(){
    $travel = DB::table('travels')->orderBy('created_at', 'desc')->paginate(10);
    return Inertia::render('Travels')->with('travels', $travel);
  }  

  public function add(){
    $trips = DB::table('trips')->get();
    $buses = DB::table('buses')->get();
    $data = ['trips' => $trips, 'buses' => $buses];
    return Inertia::render('TravelsAdd')->with($data);
  }

  public function view(Travel $travel) {
    return Inertia::render('TravelsView')->with('travel', $travel);
  }

  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate($this->rules); 
    $this->travelService->createTravel($data);
    return Redirect::route('travels.list');
  }

  public function update(Request $request)
  {
    $rules = $this->rules;
    $rules['travel_id'] = 'required|exists:travels,travel_id';
    $data = $request->validate($rules);
    $this->travelService->updateTravel($data);
    return Redirect::route('travels.list');
  }

  public function destroy(Request $request)
  {
    $data = $request->validate([
      'travel_id' => 'required|integer'
    ]);
    Travel::findOrFail($data['travel_id'])->delete();
    return Redirect::route('travels.list');
  }
}

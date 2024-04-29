<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use App\Models\Bus;

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
      'max_seats' => 'required|integer|max:99'
    ];
  }

  public function add(){
    return Inertia::render('BusesAdd');
  }

  public function index(){
    $bus = DB::table('buses')->orderBy('created_at', 'asc')->paginate(10);
    return Inertia::render('Buses')->with('buses', $bus);
  }  

  public function view(Bus $bus){
    return Inertia::render('BusesView')->with('bus', $bus);
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

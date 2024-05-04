<?php

namespace App\Http\Controllers;

use App\Models\City;

use App\Services\CityService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class CityController extends Controller
{
  private CityService $cityService;
  private $rules = [];

  public function __construct(RouteService $routeService) {
    $this->routeService = $routeService;
    $this->rules = [
      'name' => 'required|min:2|max:30'
    ];
  }

  // public function index(){
  //   $cities = DB::table('cities')->get();
  //   return Inertia::render('Cities')->with('cities', $cities);
  // }  

  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate($this->rules); 
    $this->routeService->createCity($data);
    return Redirect::route('cities.list');
  }

  public function update(Request $request)
  {
    $rules = $this->rules;
    $rules['city_id'] = 'required|exists:cities,city_id';
    $data = $request->validate($rules);
    $this->routeService->updateCity($data);
    return Redirect::route('cities.list');
  }

  public function destroy(Request $request)
  {
    $data = $request->validate([
      'city_id' => 'required|integer'
    ]);
    City::findOrFail($data['city_id'])->delete();
    return Redirect::route('cities.list');
  }
}

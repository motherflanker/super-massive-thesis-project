<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\St;

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

  public function __construct(CityService $cityService) {
    $this->cityService = $cityService;
    $this->rules = [
      'name' => 'required|min:2|max:30'
    ];
  }

  public function index(Request $request){
    $stopsPage = $request->input('stops_page', 1);
    $citiesPage = $request->input('cities_page', 1);

    $stops = DB::table('stops')->paginate(5, ['*'], 'stops_page', $stopsPage);
    $cities = DB::table('cities')->paginate(10 , ['*'], 'cities_page', $citiesPage);

    $data = ['stops' => $stops, 'cities' => $cities];
    return Inertia::render('Cities')->with($data);
  }  

  public function view(City $city)
  {
    $stops = DB::table('stops')->get();
    $data = ['stops' => $stops, 'city' => $city];
    return Inertia::render('CityView')->with($data);
  }


  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate($this->rules); 
    $this->cityService->createCity($data);
    return Redirect::route('cities.list');
  }

  public function update(Request $request)
  {
    $rules = $this->rules;
    $rules['city_id'] = 'required|exists:cities,city_id';
    $data = $request->validate($rules);
    $this->cityService->updateCity($data);
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

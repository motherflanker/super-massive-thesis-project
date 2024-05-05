<?php

namespace App\Http\Controllers;

use App\Models\CityList;

use App\Services\CityListService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class CityListController extends Controller
{
  private CityListService $cityListService;
  private $rules = [];

  public function __construct(CityListService $cityListService) {
    $this->cityListService = $cityListService;
    $this->rules = [];
    for ($i = 1; $i <= 8; $i++) {
      $this->rules['city_id'.$i] = 'nullable|integer';
  }
  }

  public function index(){
    $cities = DB::table('cities')->orderBy('city_id', 'asc')->get();
    $citylists = DB::table('city-lists')->orderBy('created_at', 'desc')->paginate(5);
    $data = ['citylists' => $citylists, 'cities' => $cities];
    return Inertia::render('Cities')->with($data);
  }  

  public function add(){
    $cities = DB::table('cities')->orderBy('city_id', 'asc')->paginate(10);
    return Inertia::render('CityListsAdd')->with('cities', $cities);
  }

  public function view(CityList $citylist) {
    $cities = DB::table('cities')->get();
    $data = ['cities' => $cities, 'citylist' => $citylist];
    return Inertia::render('CityListsView')->with($data);
  }

  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate($this->rules); 
    $this->cityListService->createCityList($data);
    return Redirect::route('citylists.list');
  }

  public function update(Request $request)
  {
    $rules = $this->rules;
    $rules['city_list_id'] = 'required|exists:city-lists,city_list_id';
    $data = $request->validate($rules);
    $this->cityListService->updateCityList($data);
    return Redirect::route('citylists.list');
  }

  public function destroy(Request $request)
  {
    $data = $request->validate([
      'city_list_id' => 'required|integer'
    ]);
    CityList::findOrFail($data['city_list_id'])->delete();
    return Redirect::route('citylists.list');
  }
}

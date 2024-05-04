<?php

namespace App\Http\Controllers;

use App\Models\Route;

use App\Services\RouteService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class RouteController extends Controller
{
  private RouteService $routeService;
  private $rules = [];

  public function __construct(RouteService $routeService) {
    $this->routeService = $routeService;
    $this->rules = [
      'destination' => 'required|min:2|max:30',
      'origin' => 'required|min:2|max:30',
      'city_list_id' => 'required|integer',
      'twoway' => 'required|boolean'
    ];
  }

  public function add(){
    return Inertia::render('RoutesAdd');
  }

  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate($this->rules); 
    $this->routeService->createRoute($data);
    return Redirect::route('trips.list');
  }

  public function update(Request $request)
  {
    $rules = $this->rules;
    $rules['route_id'] = 'required|exists:routes,route_id';
    $data = $request->validate($rules);
    $this->routeService->updateRoute($data);
    return Redirect::route('trips.list');
  }

  public function destroy(Request $request)
  {
    $data = $request->validate([
      'route_id' => 'required|integer'
    ]);
    Route::findOrFail($data['route_id'])->delete();
    return Redirect::route('trips.list');
  }

}

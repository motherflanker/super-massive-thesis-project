<?php

namespace App\Http\Controllers;

use App\Models\StopRoute;

use App\Services\StopRouteService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class StopsRoutesController extends Controller
{
  private StopRouteService $stopRouteService;
  private $rules = [];

  public function __construct(StopRouteService $stopRouteService) {
    $this->stopRouteService = $stopRouteService;
    $this->rules = [
      'route_id' => 'required|integer',
      'stops_id' => 'required|integer',
      'time' => 'required|integer'
    ];
  }

  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate($this->rules); 
    $this->stopRouteService->createStopRoute($data);
    return Redirect::route('trips.list');
  }

  public function update(Request $request)
  {
    $rules = $this->rules;
    $rules['rs_id'] = 'required|exists:routesstops,rs_id';
    $data = $request->validate($rules);
    $this->stopService->updateStopRoute($data);
    return Redirect::route('trips.list');
  }
}

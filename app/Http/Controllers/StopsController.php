<?php

namespace App\Http\Controllers;

use App\Models\Stop;

use App\Services\StopService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class StopsController extends Controller
{
  private StopService $stopService;
  private $rules = [];

  public function __construct(StopService $stopService) {
    $this->stopService = $stopService;
    $this->rules = [
      'name' => 'required|min:2|max:60',
      'city_id' => 'required|integer'
    ];
  }

  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate($this->rules); 
    $this->stopService->createStop($data);
    return Redirect::route('cities.list');
  }

  public function update(Request $request)
  {
    $rules = $this->rules;
    $rules['stop_id'] = 'required|exists:stops,stop_id';
    $data = $request->validate($rules);
    $this->stopService->updateStop($data);
    return Redirect::route('cities.list');
  }

}

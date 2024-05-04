<?php



namespace App\Services;

use App\Models\Route;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;


class RouteService{
  public function createRoute($routeData){
    try{
      DB::beginTransaction();
      $route = Route::create([
        'destination' => $routeData['destination'],
        'origin' => $routeData['origin'],
        'city_list_id' => $routeData['city_list_id'],
        'twoway' => $routeData['twoway']
      ]);
      
      DB::commit();

      return $route;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateRoute($routeData){
    $route = Route::find($routeData['trip_id']);

    $trip-> destination = $routeData['destination'];
    $trip-> origin = $routeData['origin'];
    $trip-> city_list_id = $routeData['city_list_id'];
    $trip-> twoway = $routeData['twoway'];

    $route->save();
    return $route;  
  }
}


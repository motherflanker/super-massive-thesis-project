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
      ]);
      
      DB::commit();

      return $route;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateRoute($routeData){
    $route = Route::find($routeData['route_id']);

    $route-> destination = $routeData['destination'];
    $route-> origin = $routeData['origin'];
    $route-> city_list_id = $routeData['city_list_id'];

    $route->save();
    return $route;  
  }
}


<?php



namespace App\Services;

use App\Models\StopRoute;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class StopRouteService{
  public function createStopRoute($stopRouteData){
    try{
      DB::beginTransaction();
      $stopRoute = StopRoute::create([
        'stops_id' => $stopRouteData['stops_id'],
        'route_id' => $stopRouteData['route_id'],
        'time' => $stopRouteData['time'],
      ]);
      
      DB::commit();

      return $stopRoute;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateStopRoute($stopRouteData){
    $stopRoute = StopRoute::find($stopRouteData['rs_id']);
    if($stopRoute){
      $stopRoute-> route_id = $stopRouteData['route_id'];
      $stopRoute-> stops_id = $stopRouteData['stops_id'];
      $stopRoute-> time = $stopRouteData['time'];
      $stopRoute->save();
      return $stopRoute;  
    }
  }
}
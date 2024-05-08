<?php



namespace App\Services;

use App\Models\Trip;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;


class TripService{
  public function createTrip($tripData){
    try{
      DB::beginTransaction();
      $trip = Trip::create([
        'route_id' => $tripData['route_id'],
        'destination' => $tripData['destination'],
        'origin' => $tripData['origin'],
        'city_list_id' => $tripData['city_list_id'],
        'tripNumber'=> $tripData['tripNumber'],
        'status' => $tripData['status']
      ]);
      
      DB::commit();

      return $trip;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateTrip($tripData){
    $trip = Trip::find($tripData['trip_id']);

    $trip-> route_id = $tripData['route_id'];
    $trip-> destination = $tripData['destination'];
    $trip-> origin = $tripData['origin'];
    $trip-> city_list_id = $tripData['city_list_id'];
    $trip-> tripNumber = $tripData['tripNumber'];
    $trip-> status = $tripData['status'];
    

    $trip->save();
    return $trip;  
  }
}


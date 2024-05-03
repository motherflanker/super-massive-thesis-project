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
        'bus_id' => $tripData['bus_id'],
        'destination' => $tripData['destination'],
        'origin' => $tripData['origin'],
        'city_list_id' => $tripData['city_list_id'],
        'name' => $tripData['name'],
        'surname' => $tripData['surname'],
        'phone' => $tripData['phone'],
        'max_seats' => $tripData['max_seats'],
        'departure_DateTime' => $tripData['departure_DateTime'],
        'arrival_DateTime' => $tripData['arrival_DateTime'],
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
    $trip-> bus_id = $tripData['bus_id'];
    $trip-> destination = $tripData['destination'];
    $trip-> origin = $tripData['origin'];
    $trip-> city_list_id = $tripData['city_list_id'];
    $trip-> name = $tripData['name'];
    $trip-> surname = $tripData['surname'];
    $trip-> phone = $tripData['phone'];
    $trip-> max_seats = $tripData['max_seats'];
    $trip-> departure_DateTime = $tripData['departure_DateTime'];
    $trip-> arrival_DateTime = $tripData['arrival_DateTime'];

    $trip->save();
    return $trip;  
  }
}


<?php



namespace App\Services;

use App\Models\Travel;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;


class TravelService{
  public function createTravel($travelData){
    try{
      DB::beginTransaction();
      $travel = Travel::create([
        'trip_id' => $travelData['trip_id'],
        'tripNumber' => $travelData['tripNumber'],
        'destination' => $travelData['destination'],
        'origin' => $travelData['origin'],
        'name' => $travelData['name'],
        'surname'=> $travelData['surname'],
        'phone' => $travelData['phone'],
        'bus_id' => $travelData['bus_id'],
        'max_seats' => $travelData['max_seats'],
        'departure_DateTime' => $travelData['departure_DateTime'],
        'arrival_DateTime' => $travelData['arrival_DateTime'],
        'status' => $travelData['status'],
        'type' => $travelData['type'],
      ]);
      
      DB::commit();

      return $travel;
    }
    catch(Exception $exception){
      DB::rollBack();
      logger()->error($exception->getMessage());
    }
  }

  public function updateTravel($travelData){
    $travel = Travel::find($travelData['travel_id']);

    $travel-> trip_id = $travelData['trip_id'];
    $travel-> tripNumber = $travelData['tripNumber'];
    $travel-> destination = $travelData['destination'];
    $travel-> origin = $travelData['origin'];
    $travel-> name = $travelData['name'];
    $travel-> surname = $travelData['surname'];
    $travel-> phone = $travelData['phone'];
    $travel-> bus_id = $travelData['bus_id'];
    $travel-> max_seats = $travelData['max_seats'];
    $travel-> departure_DateTime = $travelData['departure_DateTime'];
    $travel-> arrival_DateTime = $travelData['arrival_DateTime'];
    $travel-> status = $travelData['status'];
    $travel-> type = $travelData['type'];
    

    $travel->save();
    return $travel;  
  }
}


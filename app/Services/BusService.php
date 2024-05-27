<?php



namespace App\Services;

use Exception;
use Illuminate\Support\Facades\DB;

use App\Models\Bus;


class BusService{
  public function createBus($busData){
    try{
      DB::beginTransaction();
      $bus = Bus::create([
        'name' => $busData['name'], 
        'plate_number' => $busData['plate_number'],
        'max_seats' => $busData['max_seats'],
        'status' => $busData['status'],
        'latitude' => $busData['latitude'],
        'longitude' => $busData['longitude']
      ]);

      DB::commit();

      return $bus;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateLocation($bus_id, $latitude, $longitude){
    $bus = Bus::findOrFail($bus_id);
    $bus->update([
      'latitude' => $latitude,
      'longitude' => $longitude
    ]);
  }

  public function updateBus($busData){
    $bus = Bus::find($busData['bus_id']);

    $bus-> name = $busData['name'];
    $bus-> plate_number = $busData['plate_number'];
    $bus-> max_seats = $busData['max_seats'];
    $bus-> status = $busData['status'];
    $bus-> latitude = $busData['latitude'];
    $bus-> longitude = $busData['longitude'];

    $bus->save();
    return $bus;
  }
}
<?php



namespace App\Services;

use App\Models\City;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class CityService{
  public function createCity($cityData){
    try{
      DB::beginTransaction();
      $city = City::create([
        'name' => $cityData['name'],
      ]);
      
      DB::commit();

      return $city;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateCity($cityData){
    $city = City::find($cityData['city_id']);

    $city-> name = $cityData['name'];

    $city->save();
    return $city;  
  }
}
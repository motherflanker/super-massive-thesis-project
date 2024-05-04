<?php



namespace App\Services;

use App\Models\City;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class CityService{
  public function createRoute($cityData){
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

  public function updateRoute($cityData){
    $city = City::find($cityData['city_id']);

    $city-> name = $cityData['name'];

    $city->save();
    return $city;  
  }
}
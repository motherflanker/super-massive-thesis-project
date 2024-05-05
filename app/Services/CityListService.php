<?php



namespace App\Services;

use App\Models\CityList;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class CityListService{
  public function createCityList($cityListData){
    try{
      DB::beginTransaction();
      $cityList = [];

      for ($i = 1; $i <= 8; $i++) {
        if (!empty($cityListData['city_id'.$i])) {
            $cityList['city_id'.$i] = $cityListData['city_id'.$i];
        }
      } 
      $createdCityList = CityList::create($cityList);
      
      DB::commit();

      return $createdCityList;
    }
    catch(Exception $exception){
      DB::rollBack();
      logger()->error($exception->getMessage());
    }
  }

  public function updateCityList($cityListData){
    $citylist = CityList::find($cityListData['city_list_id']);

    foreach ($cityListData as $key => $value) {
        if ($key !== 'city_list_id') {
            $citylist->$key = $value;
        }
    }

    $citylist->save();
    
    return $citylist;
  }
}
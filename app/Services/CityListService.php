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
      $citylist = CityList::create([
        'city_id1' => $cityListData['city_id1'],
        'city_id2' => $cityListData['city_id2'],
        'city_id3' => $cityListData['city_id3'],
        'city_id4' => $cityListData['city_id4'],
        'city_id5' => $cityListData['city_id5'],
        'city_id6' => $cityListData['city_id6'],
        'city_id7' => $cityListData['city_id7'],
        'city_id8' => $cityListData['city_id8'],
      ]);
      
      DB::commit();

      return $citylist;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateCityList($cityListData){
    $citylist = CityList::find($cityListData['city_list_id']);

    $citylist-> city_id1 = $cityListData['city_id1'];
    $citylist-> city_id2 = $cityListData['city_id2'];
    $citylist-> city_id3 = $cityListData['city_id3'];
    $citylist-> city_id4 = $cityListData['city_id4'];
    $citylist-> city_id5 = $cityListData['city_id5'];
    $citylist-> city_id6 = $cityListData['city_id6'];
    $citylist-> city_id7 = $cityListData['city_id7'];
    $citylist-> city_id8 = $cityListData['city_id8'];

    $citylist->save();
    return $citylist;  
  }
}
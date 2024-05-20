<?php



namespace App\Services;

use App\Models\Stop;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class StopService{
  public function createStop($stopData){
    try{
      DB::beginTransaction();
      $stop = Stop::create([
        'name' => $stopData['name'],
        'city_id' => $stopData['city_id'],
      ]);
      
      DB::commit();

      return $stop;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateStop($stopData){

    $stopData['stop_id'] = (int) $stopData['stop_id'];

    $stop = Stop::find($stopData['stop_id']);
    

    if($stop){
      $stop-> name = $stopData['name'];
      $stop-> city_id = $stopData['city_id'];
      $stop->save();
      return $stop;  
    }
    \Log::error('Stop not found for ID:', ['stop_id' => $stopData['stop_id']]);
    throw new \Exception('Stop not found.');
  }
}
<?php



namespace App\Services;

use Exception;
use Illuminate\Support\Facades\DB;

use App\Models\TechReport;


class TechReportService {
  public function createTechReport($reportData){
    try{
      DB::beginTransaction();
      $techreport = TechReport::create([
        'bus_id' => $reportData['bus_id'],
        'text' => $reportData['text'],
        'isDone' => $reportData['isDone'],
        'price' => $reportData['price']
      ]);

      DB::commit();

      return $techreport;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateTechReport($reportData){
    $techreport = TechReport::find($reportData['report_id']);

    $techreport -> bus_id = $reportData['bus_id'];
    $techreport -> text = $reportData['text'];
    $techreport -> isDone = $reportData['isDone'];
    $techreport -> price = $reportData['price'];

    $techreport->save();
    return $techreport;
  }
}
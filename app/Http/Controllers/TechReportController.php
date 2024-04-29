<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use App\Models\TechReport;

use App\Services\TechReportService;

use Inertia\Inertia;


class TechReportController extends Controller
{
  private TechReportService $techReportService;
  private $rules = [];

  public function __construct(TechReportService $techReportService){
    $this->techReportService = $techReportService;
    $this->rules = [
      'bus_id' => 'required',
      'text' => 'required|max:99',
      'isDone' => 'nullable|boolean',
      'price' => 'required|integer'
    ];
  }

  public function view(TechReport $techReport){
    return Inertia::render('TechReportCard')->with('techReport', $techReport);
  }

  public function store(Request $request): RedirectResponse{
    $data = $request->validate($this->rules);
    $this->techReportService->createTechReport($data);
    return Redirect::route('buses.view');
  }

  public function update(Request $request){
    $rules = $this->rules;
    $rules['report_id'] = 'required|exists:techreports,report_id';
    $data = $request->validate($rules);
    $this->techReportService->updateTechReport($data);
    return Redirect::route('buses.view');
  }

  public function destroy(Request $request){
    $data = $request->validate(['report_id' => 'required']);
    TechReport::findOrFail($data['report_id'])->delete();
    return Redirect::route('buses.view');
  }
}

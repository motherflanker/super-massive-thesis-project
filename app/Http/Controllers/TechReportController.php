<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use App\Models\Bus;
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
      'price' => 'required|integer',
      'startsAt' => 'required',
      'endsAt' => 'required',
    ];
  }

  public function add(Request $request){ //useless
    return Inertia::render('TechReportsAdd');
  }

  public function view(TechReport $techReport){    
    return Inertia::render('')->with('techreport', $techReport);
  }

  public function index(){
    $buses = DB::table('buses')->orderBy('created_at', 'asc')->paginate(10);
    $techreports = DB::table('techreports')->orderBy('created_at', 'asc')->paginate(10);
    $data = ['buses' => $buses, 'techreports' => $techreports];
    return Inertia::render('TestPage')->with($data);
  }  

  public function store(Request $request): RedirectResponse{
    $data = $request->validate($this->rules);
    $this->techReportService->createTechReport($data);
    return Redirect::route('buses.list');
  }

  public function update(Request $request){
    $rules = $this->rules;
    $rules['report_id'] = 'required|exists:techreports,report_id';
    $data = $request->validate($rules);
    $this->techReportService->updateTechReport($data);
    return Redirect::route('buses.list');
  }

  public function destroy(Request $request){
    $data = $request->validate(['report_id' => 'required']);
    TechReport::findOrFail($data['report_id'])->delete();
    return Redirect::route('buses.list');
  }
}

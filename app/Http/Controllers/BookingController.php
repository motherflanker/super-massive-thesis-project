<?php

namespace App\Http\Controllers;

use App\Models\Booking;

use App\Services\BookingService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

use Inertia\Inertia;


class BookingController extends Controller
{
    private BookingService $bookingService;

    private $rules = [];

    public function __construct(BookingService $bookingService) {
      $this->bookingService = $bookingService;
      $this->rules = [
        'name' => 'required|min:2|max:15', 
        'surname' => 'required|min:2|max:24', 
        'phone' => 'required|size:11', 
        'email' => 'email|nullable',
        'passport' => 'required|size:10', 
        'price' => 'required|integer', 
        'destination' => 'required|min:2|max:30', 
        'origin' => 'required|min:2|max:30', 
        'travel_id' => 'required|integer', 
        'tripNumber' => 'required|integer',
        'plate_number'  => 'required|min:7|max:9',
        'departure_DateTime' => 'required|date_format:Y-m-d H:i:s',
        'arrival_DateTime' => 'required|date_format:Y-m-d H:i:s',
        'type' => 'required|string',
      ];
    }
    

    public function add(){
      $travels = DB::table('travels')->get();
      return Inertia::render('BookingsAdd')->with('travels', $travels);
    }

    public function index(){
      $booking = DB::table('bookings')->orderBy('created_at', 'desc')->paginate(10);

      return Inertia::render('Bookings')->with('bookings', $booking);
    }

    public function view(Booking $booking) {
      $travels = DB::table('travels')->get();
      $data = ['travels' => $travels, 'booking' => $booking];
      return Inertia::render('BookingsView')->with($data);
    }

    public function store(Request $request): RedirectResponse
    {
      $data = $request->validate($this->rules); 
      $this->bookingService->createBooking($data);
      return Redirect::route('bookings.list');
    }

    public function update(Request $request)
    {
      $rules = $this->rules;
      $rules['booking_id'] = 'required|exists:bookings,booking_id';
      $data = $request->validate($rules);
      $this->bookingService->updateBooking($data);
      return Redirect::route('bookings.list');
    }

    public function destroy(Request $request)
    {
      $data = $request->validate([
        'booking_id' => 'required|integer'
      ]);
      Booking::findOrFail($data['booking_id'])->delete();
      return Redirect::route('bookings.list');
    }

    public function statistics(Request $request)
    {
      \Log::info('Entering statistics method');
      \Log::info('Request Query Parameters:', $request->query());

      $startDate = $request->query('startDate');
      $endDate = $request->query('endDate');

      if (!$startDate || !$endDate) {
          $startDate = Carbon::now()->subDays(30)->format('Y-m-d');
          $endDate = Carbon::now()->format('Y-m-d');
      }

      $validatedData = $request->validate([
          'startDate' => 'required|date_format:Y-m-d',
          'endDate' => 'required|date_format:Y-m-d',
      ]);

      \Log::info("Validated dates: $startDate to $endDate");

      try {
          $totalBookings = DB::table('bookings')
              ->whereBetween('created_at', [$startDate, $endDate])
              ->count();

          \Log::info('Total Bookings:', ['totalBookings' => $totalBookings]);

          $totalRevenue = DB::table('bookings')
              ->whereBetween('created_at', [$startDate, $endDate])
              ->sum('price');

          \Log::info('Total Revenue:', ['totalRevenue' => $totalRevenue]);

          $bookingsData = DB::table('bookings')
              ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'), DB::raw('SUM(price) as revenue'))
              ->whereBetween('created_at', [$startDate, $endDate])
              ->groupBy(DB::raw('DATE(created_at)'))
              ->get();

          \Log::info('Bookings Data:', $bookingsData->toArray());

          $lastMonthStart = now()->subMonth()->startOfMonth()->toDateString();
          $lastMonthEnd = now()->subMonth()->endOfMonth()->toDateString();

          $lastMonthRevenue = DB::table('bookings')
            ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->sum('price');

    \Log::info('Last Month Revenue Data:', [$lastMonthRevenue]);

          return Inertia::render('BookingStatistics', [
              'totalBookings' => $totalBookings,
              'totalRevenue' => $totalRevenue,
              'bookingsData' => $bookingsData,
              'lastMonthRevenue' => $lastMonthRevenue,
              'startDate' => $startDate,
              'endDate' => $endDate,
          ]);

      } catch (\Exception $e) {
          \Log::error('Error fetching statistics:', ['error' => $e->getMessage()]);
          return response()->json(['error' => 'An error occurred while fetching statistics.'], 500);
      }
    }


    // public function statistics(Request $request)
    // {
    //   return Inertia::render('BookingStatistics', [
    //     'totalBookings' => 36,
    //     'totalRevenue' => 36000,
    //     'bookingsData' => [
    //         ['date' => '2024-06-01', 'count' => 3, 'revenue' => 3000],
    //         ['date' => '2024-06-02', 'count' => 2, 'revenue' => 2000],
    //         ['date' => '2024-06-03', 'count' => 7, 'revenue' => 7000],
    //         ['date' => '2024-06-04', 'count' => 3, 'revenue' => 3000],
    //         ['date' => '2024-06-05', 'count' => 2, 'revenue' => 2000],
    //         ['date' => '2024-06-06', 'count' => 7, 'revenue' => 7000],
    //         ['date' => '2024-06-07', 'count' => 3, 'revenue' => 3000],
    //         ['date' => '2024-06-08', 'count' => 2, 'revenue' => 2000],
    //         ['date' => '2024-06-09', 'count' => 7, 'revenue' => 7000],
    //       ],
    //   ]);
    // }
}

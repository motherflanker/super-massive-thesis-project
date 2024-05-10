<?php

namespace App\Http\Controllers;

use App\Models\Booking;

use App\Services\BookingService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

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
    
    //date_format:Y-m-d H:i

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
}

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
        'name' => 'required|min:2',
        'surname' => 'required|min:2',
        'phone' => 'required|size:11',
        'email' => 'nullable|email',
        'passport' => 'required|size:10',
        'price' => 'required|integer',
        'destination' => 'required|min:2|max:30',
        'origin' => 'required|min:2|max:30',
        'trip_id' => 'required|integer',
        'departure_DateTime' => 'required|date_format:Y-m-d H:i',
        'arrival_DateTime' => 'required|date_format:Y-m-d H:i',
      ];
    }

    public function add(){
      return Inertia::render('BookingsAdd');
    }

    public function index(){
      $booking = DB::table('booking')->orderBy('created_at', 'desc')->paginate(10);

      return Inertia::render('Bookings')->with('booking', $booking);
    }

    public function view(Booking $booking) {
      return Inertia::render('BookingsView')->with('booking', $booking);
    }

    public function store(Request $request): RedirectResponse
    {
      //im unsure what the fuck that is and what it wants me to do to work
      //$datetime = Carbon::parse('YYYY-MM-DD')->format('Y-m-d H:i:s');
      //date_format:Y-m-d\TH:i:s

      $data = $request->validate($this->rules);
      $this->bookingService->createBooking($data);
      return Redirect::route('bookings.list');
    }

    public function update(Request $request)
    {
      $rules = $this->rules;
      $rules['booking_id'] = 'required|exists:booking_id';
      $data = $request->validate($rules);
      $this->bookingService->updateBooking($data);
      return Redirect::route('bookings.list');
    }

    public function destroy(Request $request)
    {
      $data = $request->validate(['booking_id' => 'required']);
      Booking::findOrFail($data['booking_id'])->delete();
      return Redirect::route('bookings.list');
    }
}

<?php



namespace App\Services;

use App\Models\Booking;
use Exception;
use Illuminate\Support\Facades\DB;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class BookingService{
  public function createBooking($bookingData) {
    try{
      DB::beginTransaction();
      $booking = Booking::create([
        'name' => $bookingData['name'],
        'surname' => $bookingData['surname'],
        'phone' => $bookingData['phone'],
        'email' => $bookingData['email'],
        'passport' => $bookingData['passport'],
        'price' => $bookingData['price'],
        'destination' => $bookingData['destination'],
        'origin' => $bookingData['origin'],
        'travel_id' => $bookingData['travel_id'],
        'departure_DateTime' => $bookingData['departure_DateTime'],
        'arrival_DateTime' => $bookingData['arrival_DateTime'],
      ]);

      // ISSUE: the commit doesn't hit if any of the above queries fail, 
      // which means the problem is probably here
      // its either ID generation problem or whatever OR some query is fucked up
      // edit: look at the comment in the BookingController
      
      DB::commit();

      return $booking;
    }
    catch(Exception $exception){
      logger()->error($exception->getMessage());
    }
  }

  public function updateBooking($bookingData){
    $booking = Booking::find($bookingData['booking_id']);

    $booking-> name = $bookingData['name'];
    $booking-> surname = $bookingData['surname'];
    $booking-> phone = $bookingData['phone'];
    $booking-> email = $bookingData['email'];
    $booking-> passport = $bookingData['passport'];
    $booking-> price = $bookingData['price'];
    $booking-> destination = $bookingData['destination'];
    $booking-> origin = $bookingData['origin'];
    $booking-> travel_id = $bookingData['travel_id'];
    $booking-> departure_DateTime = $bookingData['departure_DateTime'];
    $booking-> arrival_DateTime = $bookingData['arrival_DateTime'];

    $booking->save();
    return $booking;  
  }
}
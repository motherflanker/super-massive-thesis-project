<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Booking extends Model{
    use HasFactory;

    protected $table = 'bookings';
    public $timestamps = false;
    protected $primaryKey = 'booking_id';

    protected $fillable = [
        'name',
        'surname',
        'phone',
        'email',
        'passport',
        'price',
        'destination',
        'origin',
        'travel_id',
        'tripNumber',
        'departure_DateTime',
        'arrival_DateTime',
        'type',
        'plate_number'
    ];
}

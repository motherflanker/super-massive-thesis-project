<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Booking extends Model{
  use HasFactory;

  protected $table = 'trips';
  public $timestamps = false;
  protected $primaryKey = 'trip_id';

  protected $fillable = [
      'route_id',
      'bus_id',
      'destination',
      'origin',
      'city_list_id',
      'name',
      'surname',
      'phone',
      'max_seats',
      'departure_DateTime',
      'arrival_DateTime',
  ];
}
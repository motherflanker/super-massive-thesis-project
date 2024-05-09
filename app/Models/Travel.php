<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Travel extends Model{
  use HasFactory;

  protected $table = 'travels';
  public $timestamps = false;
  protected $primaryKey = 'travel_id';

  protected $fillable = [
    'trip_id'	,
    'tripNumber',
    'destination'	,
    'origin',	
    'name',	
    'surname',	
    'phone',	
    'bus_id',	
    'plate_number',
    'max_seats',	
    'departure_DateTime',	
    'arrival_DateTime',	
    'status',	
    'type',
  ];
}




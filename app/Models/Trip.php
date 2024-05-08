<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Trip extends Model{
  use HasFactory;

  protected $table = 'trips';
  public $timestamps = false;
  protected $primaryKey = 'trip_id';

  protected $fillable = [
      'route_id',
      'tripNumber',
      'destination',
      'origin',
      'city_list_id',
      'status'
  ];
}
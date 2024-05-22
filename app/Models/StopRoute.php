<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class StopRoute extends Model{
  use HasFactory;

  protected $table = 'routesstops';
  public $timestamps = false;
  protected $primaryKey = 'rs_id';

  protected $fillable = [
    'route_id',
    'stops_id',
    'time',
    'name',
  ];
}
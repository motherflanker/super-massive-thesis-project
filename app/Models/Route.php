<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Route extends Model{
  use HasFactory;

  protected $table = 'routes';
  public $timestamps = false;
  protected $primaryKey = 'route_id';

  protected $fillable = [
      'destination',
      'origin',
      'city_list_id',
      'twoway'
  ];
}
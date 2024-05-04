<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class CityList extends Model{
  use HasFactory;

  protected $table = 'city-lists';
  public $timestamps = false;
  protected $primaryKey = 'city_list_id';

  protected $fillable = [
    'city_id1',
    'city_id2',
    'city_id3',
    'city_id4',
    'city_id5',
    'city_id6',
    'city_id7',
    'city_id8',
  ];
}
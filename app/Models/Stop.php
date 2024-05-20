<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Stop extends Model{
  use HasFactory;

  protected $table = 'stops';
  public $timestamps = false;
  protected $primaryKey = 'stop_id';

  protected $fillable = [
    'name',
    'city_id'
  ];
}
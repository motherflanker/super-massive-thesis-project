<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Bus extends Model{
    use HasFactory;

    protected $table = 'buses';
    public $timestamps = false;
    protected $primaryKey = 'bus_id';

    protected $fillable = [
      'name', 
      'plate_number',
      'max_seats'
    ];
}

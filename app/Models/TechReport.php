<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechReport extends Model {
  use HasFactory;

  protected $table = 'techreports';
  public $timestamps = false;
  protected $primaryKey = 'report_id';

  protected $fillable = [
    'bus_id',
    'text',
    'isDone',
    'price',
    'startsAt',
    'endsAt'
  ];
}
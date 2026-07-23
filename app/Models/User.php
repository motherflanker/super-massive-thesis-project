<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;


class User extends Authenticatable{
  use HasApiTokens, HasFactory, Notifiable;

  protected $table = 'users';
  public $timestamps = false;
  protected $primaryKey = 'user_id';

  protected $fillable = [
    'name', 
    'surname',
    'patronymic',
    'birth_date',
    'phone',
    'email',
    'password',
    'role_id',
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function role(){
    return $this->belongsTo(Role::class);
  }

  public function setPasswordAttribute($value)
  {
      if (!Hash::needsRehash($value)) {
          $this->attributes['password'] = Hash::make($value);
      } else {
          $this->attributes['password'] = $value;
      }
  }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class LoginController extends Controller
{
  public function index(){
    return Inertia::render('LoginPage');
  }

  public function login(Request $request)
  {
    $credentials = $request->validate([
      'email' => 'required|email',
      'password' => 'required'
    ]);

    if (Auth::attempt($credentials)) {
      $request->session()->regenerate();
      return Redirect::route('home');
    }
    //issue: attempt doesnt work or just fails

    return back()->withErrors([
      'email' => 'The provided credentials do not match our records.',
    ]);
  }
}

<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('LoginPage');
    }

    public function login(Request $request)
    {
      \Log::info('login method entry');
        $credentials = $request->validate([
          'email' => ['required', 'string', 'email'],
          'password' => ['required', 'string'],
        ]);

        \Log::info('Credentials', ['email' => $credentials['email'], 'password' => $credentials['password']]);

        $user = User::where('email', $credentials['email'])->first();
        if ($user) {
            \Log::info('User found', ['email' => $credentials['email']]);
            \Log::info('Password hash in database', ['hash' => $user->password]);
            \Log::info('Password matches', ['matches' => Hash::check($credentials['password'], $user->password)]);
            
            if (Hash::check($credentials['password'], $user->password)) {
                \Log::info('Password matches, proceeding with Auth attempt');
            } else {
                \Log::info('Password does not match');
            }
        } else {
            \Log::info('User not found', ['email' => $credentials['email']]);
        }

        if (Auth::attempt($credentials)) {
          \Log::info('auth attemtp entry');
            $request->session()->regenerate();

            return redirect()->intended(route('home'));
        }

        \Log::info('auth attempt failed');

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
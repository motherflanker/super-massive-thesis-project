<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

use App\Models\Role;

class RoleMiddleware
{
  /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = Auth::user();
        Log::info('RoleMiddleware: Checking user roles', [
          'user' => $user ? $user->toArray() : null,
          'roles' => $roles,
        ]);

        if (!$user || ! in_array($user->role->name, $roles)) {
          \Log::info('Role Middleware: User is not authenticated or does not have the correct role.', [
            'user' => $user,
            'roles' => $roles,
          ]);
          abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}

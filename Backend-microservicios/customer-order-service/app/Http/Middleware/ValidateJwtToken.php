<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateJwtToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        try {
            $key = env('JWT_SECRET'); 
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            
            $request->merge(['user_data' => (array)$decoded]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Invalid Token',
                'real_error' => $e->getMessage(),
                'php_time' => time(),            
                'key_check' => substr(env('JWT_SECRET'), 0, 3) . '...'
            ], 401);
        }

        return $next($request);
    }
}

<?php

namespace Tests;

use Firebase\JWT\JWT;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{

    protected function getAuthHeaders()
    {
        $payload = [
            'iss' => 'dotnet-auth-service',
            'sub' => '123',
            'iat' => time(),
            'exp' => time() + 3600
        ];
        
        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');
        
        return ['Authorization' => "Bearer $jwt"];
    }
}

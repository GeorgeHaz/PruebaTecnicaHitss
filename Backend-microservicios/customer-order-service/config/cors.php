<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    
    // CAMBIO IMPORTANTE: Permitir todo origen (o pon 'http://localhost:4200')
    'allowed_origins' => ['*'], 
    
    'allowed_origins_patterns' => [],
    
    // CAMBIO IMPORTANTE: Permitir todos los headers (especialmente Authorization)
    'allowed_headers' => ['*'],
    
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
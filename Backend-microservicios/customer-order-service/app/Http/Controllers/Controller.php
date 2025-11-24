<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 * version="1.0.0",
 * title="API Clientes y Pedidos",
 * description="Documentación técnica del microservicio PHP"
 * )
 *
 * @OA\SecurityScheme(
 * securityScheme="bearerAuth",
 * type="http",
 * scheme="bearer",
 * bearerFormat="JWT",
 * description="Ingrese su token JWT aquí"
 * )
 */
abstract class Controller
{
    //
}

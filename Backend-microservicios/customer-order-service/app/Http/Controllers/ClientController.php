<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     /**
     * @OA\Get(
     * path="/api/clients",
     * summary="Listar clientes",
     * tags={"Clientes"},
     * security={{"bearerAuth":{}}},
     * @OA\Response(
     * response=200,
     * description="Lista de clientes recuperada",
     * @OA\JsonContent(
     * type="array",
     * @OA\Items(
     * @OA\Property(property="id", type="integer", example=1),
     * @OA\Property(property="first_name", type="string", example="Juan"),
     * @OA\Property(property="last_name", type="string", example="Pérez"),
     * @OA\Property(property="email", type="string", example="juan@test.com")
     * )
     * )
     * )
     * )
     */
    public function index(Request $request)
    {
        $query = Client::query();

        // Búsqueda simple
        if ($request->has('search') && $request->search != '') {
            $s = $request->search;
            $query->where(function($q) use ($s) {
                $q->where('first_name', 'LIKE', "%{$s}%")
                  ->orWhere('last_name', 'LIKE', "%{$s}%")
                  ->orWhere('email', 'LIKE', "%{$s}%");
            });
        }

        return $query->latest()->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

     /**
     * @OA\Post(
     * path="/api/clients",
     * summary="Crear un nuevo cliente",
     * tags={"Clientes"},
     * security={{"bearerAuth":{}}},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"first_name","last_name","email"},
     * @OA\Property(property="first_name", type="string", example="Juan"),
     * @OA\Property(property="last_name", type="string", example="Pérez"),
     * @OA\Property(property="email", type="string", format="email", example="juan@test.com"),
     * @OA\Property(property="phone", type="string", example="0991234567"),
     * @OA\Property(property="address", type="string", example="Av. Amazonas")
     * )
     * ),
     * @OA\Response(response=201, description="Cliente creado exitosamente"),
     * @OA\Response(response=422, description="Error de validación (Email duplicado)")
     * )
     */
    public function store(ClientRequest $request)
    {
        $client = Client::create($request->validated());
        return new ClientResource($client);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return new ClientResource($client);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

     /**
     * @OA\Put(
     * path="/api/clients/{id}",
     * summary="Actualizar información del cliente",
     * tags={"Clientes"},
     * security={{"bearerAuth":{}}},
     * @OA\Parameter(
     * name="id",
     * in="path",
     * description="ID del cliente",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * @OA\Property(property="first_name", type="string", example="Juan Editado"),
     * @OA\Property(property="last_name", type="string", example="Pérez"),
     * @OA\Property(property="phone", type="string", example="0990000000")
     * )
     * ),
     * @OA\Response(response=200, description="Cliente actualizado")
     * )
     */
    public function update(ClientRequest $request, Client $client)
    {
        $client->update($request->validated());
        return new ClientResource($client);
    }

    /**
     * Remove the specified resource from storage.
     */

     /**
     * @OA\Delete(
     * path="/api/clients/{id}",
     * summary="Eliminar un cliente",
     * tags={"Clientes"},
     * security={{"bearerAuth":{}}},
     * @OA\Parameter(
     * name="id",
     * in="path",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(response=204, description="Cliente eliminado")
     * )
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['message' => 'Cliente eliminado correctamente'], 204);
    }
}

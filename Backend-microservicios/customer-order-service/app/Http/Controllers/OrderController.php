<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     /**
     * @OA\Get(
     * path="/api/orders",
     * summary="Listar ordenes",
     * tags={"Ordenes"},
     * security={{"bearerAuth":{}}},
     * @OA\Response(response="200", description="Lista de ordenes")
     * )
     */
    public function index(Request $request)
    {
        return Order::with('client')
        ->when($request->status, function ($q, $value) {
            $q->where('status', $value);
        })
        ->when($request->date, function ($q, $value) {
            $q->whereDate('order_date', $value);
        })
        ->when($request->client_id, function ($q, $value) {
            $q->where('client_id', $value);
        })
        ->latest()
        ->paginate(10);
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
     * path="/api/orders",
     * summary="Crear un nueva orden",
     * tags={"Ordenes"},
     * security={{"bearerAuth":{}}},
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * required={"client_id","order_date","total","status"},
     * @OA\Property(property="client_id", type="integer", example=1),
     * @OA\Property(property="order_date", type="string", format="date", example="2025-11-19"),
     * @OA\Property(property="total", type="number", format="float", example=100.50),
     * @OA\Property(property="status", type="string", example="pending")
     * )
     * ),
     * @OA\Response(response=201, description="Orden creada exitosamente"),
     * @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function store(OrderRequest $request)
    {
        $order = Order::create($request->validated());
        return response()->json($order, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * @OA\Put(
     * path="/api/orders/{id}",
     * summary="Actualizar información de la orden",
     * tags={"Ordenes"},
     * security={{"bearerAuth":{}}},
     * @OA\Parameter(
     * name="id",
     * in="path",
     * description="ID de la orden.",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\RequestBody(
     * required=true,
     * @OA\JsonContent(
     * @OA\Property(property="order_date", type="date", example="2025-11-19"),
     * @OA\Property(property="total", type="numeric", example="100.00"),
     * @OA\Property(property="status", type="string", example="pending")
     * )
     * ),
     * @OA\Response(response=200, description="Cliente actualizado")
     * )
     */
    public function update(OrderRequest $request, Order $order)
    {
        $order->update($request->validated());
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     */

     /**
     * @OA\Delete(
     * path="/api/orders/{id}",
     * summary="Eliminar un cliente",
     * tags={"Ordenes"},
     * security={{"bearerAuth":{}}},
     * @OA\Parameter(
     * name="id",
     * in="path",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(response=204, description="Orden eliminada")
     * )
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Pedido eliminado'], 204);
    }
}

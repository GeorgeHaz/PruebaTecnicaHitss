<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/dashboard/stats",
     * summary="Obtener estadísticas generales y gráficas",
     * tags={"Dashboard"},
     * security={{"bearerAuth":{}}},
     * @OA\Response(
     * response=200,
     * description="Datos del dashboard recuperados exitosamente",
     * @OA\JsonContent(
     * @OA\Property(
     * property="kpis",
     * type="object",
     * description="Indicadores clave de rendimiento",
     * @OA\Property(property="total_orders", type="integer", example=150),
     * @OA\Property(property="active_clients", type="integer", example=45),
     * @OA\Property(property="pending_orders", type="integer", example=12),
     * @OA\Property(property="completed_orders", type="integer", example=130)
     * ),
     * @OA\Property(
     * property="charts",
     * type="object",
     * description="Datos para las gráficas",
     * @OA\Property(
     * property="orders_by_status",
     * type="object",
     * description="Conteo agrupado por estado",
     * example={"pending": 12, "completed": 130, "canceled": 8}
     * ),
     * @OA\Property(
     * property="activity_last_30_days",
     * type="array",
     * description="Ventas por día",
     * @OA\Items(
     * type="object",
     * @OA\Property(property="date", type="string", format="date", example="2023-11-20"),
     * @OA\Property(property="count", type="integer", example=5),
     * @OA\Property(property="income", type="number", format="float", example=540.50)
     * )
     * )
     * )
     * )
     * ),
     * @OA\Response(response=401, description="No autorizado (Token inválido o ausente)")
     * )
     */
    public function stats()
    {
        $totalOrders = Order::count();

        $activeClients = Client::has('orders')->count();

        $ordersByStatus = Order::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status => $item->total];
            });

        $isSqlLite = DB::connection()->getDriverName() === 'sqLite';

        $dateSql = $isSqlLite
            ? "strftime('%Y-%m-%d', order_date)"
            : 'CAST(order_date as DATE)';

        $salesActivity = Order::select(
            //DB::raw('CAST(order_date as DATE) as date'),
            DB::raw("$dateSql as date"),
            DB::raw('count(*) as count'),
            DB::raw('SUM(total) as income')
        )
            ->where('order_date', '>=', Carbon::now()->subDays(30))
            //->groupBy(DB::raw('CAST(order_date as DATE)'))
            ->groupBy(DB::raw($dateSql))
            ->orderBy('date', 'ASC')
            ->get();

        return response()->json([
            'kpis' => [
                'total_orders' => $totalOrders,
                'active_clients' => $activeClients,
                'pending_orders' => $ordersByStatus['pending'] ?? 0,
                'completed_orders' => $ordersByStatus['completed'] ?? 0,
            ],
            'charts' => [
                'orders_by_status' => $ordersByStatus,
                'activity_last_30_days' => $salesActivity
            ]
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
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

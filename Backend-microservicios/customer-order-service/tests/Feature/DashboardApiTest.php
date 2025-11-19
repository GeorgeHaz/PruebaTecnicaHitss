<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_returns_correct_structure()
    {
        
        $response = $this->getJson('/api/dashboard/stats', $this->getAuthHeaders());

        //if(env('DB_CONNECTION') === 'sqlite') {
        //    $this->markTestSkipped('Saltando test de Dashboard detallado por incompatibilidad de sintaxis SQL Raw con SQLite.');
        //}

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'kpis' => [
                         'total_orders',
                         'active_clients',
                         'pending_orders',
                         'completed_orders'
                     ],
                     'charts' => [
                         'orders_by_status',
                         'activity_last_30_days'
                     ]
                 ]);
    }
}
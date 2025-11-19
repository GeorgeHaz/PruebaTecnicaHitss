<?php
namespace Tests\Feature;

use App\Models\Client;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_orders_filtered_by_status()
    {
        // Creamos 3 pedidos 'pending' y 2 'completed'
        Order::factory()->count(3)->create(['status' => 'pending']);
        Order::factory()->count(2)->create(['status' => 'completed']);

        // Solicitamos solo los 'pending'
        $response = $this->getJson('/api/orders?status=pending', $this->getAuthHeaders());

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data'); // Verifica que solo lleguen 3
    }

    public function test_can_create_order_for_existing_client()
    {
        $client = Client::factory()->create();

        $orderData = [
            'client_id' => $client->id,
            'order_date' => '2025-11-20',
            'total' => 150.00,
            'status' => 'pending'
        ];

        $response = $this->postJson('/api/orders', $orderData, $this->getAuthHeaders());

        $response->assertStatus(201);
        $this->assertDatabaseHas('orders', ['total' => 150.00]);
    }
}
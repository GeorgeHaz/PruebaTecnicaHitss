<?php
namespace Tests\Feature;

use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_cannot_access_clients_without_token()
    {
        $response = $this->getJson('/api/clients');
        $response->assertStatus(401);
    }

    public function test_can_create_client()
    {
        $data = [
            'first_name' => 'Juan',
            'last_name' => 'Perez',
            'email' => 'juan@test.com',
            'phone' => '123456789',
            'address' => 'Calle Falsa 123'
        ];

        $response = $this->postJson('/api/clients', $data, $this->getAuthHeaders());

        $response->assertStatus(201)
                 ->assertJsonFragment(['email' => 'juan@test.com']);

        $this->assertDatabaseHas('clients', ['email' => 'juan@test.com']);
    }

    public function test_validates_duplicate_email()
    {
        Client::factory()->create(['email' => 'juan@test.com']);

        $data = Client::factory()->raw(['email' => 'juan@test.com']);
        
        $response = $this->postJson('/api/clients', $data, $this->getAuthHeaders());
        
        $response->assertStatus(422);
    }
}
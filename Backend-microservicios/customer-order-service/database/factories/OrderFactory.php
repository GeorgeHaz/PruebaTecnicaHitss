<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'client_id' => Client::factory(), // Crea un cliente automáticamente
            'order_date' => fake()->dateTimeBetween('-1 month', 'now'),
            'total' => fake()->randomFloat(2, 10, 500),
            'status' => fake()->randomElement(['pending', 'completed', 'canceled']),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'city' => fake()->city(),
            'state' => fake()->streetName(),
            'zip' => fake()->postcode(),
            'country' => fake()->country(),
            'telephone' => fake()->phoneNumber(),
            'address' => fake()->address(),
        ];
    }
}

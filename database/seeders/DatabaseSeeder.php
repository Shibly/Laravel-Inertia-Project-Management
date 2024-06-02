<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Mahmudur Rahman',
            'email' => 'shibly.phy@gmail.com',
            'password' => bcrypt('123456789'),
            'email_verified_at' => time()
        ]);

        $this->call([
            RoleSeeder::class,
            //UserSeeder::class
        ]);

        // Project::factory()->count(60)->hasTasks(60)->create();
        // Client::factory()->count(10)->create();
    }
}

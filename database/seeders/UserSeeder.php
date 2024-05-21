<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Mahmudur Rahman',
                'email' => 'shibly.phy@gmail.com',
                'password' => '123456789',
                'email_verified_at' => time(),
                'role' => 'admin',
            ],
            [
                'name' => 'John Dor',
                'email' => 'johndoe@gmail.com',
                'password' => '123456789',
                'email_verified_at' => time(),
                'role' => 'standard',
            ]
        ];


        foreach ($users as $user) {
            $created_user = User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => bcrypt($user['password']),
                'email_verified_at' => $user['email_verified_at']
            ]);

            $created_user->assignRole($user['role']);
        }
    }
}

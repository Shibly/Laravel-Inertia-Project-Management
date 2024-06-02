<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'admin']);
        $role_standard_user = Role::create(['name' => 'standard']);


        $permission_manage_users = Permission::create([
            'name' => 'manage_users'
        ]);

        $permission_manage_projects = Permission::create([
            'name' => 'manage_projects'
        ]);

        $permission_manage_tasks = Permission::create([
            'name' => 'manage_tasks'
        ]);

        $permission_manage_invoices = Permission::create([
            'name' => 'manage_invoice'
        ]);

        $permission_manage_clients = Permission::create([
            'name' => 'manage_clients'
        ]);

        $permission_manage_settings = Permission::create([
            'name' => 'manage_settings'
        ]);


        $permissions_admin = [
            $permission_manage_users,
            $permission_manage_projects,
            $permission_manage_tasks,
            $permission_manage_invoices,
            $permission_manage_clients,
            $permission_manage_settings
        ];


        $permissions_general_user = [$permission_manage_tasks];


        $role_admin->syncPermissions($permissions_admin);

        $role_standard_user->syncPermissions($permissions_general_user);
    }
}

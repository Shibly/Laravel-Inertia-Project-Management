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


        $permission_create_user = Permission::create([
            'name' => 'create user'
        ]);

        $permission_edit_user = Permission::create([
            'name' => 'edit user'
        ]);

        $permission_delete_user = Permission::create([
            'name' => 'delete user'
        ]);

        $permission_create_project = Permission::create([
            'name' => 'create project'
        ]);

        $permission_edit_project = Permission::create([
            'name' => 'edit project'
        ]);

        $permission_delete_project = Permission::create([
            'name' => 'delete project'
        ]);


        $permissions_admin = [$permission_create_user,
            $permission_edit_user,
            $permission_delete_user,
            $permission_create_project,
            $permission_edit_project,
            $permission_delete_project];


        $permissions_general_user = [$permission_create_project, $permission_edit_project, $permission_delete_project];


        $role_admin->syncPermissions($permissions_admin);

        $role_standard_user->syncPermissions($permissions_general_user);
    }
}

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
            'name' => 'manage users'
        ]);


        $permission_edit_user = Permission::create([
            'name' => 'edit user'
        ]);

        $permission_delete_user = Permission::create([
            'name' => 'delete user'
        ]);

        $permission_manage_projects = Permission::create([
            'name' => 'manage projects'
        ]);

        $permission_edit_project = Permission::create([
            'name' => 'edit project'
        ]);

        $permission_delete_project = Permission::create([
            'name' => 'delete project'
        ]);


        $permissions_admin = [$permission_manage_users,
            $permission_edit_user,
            $permission_delete_user,
            $permission_manage_projects,
            $permission_edit_project,
            $permission_delete_project];


        $permissions_general_user = [$permission_manage_projects, $permission_edit_project, $permission_delete_project];


        $role_admin->syncPermissions($permissions_admin);

        $role_standard_user->syncPermissions($permissions_general_user);
    }
}

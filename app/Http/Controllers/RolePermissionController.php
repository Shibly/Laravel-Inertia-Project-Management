<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignPermissionsRequest;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\updateRoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{


    /**
     * @return Response|ResponseFactory
     */
    public function getRoles(): Response|ResponseFactory
    {


        $query = Role::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $roles = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);


        return inertia("Role/Index", [
            'roles' => RoleResource::collection($roles)]);

    }


    /**
     * @return Response
     */

    public function addRole(): Response
    {
        return inertia("Role/Create");
    }


    /**
     * @param StoreRoleRequest $request
     * @return RedirectResponse
     */

    public function storeRole(StoreRoleRequest $request): RedirectResponse
    {

        $validated = $request->validated();
        Role::create(['name' => strtolower($validated['name'])]);


        return to_route('allRoles')
            ->with('success', 'New role has been created');

    }


    /**
     * @param Role $role
     * @return Response
     */
    public function editRole(Role $role): Response
    {

        return inertia("Role/Edit", [
            'role' => new RoleResource($role)
        ]);

    }


    public function updateRole(Role $role, UpdateRoleRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $role->name = strtolower($validated['name']);
        $role->save();
        return to_route('allRoles')->with('success', 'Role has been updated');
    }


    /**
     * @param Role $role
     * @return Response|ResponseFactory
     */
    public function assignPermissionsToRole(Role $role): Response|ResponseFactory
    {
        return inertia("Permission/Assign", [
            'permissions' => Permission::all(),
            'role' => $role->load('permissions')
        ]);
    }


    /**
     * @param StoreAssignPermissionsRequest $request
     * @param Role $role
     * @return RedirectResponse
     */
    public function assignPermissions(StoreAssignPermissionsRequest $request, Role $role): RedirectResponse
    {

        $validated = $request->validated();

        $permissions = Permission::whereIn('name', $validated['permissions'])->get();
        $role->permissions()->sync($permissions);

        return to_route('allRoles')->with('success', 'Permissions assigned successfully.');
    }


}

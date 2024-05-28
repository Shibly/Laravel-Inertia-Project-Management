<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;
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


}

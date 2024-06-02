<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory|RedirectResponse
    {


        if (!Auth::user()->can('manage_users')) {
            return to_route('dashboard')->with('warning', 'You do not have permission to access this page.');
        }


        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("User/Index", [
            "users" => UserCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("User/Create", [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        $created_user = User::create($data);

        /**
         * Set Role
         */

        if (isset($data['role_id'])) {
            $role = Role::findById($data['role_id']);
            $created_user->syncRoles($role);
        }


        return to_route('user.index')
            ->with('success', 'User was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }


    /**
     * @param User $user
     * @return RedirectResponse|Response|ResponseFactory
     */
    public function edit(User $user): Response|ResponseFactory|RedirectResponse
    {

        if (!Auth::user()->can('manage_users')) {
            return to_route('dashboard')->with('warning', 'You do not have permission to access this page.');
        }


        return inertia('User/Edit', [
            'user' => new UserCrudResource($user),
            'roles' => Role::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        /**
         * Now update the user role
         */

        if (isset($data['role_id'])) {
            $role = Role::findById($data['role_id']);
            $user->syncRoles($role);
        }

        return to_route('user.index')
            ->with('success', "User \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $name = $user->name;
        $user->delete();
        return to_route('user.index')
            ->with('success', "User \"$name\" was deleted");
    }
}

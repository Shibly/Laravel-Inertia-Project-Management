<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();  // Fetch the authenticated user
        if ($user) {
            $user->load('roles');
            $roles = $user->roles->pluck('name');
            $permissions = $user->getAllPermissions()->pluck('name');

        } else {
            $roles = collect();
            $permissions = collect();
        }

        return array_merge(parent::share($request), [
            'success' => fn() => $request->session()->get('success'),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $roles,
                    'permissions' => $permissions
                ] : null,
            ],
        ]);
    }


}

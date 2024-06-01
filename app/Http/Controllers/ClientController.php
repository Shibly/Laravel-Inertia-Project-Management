<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {

        $query = Client::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", request("email"));
        }

        $clients = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Client/Index", [
            "clients" => ClientResource::collection($clients),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }


    /**
     * @return Response|ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("Client/Create");
    }


    /**
     * @param StoreClientRequest $request
     * @return RedirectResponse
     */

    public function store(StoreClientRequest $request): RedirectResponse
    {
        $data = $request->validated();
        Client::create($data);

        return to_route('client.index')->with('success', 'Client created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }


    /**
     * @param Client $client
     * @return Response|ResponseFactory
     */

    public function edit(Client $client): Response|ResponseFactory
    {
        return inertia("Client/Edit", [
            'client' => new ClientResource($client)
        ]);
    }


    /**
     * @param UpdateClientRequest $request
     * @param Client $client
     * @return RedirectResponse
     */
    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $data = $request->validated();
        $client->update($data);
        return to_route('client.index')->with('success', 'Client updated successfully.');
    }


    /**
     * @param Client $client
     * @return RedirectResponse
     */
    public function destroy(Client $client): RedirectResponse
    {
        $name = $client->name;

        // Delete All the associated projects with the client first

        $client->projects()->delete();

        $client->delete();

        return to_route("client.index")->with('success', "Client $name  has been deleted.");


    }
}

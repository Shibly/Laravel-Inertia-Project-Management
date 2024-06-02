<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;

class InvoiceController extends Controller
{

    /**
     * @return Response|ResponseFactory
     */

    public function index(): Response|ResponseFactory
    {
        $invoices = Invoice::with('items')->get();
        return inertia("Invoice/Index", [
            'invoices' => InvoiceResource::collection($invoices)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("Invoice/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request): RedirectResponse
    {
        $invoice = $request->validated();
        foreach ($request->items as $item) {
            $invoice->items()->create($item);
        }

        return to_route('invoice.index')->with('message', 'Invoice has been successfully created');

    }


    /**
     * @param Invoice $invoice
     * @return Response|ResponseFactory
     */


    public function show(Invoice $invoice): Response|ResponseFactory
    {
        return inertia("Invoice/Show", [
            'invoice' => new InvoiceResource($invoice)
        ]);
    }


    /**
     * @param Invoice $invoice
     * @return Response|ResponseFactory
     */
    public function edit(Invoice $invoice): Response|ResponseFactory
    {
        return inertia("Invoice/Edit", [
            'invoice' => $invoice
        ]);
    }


    /**
     * @param UpdateInvoiceRequest $request
     * @param Invoice $invoice
     * @return RedirectResponse
     */

    public function update(UpdateInvoiceRequest $request, Invoice $invoice): RedirectResponse
    {
        $invoice->update($request->validated());

        $invoice->items()->delete();
        foreach ($request->items as $item) {
            $invoice->items()->create($item);
        }

        return to_route('invoice.index')->with('message', 'Invoice has been updated');

    }


    public function destroy(Invoice $invoice): RedirectResponse
    {
        $invoice->items()->delete();
        $invoice->delete();

        return to_route('invoice.index')->with('message', 'Invoice has been removed');
    }
}

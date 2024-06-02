<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
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
        $query = Invoice::query();


        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("invoice_number")) {
            $query->where("invoice_number", "like", "%" . request("invoice_number") . "%");
        }
        if (request("to")) {
            $query->where("to", request("to"));
        }


        $invoices = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);


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
     * @param StoreInvoiceRequest $request
     * @return RedirectResponse
     */

    public function store(StoreInvoiceRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        // Create the invoice
        $invoice = Invoice::create($validatedData);

        // Associate items with the invoice
        foreach ($validatedData['items'] as $item) {
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
            'invoice' => new InvoiceResource($invoice->load('items'))
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


    /**
     * @param Invoice $invoice
     * @return \Illuminate\Http\Response
     */
    public function download(Invoice $invoice): \Illuminate\Http\Response
    {
        $pdf = Pdf::loadView('invoices.pdf', compact('invoice'))->setPaper('a4');

        return $pdf->download('invoice_' . $invoice->invoice_number . '.pdf');
    }


}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{


    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'from' => $this->from,
            'to' => $this->to,
            'ship_to' => $this->ship_to,
            'date' => $this->date,
            'payment_terms' => $this->payment_terms,
            'due_date' => $this->due_date,
            'invoice_number' => $this->invoice_number,
            'notes' => $this->notes,
            'terms' => $this->terms,
            'tax' => $this->tax,
            'discount' => $this->discount,
            'shipping' => $this->shipping,
            'amount_paid' => $this->amount_paid,
            'balance_due' => $this->balance_due,
            'items' => InvoiceItemResource::collection($this->items),
        ];
    }
}

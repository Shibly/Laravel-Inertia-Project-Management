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
            'bill_to' => $this->to,
            'date' => date('M d, Y', strtotime($this->date)),
            'due_date' => date('M d, Y', strtotime($this->due_date)),
            'amount' => $this->amount_paid,
            'invoice_number' => $this->invoice_number,
            'created_at' => $this->created_at->toDateTimeString(),
            'invoice_status' => $this->invoice_status
        ];
    }
}

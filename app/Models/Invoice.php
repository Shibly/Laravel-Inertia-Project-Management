<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'from',
        'to',
        'ship_to',
        'date',
        'payment_terms',
        'due_date',
        'invoice_number',
        'tax',
        'discount',
        'shipping',
        'amount_paid',
        'balance_due',
        'notes',
        'terms'
    ];


    /**
     * @return HasMany
     */

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }


}

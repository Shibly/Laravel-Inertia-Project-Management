<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('from'); // Who is this invoice from?
            $table->string('to'); // Who is this invoice to?
            $table->string('ship_to')->nullable(); // Optional
            $table->date('date');
            $table->string('payment_terms')->nullable();
            $table->date('due_date')->nullable();
            $table->string('po_number')->nullable();
            $table->decimal('tax', 8, 2)->default(0); // Percentage of tax
            $table->decimal('discount', 8, 2)->default(0); // Discount amount
            $table->decimal('shipping', 8, 2)->default(0); // Shipping amount
            $table->decimal('amount_paid', 8, 2)->default(0); // Amount paid
            $table->decimal('balance_due', 8, 2)->default(0); // Balance due
            $table->text('notes')->nullable(); // Notes
            $table->text('terms')->nullable(); // Terms and conditions
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

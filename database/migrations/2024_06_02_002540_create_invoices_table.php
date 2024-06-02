<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('from');
            $table->string('to');
            $table->string('ship_to')->nullable();
            $table->date('date');
            $table->string('payment_terms')->nullable();
            $table->date('due_date')->nullable();
            $table->string('po_number')->nullable();
            $table->decimal('tax', 8, 2)->nullable();
            $table->decimal('discount', 8, 2)->nullable();
            $table->decimal('shipping', 8, 2)->nullable();
            $table->decimal('amount_paid', 8, 2)->default(0);
            $table->decimal('balance_due', 8, 2)->nullable();
            $table->text('notes')->nullable();
            $table->text('terms')->nullable();
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

<?php

use App\Models\Invoice;
use App\Models\Option;
use App\Models\Project;
use App\Models\Task;


function get_option($key)
{
    $system_settings = config('options');
    if ($key && isset($system_settings[$key])) {
        return $system_settings[$key];
    } else {
        return false;
    }
}


if (!function_exists('set_option')) {
    /**
     * Set a value for a given key in the options table.
     *
     * @param string $key
     * @param mixed $value
     * @return bool
     */
    function set_option(string $key, mixed $value): bool
    {

        $option = Option::where('key', $key)->first();

        if ($option) {
            $option->value = $value;
        } else {

            $option = new Option([
                'key' => $key,
                'value' => $value,
            ]);
        }

        // Save the option and return the success status
        return $option->save();
    }
}


if (!function_exists('getTasksSummary')) {
    function getTasksSummary(): array
    {
        $statuses = ['pending', 'in_progress', 'completed', 'on_hold', 'cancelled', 'revision'];
        $tasksSummary = [
            'total_tasks' => Task::count(),
        ];

        foreach ($statuses as $status) {
            $tasksSummary[$status] = Task::where('status', $status)->count();
        }

        return $tasksSummary;
    }
}


if (!function_exists('getProjectsSummary')) {
    function getProjectsSummary(): array
    {
        $statuses = ['pending', 'in_progress', 'completed', 'archived', 'on_hold'];
        $projectsSummary = [
            'total_projects' => Project::count()
        ];
        foreach ($statuses as $status) {
            $projectsSummary[$status] = Project::where('status', $status)->count();
        }

        return $projectsSummary;;
    }
}

if (!function_exists('getCurrentMonthPaidInvoiceAmount')) {
    function getCurrentMonthPaidInvoiceAmount(): array
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;

        $paidInvoices = Invoice::where('invoice_status', 'paid')
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear);

        $totalPaidAmount = $paidInvoices->sum('amount_paid');
        $invoiceCount = $paidInvoices->count();

        return [
            'invoice_count' => $invoiceCount,
            'total_paid_amount' => $totalPaidAmount,
        ];
    }
}





<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{


    /**
     * @return Response|ResponseFactory
     */
    function index(): Response|ResponseFactory
    {
        return inertia('Dashboard', [
            'tasksSummary' => getTasksSummary(),
            'projectsSummary' => getProjectsSummary(),
            'currentMonthPaidAmount' => getCurrentMonthPaidInvoiceAmount()
        ]);
    }
}

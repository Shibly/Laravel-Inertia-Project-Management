import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React from "react";

export default function Dashboard({auth, warning, success, tasksSummary, projectsSummary, currentMonthPaidAmount}) {

    const hasPermission = auth.user.permissions && auth.user.permissions.includes('view_dashboard_widgets');

    console.log(currentMonthPaidAmount);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}

                    {warning && (
                        <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
                            {warning}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-gray-900 text-white min-h-screen p-6">

                            {hasPermission && (
                                <>
                                    <div className="flex justify-center space-x-6 mb-6">
                                        {/* Projects Widget */}
                                        <div className="bg-gray-800 text-white rounded-lg p-4 flex-1">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">Projects</h2>
                                                <div className="text-right">
                                                    <span
                                                        className="text-3xl font-bold">{projectsSummary.total_projects}</span>
                                                    <p className="text-sm">Projects</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <ul className="space-y-2">
                                                    <li className="text-green-400">In
                                                        Progress: {projectsSummary.in_progress}</li>
                                                    <li className="text-red-400">Completed: {projectsSummary.completed}</li>
                                                    <li className="text-yellow-400">Archived: {projectsSummary.archived}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Tasks Widget */}
                                        <div className="bg-gray-800 text-white rounded-lg p-4 flex-1">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">Tasks</h2>
                                                <div className="text-right">
                                                    <span
                                                        className="text-3xl font-bold">{tasksSummary.total_tasks}</span>
                                                    <p className="text-sm">Tasks</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <ul className="space-y-2">
                                                    <li className="text-green-400">Completed: {tasksSummary.completed}</li>
                                                    <li className="text-yellow-400">In
                                                        Progress: {tasksSummary.in_progress}</li>
                                                    <li className="text-red-400">Pending: {tasksSummary.pending}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Clients Widget */}
                                        <div className="bg-gray-800 text-white rounded-lg p-4 flex-1">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">Clients</h2>
                                                <div className="text-right">
                                                    <span className="text-3xl font-bold">78</span>
                                                    <p className="text-sm">Clients</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <ul className="space-y-2">
                                                    <li className="text-green-400">Active: 65</li>
                                                    <li className="text-red-400">Inactive: 10</li>
                                                    <li className="text-yellow-400">Pending: 3</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Income Widget */}
                                    <div className="flex justify-center mb-6">
                                        <div className="bg-gray-800 text-white rounded-lg p-4 flex-1">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">Income This Month</h2>
                                                <div className="text-right">
                                                    <span
                                                        className="text-3xl font-bold">{currentMonthPaidAmount.invoice_count}</span>
                                                    <p className="text-sm">Invoices</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <ul className="space-y-2">
                                                    <li className="text-green-400">Amount:
                                                        $ {currentMonthPaidAmount.total_paid_amount}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                </div>
            </div>

        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

export default function Dashboard({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-gray-900 text-white min-h-screen p-6">
                            <div className="flex justify-center space-x-6">

                                {/*Projects Widget*/}
                                <div className="bg-gray-800 text-white rounded-lg p-4 w-64">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">Projects</h2>
                                        <div className="text-right">
                                            <span className="text-3xl font-bold">78</span>
                                            <p className="text-sm">items</p>
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

                                {/*Tasks Widget*/}
                                <div className="bg-gray-800 text-white rounded-lg p-4 w-64">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">Tasks</h2>
                                        <div className="text-right">
                                            <span className="text-3xl font-bold">120</span>
                                            <p className="text-sm">items</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <ul className="space-y-2">
                                            <li className="text-green-400">Completed: 90</li>
                                            <li className="text-yellow-400">Ongoing: 20</li>
                                            <li className="text-red-400">Pending: 10</li>
                                        </ul>
                                    </div>
                                </div>

                                {/*Clients Widget*/}
                                <div className="bg-gray-800 text-white rounded-lg p-4 w-64">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">Clients</h2>
                                        <div className="text-right">
                                            <span className="text-3xl font-bold">78</span>
                                            <p className="text-sm">items</p>
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
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

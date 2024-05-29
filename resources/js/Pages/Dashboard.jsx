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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Projects Widget */}
                                <div
                                    className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300">
                                    <h3 className="text-lg font-semibold mb-4">Projects</h3>
                                    <hr className="border-gray-600 mb-4"/>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-md text-green-400">Completed</span>
                                            <span className="text-green-400 text-lg font-bold">12</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-md text-yellow-400">Ongoing</span>
                                            <span className="text-yellow-400 text-lg font-bold">8</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-md text-red-400">Pending</span>
                                            <span className="text-red-400 text-lg font-bold">4</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tasks Widget */}
                                <div
                                    className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300">
                                    <h3 className="text-lg font-semibold mb-4">Tasks</h3>
                                    <hr className="border-gray-600 mb-4"/>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-md text-green-400">Completed</span>
                                            <span className="text-green-400 text-lg font-bold">90</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-md text-yellow-400">Ongoing</span>
                                            <span className="text-yellow-400 text-lg font-bold">20</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-md text-red-400">Pending</span>
                                            <span className="text-red-400 text-lg font-bold">10</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Users Widget */}
                                <div
                                    className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300">
                                    <h3 className="text-lg font-semibold mb-4">Users</h3>
                                    <hr className="border-gray-600 mb-4"/>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-md text-green-400">Active</span>
                                            <span className="text-green-400 text-lg font-bold">65</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-md text-red-400">Inactive</span>
                                            <span className="text-red-400 text-lg font-bold">10</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-md text-yellow-400">Pending</span>
                                            <span className="text-yellow-400 text-lg font-bold">3</span>
                                        </div>
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

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


                                {/*Projects widget*/}

                                <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300 mt-6 min-h-[250px]">
                                    <h3 className="text-lg font-semibold mb-4">Projects</h3>
                                    <hr className="border-gray-600 mb-4"/>
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Count</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-green-400">Active</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-green-400">65</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-red-400">Inactive</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-red-400">10</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-yellow-400">Pending</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-yellow-400">3</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/*Tasks widgets*/}

                                <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300 mt-6 min-h-[250px]">
                                    <h3 className="text-lg font-semibold mb-4">Tasks</h3>
                                    <hr className="border-gray-600 mb-4"/>
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Count</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-green-400">Completed</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-green-400">90</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-yellow-400">Ongoing</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-yellow-400">20</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-red-400">Pending</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-red-400">10</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>


                                {/*Users widget*/}

                                <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300 mt-6 min-h-[250px]">
                                    <h3 className="text-lg font-semibold mb-4">Users</h3>
                                    <hr className="border-gray-600 mb-4"/>
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Count</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-green-400">Active</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-green-400">65</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-red-400">Inactive</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-red-400">10</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-yellow-400">Pending</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-yellow-400">3</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

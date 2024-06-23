import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP,} from "@/constants.jsx";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export default function Show({auth, client}) {

    const deleteProject = (project) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete the project? Deleting the project will delete all the associated tasks as well.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("project.destroy", project.id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Client
                Details</h2>}
        >
            <Head title="Client Details"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-900">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{client.name}</h3>

                            <table
                                className="table-auto w-full mb-8 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2 font-semibold border border-gray-200 dark:border-gray-700">Address:</td>
                                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">{client.address}, {client.city}, {client.state}, {client.zip}, {client.country}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold border border-gray-200 dark:border-gray-700">Email:</td>
                                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">{client.email}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold border border-gray-200 dark:border-gray-700">Telephone:</td>
                                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">{client.telephone}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold border border-gray-200 dark:border-gray-700">Joined:</td>
                                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">{client.created_at}</td>
                                </tr>
                                </tbody>
                            </table>

                            <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-800 dark:text-gray-200">Projects</h3>
                            <div className="overflow-x-auto">
                                <table
                                    className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">ID
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">Name
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">Status
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">Create
                                            Date
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">Due
                                            Date
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">Created
                                            By
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody
                                        className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {client.projects.map((project) => (
                                        <tr key={project.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">{project.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200 border border-gray-200 dark:border-gray-700">{project.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                                                <span
                                                    className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200 border border-gray-200 dark:border-gray-700">{project.created_at}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200 border border-gray-200 dark:border-gray-700">{project.due_date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200 border border-gray-200 dark:border-gray-700">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route("project.edit", project.id)}
                                                        className="w-full px-2 py-1 bg-orange-500 text-white text-center font-medium text-sm rounded hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) => deleteProject(project)}
                                                        className="w-full px-2 py-1 bg-red-500 text-white text-center font-medium text-sm rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                                                        Delete
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

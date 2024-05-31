import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP,} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";

export default function Show({auth, success, project, tasks, queryParams}) {

    console.log(project);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Project "${project.name}"`}
                    </h2>
                    <Link
                        href={route("project.edit", project.id)}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Edit
                    </Link>
                </div>
            }>
            <Head title={`Project "${project.name}"`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="px-2 py-1 rounded text-sm">
                                    Client Name : <span className="rounded text-white bg-indigo-500 dark:bg-indigo-700 px-2 py-1">{project.client.name}</span>

                                </span>
                            </div>


                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <table
                                    className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:border-gray-700 text-sm">
                                    <tbody>
                                    <tr>
                                        <td className="font-bold border-b border-gray-300 dark:border-gray-700 p-4">Number
                                            of tasks
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-4">{project.number_of_tasks}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold border-b border-gray-300 dark:border-gray-700 p-4">Project
                                            Name
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-4">{project.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold border-b border-gray-300 dark:border-gray-700 p-4">Project
                                            Status
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-4">
                                    <span
                                        className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                    </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold border-b border-gray-300 dark:border-gray-700 p-4">Created
                                            By
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-4">{project.createdBy.name}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table
                                    className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:border-gray-700 text-sm">
                                    <tbody>
                                    <tr>
                                        <td className="font-bold border-b border-gray-300 dark:border-gray-700 p-4">Due
                                            Date
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-4">{project.due_date}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold border-b border-gray-300 dark:border-gray-700 p-4">Create
                                            Date
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-4">{project.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold border-b border-gray-300 dark:border-gray-700 p-4">Updated
                                            By
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-4">{project.updatedBy.name}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-12">
                                <h2 className="text-xl font-bold mb-4">Project Description</h2>
                                <div
                                    className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700">
                                    <p className="text-gray-900 dark:text-gray-100">{project.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable
                                tasks={tasks}
                                success={success}
                                queryParams={queryParams}
                                hideProjectColumn={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

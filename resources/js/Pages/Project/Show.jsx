import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP,} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";

export default function Show({auth, success, project, tasks, queryParams}) {
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
                        <div>
                            <img
                                src={project.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-6 grid-cols-2">
                                <table
                                    className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:border-gray-700">
                                    <tbody>
                                    <tr>
                                        <td className="font-bold text-lg border-b border-gray-300 dark:border-gray-700 p-2">
                                            Number of tasks
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-2">{project.number_of_tasks}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold text-lg border-b border-gray-300 dark:border-gray-700 p-2">Project
                                            Name
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-2">{project.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold text-lg border-b border-gray-300 dark:border-gray-700 p-2">Project
                                            Status
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-2">
                                    <span
                                        className={
                                            "px-2 py-1 rounded text-white " +
                                            PROJECT_STATUS_CLASS_MAP[project.status]
                                        }
                                    >
                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                    </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold text-lg border-b border-gray-300 dark:border-gray-700 p-2">Created
                                            By
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-2">{project.createdBy.name}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table
                                    className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:border-gray-700">
                                    <tbody>
                                    <tr>
                                        <td className="font-bold text-lg border-b border-gray-300 dark:border-gray-700 p-2">Due
                                            Date
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-2">{project.due_date}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold text-lg border-b border-gray-300 dark:border-gray-700 p-2">Create
                                            Date
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-2">{project.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold text-lg border-b border-gray-300 dark:border-gray-700 p-2">Updated
                                            By
                                        </td>
                                        <td className="border-b border-gray-300 dark:border-gray-700 p-2">{project.updatedBy.name}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold text-lg">Project Description</label>
                                <p className="mt-2">{project.description}</p>
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

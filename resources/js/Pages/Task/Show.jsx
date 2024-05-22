import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Show({auth, task}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Task "${task.name}"`}
                    </h2>
                    <Link
                        href={route("task.edit", task.id)}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`Task "${task.name}"`}/>
            <div className="py-12 bg-gray-800">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-lg sm:rounded-lg">
                        {/*<div>*/}
                        {/*    <img src={task.image_path} alt="" className="w-full h-64 object-cover rounded-t-lg"/>*/}
                        {/*</div>*/}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="min-w-full table-auto">
                                <tbody>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Task
                                        ID
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.id}</td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Due
                                        Date
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.due_date}</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Task
                                        Name
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.name}</td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Created
                                        On
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.created_at}</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Task
                                        Status
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">
                                <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                                    </td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Updated
                                        By
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.updatedBy.name}</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Task
                                        Priority
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">
                                <span
                                    className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                </span>
                                    </td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">Project</th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">
                                        <Link href={route("project.show", task.project.id)}
                                              className="hover:underline text-blue-500">
                                            {task.project.name}
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4">Created By</th>
                                    <td className="p-4">{task.createdBy.name}</td>
                                    <th className="text-left font-semibold text-lg p-4">Assigned User</th>
                                    <td className="p-4">{task.assignedUser.name}</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 whitespace-nowrap">Task
                                        Description
                                    </th>
                                    <td className="p-4" colSpan="3">{task.description}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}

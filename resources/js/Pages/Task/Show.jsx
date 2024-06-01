import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm} from "@inertiajs/react";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Show({auth, task}) {

    const {data, setData, post, errors} = useForm({
        reply: '',
        attachment: null,
        replied_by: auth.user.id,
        task_id: task.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reply.store'), {
            data,
            onSuccess: () => {
                setData({...data, reply: '', attachment: null});
            },
        });
    };

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
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="min-w-full table-auto">
                                <tbody>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Attachment
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">
                                        {task.task_attachment ? (
                                            <a className="dark:text-blue-500 hover:underline"
                                               href={task.task_attachment} download={task.task_attachment}
                                               style={{textDecoration: 'none'}}>
                                                Download Attachment
                                            </a>
                                        ) : (
                                            <span>No Attachment</span>
                                        )}
                                    </td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Due Date
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.due_date}</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Task Name
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.name}</td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Created On
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.created_at}</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Task Status
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">
                                <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                                    </td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Updated By
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">{task.updatedBy.name}</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-800">
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Task Priority
                                    </th>
                                    <td className="p-4 border-b border-gray-300 dark:border-gray-700">
                                <span
                                    className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                </span>
                                    </td>
                                    <th className="text-left font-semibold text-lg p-4 border-b border-gray-300 dark:border-gray-700">
                                        Project
                                    </th>
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
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-lg sm:rounded-lg mt-8 p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Task
                            Description</h3>
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg mb-8">
                            <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-lg sm:rounded-lg mt-8 p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Replies</h3>
                        <div className="space-y-4 mb-6">
                            {task.replies.map(reply => (
                                <div key={reply.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
                                    <p className="text-gray-700 dark:text-gray-300">{reply.reply}</p>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        <span>Replied by: {reply.replied_by.name}</span>
                                        <span className="ml-4">On: {reply.created_at}</span>
                                    </div>
                                    {reply.attachment_path && (
                                        <div className="mt-2">
                                            <a href={reply.attachment_path} download
                                               className="text-blue-500 hover:underline">
                                                Download Attachment
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="reply"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Write your reply:
                                </label>
                                <textarea
                                    id="reply"
                                    name="reply"
                                    value={data.reply}
                                    onChange={(e) => setData('reply', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                    rows="4"
                                />
                                {errors.reply && <div className="text-red-600 mt-2">{errors.reply}</div>}
                            </div>
                            <div>
                                <label htmlFor="attachment"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Attachment
                                </label>
                                <input
                                    id="attachment"
                                    name="attachment"
                                    type="file"
                                    onChange={(e) => setData('attachment', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-emerald-500"
                                />
                                {errors.attachment && <div className="text-red-600 mt-2">{errors.attachment}</div>}
                            </div>
                            <div className="flex items-center justify-end">
                                <button type="submit"
                                        className="bg-emerald-500 text-white py-1 px-2 rounded shadow text-sm hover:bg-emerald-600 transition-all">
                                    Submit Reply
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}

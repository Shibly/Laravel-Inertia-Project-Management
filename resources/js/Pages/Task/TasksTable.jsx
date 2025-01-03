import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import {Link, router} from "@inertiajs/react";
import Swal from 'sweetalert2';

export default function TasksTable({
                                       warning,
                                       tasks,
                                       hasPermission,
                                       success,
                                       queryParams = null,
                                       hideProjectColumn = false,
                                   }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("task.index"), queryParams);
    };

    const deleteTask = (task) => {
        Swal.fire({
            title: 'Are you sure you want to delete the task?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("task.destroy", task.id));
            }
        });
    };

    return (
        <>
            {warning && (
                <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
                    {warning}
                </div>
            )}

            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                    {success}
                </div>
            )}
            <div className="mb-4">
                <div className="flex justify-between gap-4 mb-2">
                    <div className="w-full">
                        <TextInput
                            className="w-full"
                            defaultValue={queryParams.name}
                            placeholder="Task Name"
                            onBlur={(e) => searchFieldChanged("name", e.target.value)}
                            onKeyPress={(e) => onKeyPress("name", e)}
                        />
                    </div>
                    <div className="w-full">
                        <SelectInput
                            className="w-full"
                            defaultValue={queryParams.status}
                            onChange={(e) => searchFieldChanged("status", e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </SelectInput>
                    </div>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            ID
                        </TableHeading>

                        <th className="px-3 py-3">Attachment</th>
                        {!hideProjectColumn && (
                            <th className="px-3 py-3">Project Name</th>
                        )}
                        <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Name
                        </TableHeading>
                        <TableHeading
                            name="status"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Status
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Create Date
                        </TableHeading>
                        <TableHeading
                            name="due_date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Due Date
                        </TableHeading>
                        <th className="px-3 py-3">Created By</th>
                        <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.data.map((task) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                            <td className="px-3 py-2">{task.id}</td>
                            <td className="px-3 py-2">
                                {task.task_attachment ? (
                                    <a className="text-white" href={task.task_attachment}
                                       download={task.task_attachment}
                                       style={{textDecoration: 'none'}}>
                                        Download Attachment
                                    </a>
                                ) : (
                                    <span>No Attachment</span>
                                )}
                            </td>

                            {!hideProjectColumn && (
                                <td className="px-3 py-2">{task.project.name}</td>
                            )}
                            <th className="px-3 py-2 text-gray-100 hover:underline">
                                <Link href={route("task.show", task.id)}>{task.name}</Link>
                            </th>
                            <td className="px-3 py-2">
                                    <span
                                        className={"px-2 py-1 rounded text-nowrap text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                            </td>
                            <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                            <td className="px-3 py-2">{task.createdBy.name}</td>
                            <td className="px-3 py-2 text-nowrap">
                                <div className="flex space-x-2 justify-end">
                                    <Link
                                        href={route("task.edit", task.id)}
                                        className="px-2 py-1 bg-orange-500 text-white text-center font-medium text-sm rounded hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                                        Edit
                                    </Link>

                                    {hasPermission && (
                                        <button
                                            onClick={() => deleteTask(task)}
                                            className="px-2 py-1 bg-red-500 text-white text-center font-medium text-sm rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                                            Delete
                                        </button>

                                    )}
                                </div>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links}/>
        </>
    );
}

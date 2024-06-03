import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import {useEffect} from 'react';

export default function Index({auth, permissions, role}) {
    const assignedPermissions = role.permissions.map(permission => permission.name);

    const {data, setData, post, processing, errors, reset, recentlySuccessful} = useForm({
        permissions: assignedPermissions,
    });

    const handleCheckboxChange = (permissionName) => {
        setData('permissions', data.permissions.includes(permissionName)
            ? data.permissions.filter(p => p !== permissionName)
            : [...data.permissions, permissionName]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('assignPermissions', {role: role.id}), {
            onSuccess: () => {
                // Use Inertia flash message to display the success message
                reset();
            }
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            alert('Permissions have been successfully assigned.');
        }
    }, [recentlySuccessful]);


    function formatPermissionName(name) {
        let words = name.split('_');
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Assign
                Permissions to role "{role.name}"</h2>}>
            <Head title="Application Settings"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit}
                                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {permissions.map((permission) => (
                                    <div key={permission.id} className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            id={`permission-${permission.id}`}
                                            name={`permissions[]`}
                                            value={permission.name}
                                            checked={data.permissions.includes(permission.name)}
                                            onChange={() => handleCheckboxChange(permission.name)}
                                            className="mr-2 h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                                        />
                                        <label htmlFor={`permission-${permission.id}`}
                                               className="text-gray-200 text-sm font-medium">
                                            {formatPermissionName(permission.name)}
                                        </label>
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    className="col-span-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    Assign Permissions
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

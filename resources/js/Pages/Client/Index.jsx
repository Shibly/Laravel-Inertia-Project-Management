import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

export default function Index({auth, clients}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">All
                Clients</h2>}>
            <Head title="Application Settings"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-10">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Client listing page here</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
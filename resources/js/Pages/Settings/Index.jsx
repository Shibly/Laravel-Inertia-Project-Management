import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
export default function Index({auth, success}) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Application Settings goes here
                    </h2>
                </div>
            }>
            <Head title="Application Settings"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

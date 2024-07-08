import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import axios from 'axios';

export default function Index({auth, options}) {
    const {data, setData, success, post, reset, errors} = useForm({
        smtp_host: '',
        smtp_port: '',
        smtp_username: '',
        smtp_password: '',
        smtp_encryption: '',
        mail_driver: '',
        from_email_address: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(route('settings.smtp.get')).then(response => {
            setData({
                smtp_host: response.data.smtp_host || '',
                smtp_port: response.data.smtp_port || '',
                smtp_username: response.data.smtp_username || '',
                smtp_password: response.data.smtp_password || '',
                smtp_encryption: response.data.smtp_encryption || '',
                mail_driver: response.data.mail_driver || '',
                from_email_address: response.data.from_email_address || '',
            });
            setLoading(false);
        }).catch(error => {
            console.error("There was an error fetching the settings!", error);
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.smtp.store'), {
            onSuccess: () => {
                // Use Inertia flash message to display the success message
                reset();
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">SMTP
                Settings</h2>}>
            <Head title="Application Settings"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <div className="p-6">
                                    <form onSubmit={handleSubmit}
                                          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="smtp_host"
                                                   className="block text-sm font-medium text-gray-300">
                                                SMTP Host
                                            </label>
                                            <input
                                                id="smtp_host"
                                                type="text"
                                                value={data.smtp_host}
                                                onChange={(e) => setData('smtp_host', e.target.value)}
                                                className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                            {errors.smtp_host &&
                                                <div className="text-red-500 text-sm mt-1">{errors.smtp_host}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="smtp_port"
                                                   className="block text-sm font-medium text-gray-300">
                                                SMTP Port
                                            </label>
                                            <input
                                                id="smtp_port"
                                                type="number"
                                                value={data.smtp_port}
                                                onChange={(e) => setData('smtp_port', e.target.value)}
                                                className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                            {errors.smtp_port &&
                                                <div className="text-red-500 text-sm mt-1">{errors.smtp_port}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="smtp_username"
                                                   className="block text-sm font-medium text-gray-300">
                                                SMTP Username
                                            </label>
                                            <input
                                                id="smtp_username"
                                                type="text"
                                                value={data.smtp_username}
                                                onChange={(e) => setData('smtp_username', e.target.value)}
                                                className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                            {errors.smtp_username && <div
                                                className="text-red-500 text-sm mt-1">{errors.smtp_username}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="smtp_password"
                                                   className="block text-sm font-medium text-gray-300">
                                                SMTP Password
                                            </label>
                                            <input
                                                id="smtp_password"
                                                type="text"
                                                value={data.smtp_password}
                                                onChange={(e) => setData('smtp_password', e.target.value)}
                                                className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                            {errors.smtp_password && <div
                                                className="text-red-500 text-sm mt-1">{errors.smtp_password}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="smtp_encryption"
                                                   className="block text-sm font-medium text-gray-300">
                                                SMTP Encryption
                                            </label>
                                            <input
                                                id="smtp_encryption"
                                                type="text"
                                                value={data.smtp_encryption}
                                                onChange={(e) => setData('smtp_encryption', e.target.value)}
                                                className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                            {errors.smtp_encryption && <div
                                                className="text-red-500 text-sm mt-1">{errors.smtp_encryption}</div>}
                                        </div>


                                        <div>
                                            <label htmlFor="smtp_encryption"
                                                   className="block text-sm font-medium text-gray-300">
                                                Mail Driver
                                            </label>
                                            <input
                                                id="smtp_encryption"
                                                type="text"
                                                value={data.mail_driver}
                                                onChange={(e) => setData('mail_driver', e.target.value)}
                                                className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                            {errors.mail_driver && <div
                                                className="text-red-500 text-sm mt-1">{errors.mail_driver}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="smtp_encryption"
                                                   className="block text-sm font-medium text-gray-300">
                                                From Email Address
                                            </label>
                                            <input
                                                id="smtp_encryption"
                                                type="text"
                                                value={data.from_email_address}
                                                onChange={(e) => setData('from_email_address', e.target.value)}
                                                className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                            {errors.from_email_address && <div
                                                className="text-red-500 text-sm mt-1">{errors.from_email_address}</div>}
                                        </div>

                                        <div className="col-span-1 md:col-span-2">
                                            <button type="submit"
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm">
                                                Save Settings
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

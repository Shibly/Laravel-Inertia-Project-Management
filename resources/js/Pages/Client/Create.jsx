import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function Create({auth}) {


    const {data, setData, post, errors} = useForm({
        name: "",
        email: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        telephone: "",
        address: ""
    });


    const onSubmit = (e) => {
        e.preventDefault();
        post(route('client.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new
                client</h2>}>
            <Head title="Create new client"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name"/>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email"/>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("email", e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="city" value="City"/>
                                    <TextInput
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("city", e.target.value)}
                                    />
                                    <InputError message={errors.city} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="state" value="State"/>
                                    <TextInput
                                        id="state"
                                        type="text"
                                        name="state"
                                        value={data.state}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("state", e.target.value)}
                                    />
                                    <InputError message={errors.state} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="zip" value="Zip Code"/>
                                    <TextInput
                                        id="zip"
                                        type="text"
                                        name="zip"
                                        value={data.zip}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("zip", e.target.value)}
                                    />
                                    <InputError message={errors.zip} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="country" value="Country"/>
                                    <TextInput
                                        id="country"
                                        type="text"
                                        name="country"
                                        value={data.country}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("country", e.target.value)}
                                    />
                                    <InputError message={errors.country} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="telephone" value="Telephone"/>
                                    <TextInput
                                        id="telephone"
                                        type="text"
                                        name="telephone"
                                        value={data.telephone}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("telephone", e.target.value)}
                                    />
                                    <InputError message={errors.telephone} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="address" value="Address"/>
                                    <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("address", e.target.value)}
                                    />
                                    <InputError message={errors.address} className="mt-2"/>
                                </div>
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("project.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

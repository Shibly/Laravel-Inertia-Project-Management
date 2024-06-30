import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import {INVOICE_STATUS_CLASS_MAP, INVOICE_STATUS_TEXT_MAP} from "@/constants.jsx";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faEdit, faRecycle} from '@fortawesome/free-solid-svg-icons';

const MySwal = withReactContent(Swal);

export default function Index({auth, invoices, queryParams = null, success}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("invoice.index"), queryParams);
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
        router.get(route("invoice.index"), queryParams);
    };

    const deleteInvoice = (invoice) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete the invoice?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("invoice.destroy", invoice.id));
            }
        });
    };

    const downloadInvoice = (invoice) => {
        axios.get(route("invoice.download", invoice.id), {
            responseType: 'blob',
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${invoice.invoice_number}.pdf`);
            document.body.appendChild(link);
            link.click();
        });
    };

    const receivePayment = (invoice) => {
        MySwal.fire({
            title: 'Receive Payment',
            input: 'number',
            inputLabel: 'Amount',
            inputPlaceholder: `Enter payment amount (Balance due: ${invoice.balance_due})`,
            inputAttributes: {
                step: "0.01"
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            preConfirm: (amount) => {
                if (!amount || isNaN(amount) || amount <= 0 || amount > invoice.balance_due) {
                    MySwal.showValidationMessage(`Please enter a valid amount (max: ${invoice.balance_due})`);
                } else {
                    return amount;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const amount = result.value;
                axios.post(route("receivePayment", invoice.id), {amount})
                    .then(response => {
                        MySwal.fire('Success', 'Payment received successfully', 'success');
                        router.get(route("invoice.index"), queryParams);
                    })
                    .catch(error => {
                        MySwal.fire('Error', 'There was an error processing the payment', 'error');
                    });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Invoices
                    </h2>
                    <Link
                        href={route("invoice.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Invoices"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex justify-between">
                                <TextInput
                                    className="w-1/2 mr-2"
                                    defaultValue={queryParams.invoice_number}
                                    placeholder="Invoice Number"
                                    onBlur={(e) => searchFieldChanged("invoice_number", e.target.value)}
                                    onKeyPress={(e) => onKeyPress("invoice_number", e)}
                                />
                                <TextInput
                                    className="w-1/2 mr-2"
                                    defaultValue={queryParams.client_name}
                                    placeholder="Client Name"
                                    onBlur={(e) => searchFieldChanged("client_name", e.target.value)}
                                    onKeyPress={(e) => onKeyPress("client_name", e)}
                                />
                            </div>
                            <div className="overflow-auto">
                                <table
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            ID
                                        </TableHeading>

                                        <TableHeading
                                            name="client_name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Client Name
                                        </TableHeading>

                                        <TableHeading
                                            name="invoice_number"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Invoice Number
                                        </TableHeading>

                                        <TableHeading
                                            name="date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Date
                                        </TableHeading>

                                        <TableHeading
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Due Date
                                        </TableHeading>

                                        <TableHeading
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Status
                                        </TableHeading>

                                        <th className="px-3 py-3 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {invoices.data.map((invoice) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={invoice.id}>
                                            <td className="px-3 py-2">{invoice.id}</td>
                                            <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                                <Link href={route("client.show", invoice.client_id)}>
                                                    {invoice.client_name}
                                                </Link>
                                            </th>

                                            <td className="px-3 py-2 text-nowrap">
                                                {invoice.invoice_number}
                                            </td>

                                            <td className="px-3 py-2 text-nowrap">
                                                {invoice.date}
                                            </td>

                                            <td className="px-3 py-2 text-nowrap">
                                                {invoice.due_date}
                                            </td>

                                            <td className="px-3 py-2 text-nowrap">
                                                <span
                                                    className={"px-2 py-1 rounded text-white " + INVOICE_STATUS_CLASS_MAP[invoice.invoice_status]}>
                                                         {INVOICE_STATUS_TEXT_MAP[invoice.invoice_status]}
                                                </span>
                                            </td>

                                            <td className="px-3 py-2 text-nowrap">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route("invoice.edit", invoice.id)}
                                                        className="w-full px-2 py-1 bg-orange-500 text-white text-center font-medium text-sm rounded hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Link>

                                                    <button
                                                        onClick={() => downloadInvoice(invoice)}
                                                        className="w-full px-2 py-1 bg-green-500 text-white text-center font-medium text-sm rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                                                        <FontAwesomeIcon icon={faDownload}/>
                                                    </button>

                                                    <button
                                                        onClick={() => deleteInvoice(invoice)}
                                                        className="w-full px-2 py-1 bg-red-500 text-white text-center font-medium text-sm rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                                                        <FontAwesomeIcon icon={faRecycle}/>
                                                    </button>

                                                    {invoice.balance_due > 0 && (
                                                        invoice.invoice_status === 'pending' && (
                                                            <button
                                                                onClick={() => receivePayment(invoice)}
                                                                className="w-full px-2 py-1 bg-blue-500 text-white text-center font-medium text-sm rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                                                                Receive Payment
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={invoices.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

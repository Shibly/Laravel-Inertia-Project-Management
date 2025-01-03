import React, {useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Edit({auth, invoice, clients}) {

    console.log(clients);

    const {data, setData, put, processing, errors} = useForm({
        from: invoice.from,
        client_id: invoice.client_id || "",
        ship_to: invoice.ship_to ||"",
        date: invoice.date ||"",
        payment_terms: invoice.payment_terms||"",
        due_date: invoice.due_date||"",
        invoice_number: invoice.invoice_number||"",
        notes: invoice.notes||"",
        terms: invoice.terms||"",
        tax: invoice.tax||"",
        discount: invoice.discount||"",
        shipping: invoice.shipping||"",
        amount_paid: invoice.amount_paid||"",
        balance_due: invoice.balance_due||"",
        items: invoice.items.map(item => ({...item, amount: item.quantity * item.rate})),
        _method: "PUT",
    });

    useEffect(() => {
        calculateTotals();
    }, [data.items, data.tax, data.discount, data.shipping, data.amount_paid]);

    const handleAddItem = () => {
        setData('items', [
            ...data.items,
            {description: '', quantity: 1, rate: 0, amount: 0},
        ]);
    };

    const handleRemoveItem = (index) => {
        setData('items', data.items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = data.items.map((item, i) => {
            if (i === index) {
                const newItem = {...item, [field]: value};
                if (field === 'quantity' || field === 'rate') {
                    newItem.amount = newItem.quantity * newItem.rate;
                }
                return newItem;
            }
            return item;
        });
        setData('items', newItems);
    };

    const calculateTotals = () => {
        const subtotal = data.items.reduce((total, item) => total + (item.amount || 0), 0);
        const totalTax = subtotal * (data.tax / 100);
        const totalDiscount = data.discount;
        const totalShipping = data.shipping;
        const totalAmount = subtotal + totalTax - totalDiscount + totalShipping;
        const balanceDue = totalAmount - data.amount_paid;

        setData('balance_due', balanceDue.toFixed(2));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('invoice.update', invoice.id), {
            onSuccess: () => {
                // Reset form or redirect if needed
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit
                Invoice</h2>}
        >
            <Head title="Edit Invoice"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-10">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Who is this invoice from?
                                        (required)</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        required
                                        value={data.from}
                                        onChange={(e) => setData('from', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Select Client
                                        (required)</label>

                                    <SelectInput
                                        name="client_id"
                                        id="client_id"
                                        className="mt-1 block w-full"
                                        value={data.client_id} // Add this line to set the selected value
                                        onChange={(e) => setData("client_id", e.target.value)}>
                                        <option value="">Select Client</option>
                                        {clients.data.map((client) => (
                                            <option value={client.id} key={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </SelectInput>


                                    <InputError message={errors.client_id} className="mt-2"/>
                                </div>

                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Ship To (optional)</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        value={data.ship_to}
                                        onChange={(e) => setData('ship_to', e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Date</label>
                                        <input
                                            type="date"
                                            className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                            required
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Payment Terms</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                            value={data.payment_terms}
                                            onChange={(e) => setData('payment_terms', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Due Date</label>
                                        <input
                                            type="date"
                                            className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                            value={data.due_date}
                                            onChange={(e) => setData('due_date', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300">Invoice Number</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                    value={data.invoice_number}
                                    onChange={(e) => setData('invoice_number', e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Items</label>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                                    <div className="grid grid-cols-6 gap-4 bg-blue-900 text-white p-2 rounded-md mb-4">
                                        <div className="col-span-3">Item</div>
                                        <div>Quantity</div>
                                        <div>Rate</div>
                                        <div>Amount</div>
                                    </div>
                                    {data.items.map((item, index) => (
                                        <div key={index} className="grid grid-cols-6 gap-4 mb-4">
                                            <input
                                                type="text"
                                                placeholder="Description of service or product"
                                                className="mt-1 col-span-3 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                required
                                            />
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                                                required
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="Rate"
                                                className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                                value={item.rate}
                                                onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                                                required
                                            />
                                            <div className="flex items-center">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Amount"
                                                    className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                                    value={item.amount.toFixed(2)}
                                                    readOnly
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    onClick={() => handleRemoveItem(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                                        onClick={handleAddItem}
                                    >
                                        + Add Line Item
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Notes</label>
                                    <textarea
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        rows="3"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Terms & Conditions</label>
                                    <textarea
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        rows="3"
                                        value={data.terms}
                                        onChange={(e) => setData('terms', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Tax (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        value={data.tax}
                                        onChange={(e) => setData('tax', parseFloat(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Discount</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        value={data.discount}
                                        onChange={(e) => setData('discount', parseFloat(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Shipping</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        value={data.shipping}
                                        onChange={(e) => setData('shipping', parseFloat(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Amount Paid</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        value={data.amount_paid}
                                        onChange={(e) => setData('amount_paid', parseFloat(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300">Balance Due</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm"
                                        value={data.balance_due}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out"
                                    disabled={processing}>
                                    Update Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

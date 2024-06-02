<!DOCTYPE html>
<html>
<head>
    <title>Invoice #{{ $invoice->invoice_number }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff;
            font-size: 12px;
        }
        .invoice-box {
            width: 100%;
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }
        table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }
        table td {
            padding: 5px;
            vertical-align: top;
        }
        .title {
            font-size: 36px;
            color: #333;
        }
        .information, .heading, .item {
            border-bottom: 1px solid #eee;
        }
        .heading td {
            background: #eee;
            font-weight: bold;
        }
        .item td {
            border-bottom: 1px solid #eee;
        }
        .item.last td {
            border-bottom: none;
        }
        .total td:nth-child(4) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>
<div class="invoice-box">
    <table>
        <tr>
            <td colspan="2" class="title">INVOICE</td>
            <td colspan="2" class="text-right">
                <strong>Invoice #{{ $invoice->invoice_number }}</strong><br>
                Date: {{ $invoice->date }}<br>
                Balance Due: ${{ number_format($invoice->balance_due, 2) }}
            </td>
        </tr>
        <tr class="information">
            <td colspan="2">
                <strong>From:</strong><br>
                QuantikLab
            </td>
            <td colspan="2">
                <strong>Bill To:</strong><br>
                {{ $invoice->to }}<br>
                {{ $invoice->ship_to }}
            </td>
        </tr>
        <tr class="heading">
            <td>Description</td>
            <td class="text-right">Quantity</td>
            <td class="text-right">Rate</td>
            <td class="text-right">Amount</td>
        </tr>
        @foreach ($invoice->items as $item)
            <tr class="item">
                <td>{{ $item->description }}</td>
                <td class="text-right">{{ $item->quantity }}</td>
                <td class="text-right">${{ number_format($item->rate, 2) }}</td>
                <td class="text-right">${{ number_format($item->amount, 2) }}</td>
            </tr>
        @endforeach
        <tr class="total">
            <td colspan="3" class="text-right">Subtotal:</td>
            <td class="text-right">${{ number_format($invoice->items->sum('amount'), 2) }}</td>
        </tr>
        <tr class="total">
            <td colspan="3" class="text-right">Tax ({{ $invoice->tax }}%):</td>
            <td class="text-right">${{ number_format($invoice->items->sum('amount') * ($invoice->tax / 100), 2) }}</td>
        </tr>
        <tr class="total">
            <td colspan="3" class="text-right">Total:</td>
            <td class="text-right">${{ number_format($invoice->items->sum('amount') * (1 + $invoice->tax / 100), 2) }}</td>
        </tr>
    </table>
</div>
</body>
</html>

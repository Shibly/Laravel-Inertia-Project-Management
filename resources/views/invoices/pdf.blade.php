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
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .invoice-box {
            width: 100%;
            max-width: 800px; /* Changed from 1000px to 800px */
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            margin: auto;
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

        .header-table td {
            vertical-align: middle;
        }

        .header-table .company {
            font-size: 20px;
            font-weight: bold;
        }

        .header-table .invoice-title {
            font-size: 36px;
            text-align: right;
        }

        .header-table .invoice-number {
            font-size: 18px;
            text-align: right;
            color: #888;
        }

        .header-table .invoice-details {
            background: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            text-align: right;
        }

        .header-table .balance-due {
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
<div class="invoice-box">
    <table class="header-table">
        <tr>
            <td class="company">{{$invoice->from}}</td>
            <td class="invoice-title">INVOICE</td>
        </tr>
        <tr>
            <td></td>
            <td class="invoice-number">{{$invoice->invoice_number}}</td>
        </tr>
        <tr>
            <td></td>
            <td class="invoice-details">

                @php
                    $formattedDate = \Carbon\Carbon::createFromFormat('Y-m-d', $invoice->date)->format('F d, Y');
                @endphp
                Date: {{$formattedDate}}<br>
                <span class="balance-due">Balance : $ {{$invoice->balance_due}}</span>
            </td>
        </tr>
    </table>
    <table>
        <tr class="information">
            <td colspan="2">
                <strong>Bill To:</strong><br>
                {{$invoice->to}}<br>

            </td>
            <br><br><br><br>
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
            <td colspan="3" class="text-right">Total:</td>
            <td class="text-right">
                ${{ number_format($invoice->items->sum('amount') * (1 + $invoice->tax / 100), 2) }}</td>
        </tr>
    </table>
</div>
</body>
</html>

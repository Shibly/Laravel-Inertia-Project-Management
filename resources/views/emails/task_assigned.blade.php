<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Task Assigned</title>
    <style>
        body {
            background-color: #bfc0c4; /* dark gray */
            color: #eeeeee; /* light gray */
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5; /* darker gray */
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
        }
        .content {
            margin: 20px 0;
        }
        .content p {
            line-height: 1.6;
        }
        .content strong {
            color: #ffffff;
            font-size: 18px;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
        }
        .footer p {
            margin: 0 0 10px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a5568; /* dark blue-gray */
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #2d3748; /* darker gray */
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>New Task Assigned</h1>
    </div>
    <div class="content">
        <p>Hello,</p>
        <p>A new task has been assigned to you:</p>
        <p><strong>{{ $task->name }}</strong></p>
        <p>{{ $task->description }}</p>
    </div>
    <div class="footer">
        <p>Thank you!</p>
        <a href="{{ url('/') }}" class="btn">View Task</a>
    </div>
</div>
</body>
</html>

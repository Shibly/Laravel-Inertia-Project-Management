<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Task Assigned</title>
    <style>
        body {
            background-color: #f8f9fa; /* light gray */
            color: #333; /* dark gray */
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff; /* white */
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #007bff; /* blue */
            color: #ffffff; /* white */
            border-radius: 8px 8px 0 0;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
        }

        .content {
            margin: 20px 0;
            padding-left: 20px;
        }

        .content p {
            line-height: 1.6;
            color: #333;
        }

        .content p {
            color: #000000; /* blue */
        }

        .footer {
            text-align: center;
            padding: 20px 0;
            background-color: #f1f1f1; /* light gray */
            border-radius: 0 0 8px 8px;
        }

        .footer p {
            margin: 0 0 10px;
            color: #333;
        }

        .footer a {
            color: white;
            text-decoration: none;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #111111; /* blue */
            color: #ffffff; /* white */
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }

        .btn:hover {
            background-color: #0056b3; /* darker blue */
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>New Task Assigned</h1>
    </div>
    <div class="content">
        <p>Hello ,</p>
        <p>A new task has been assigned to you:</p>
        <p>{{ $task->name }}</p>
        <p>{{ $task->description }}</p>
    </div>
    <div class="footer">
        <p>Thank you!</p>
        <a href="{{ url('task', $task->id) }}" class="btn">View Task</a>
    </div>
</div>
</body>
</html>

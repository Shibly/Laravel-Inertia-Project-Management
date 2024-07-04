# Laravel Project Management

Laravel Project Management is a lightweight project management solution built with Laravel, React, and Inertia.js. This
tool offers a comprehensive suite of features to streamline your project management tasks efficiently.

## Features

1. **User Management**
2. **Client Management**
3. **Projects and Tasks Management**
4. **Roles and Permissions**
5. **Email Confirmation**

## Installation

To get started, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Shibly/Laravel-Inertia-Project-Management.git
    ```

2. **Navigate to the base folder**:

    ```bash
    cd <repository-folder>
    ```

3. **Create a MySQL database** and update the `.env` file with your database credentials.

4. **Install Laravel packages**:

    ```bash
    composer update
    ```

5. **Install Node dependencies**:

    ```bash
    npm install
    ```

6. **Run the migrations and seed the database**:

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

7. **Compile the JSX files**:

    ```bash
    npm run build
    ```

   or run in development mode:

    ```bash
    npm run dev
    ```

8. **Serve the application**:

   Open two terminal tabs and run the following commands in separate tabs:

   **Tab 1**:

    ```bash
    php artisan serve
    ```

   **Tab 2**:

    ```bash
    npm run dev
    ```

## Demo Login

- **Email**: `shibly.phy@gmail.com`
- **Password**: `123456789`

## Docker Instructions

1. **Build and start the containers**:

    ```bash
    docker-compose up --build
    ```

2. **Running Composer and NPM commands**:

    ```bash
    docker-compose run --rm composer install
    docker-compose run --rm npm install
    ```

3. **Adjust the `.env` file**:

    ```plaintext
    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=laravel_project_management
    DB_USERNAME=laravelprojectmanagement
    DB_PASSWORD=1234
    ```

4. **Run PHP Artisan commands**:

    ```bash
    docker-compose run --rm app php artisan migrate
   docker-compose run --rm app php artisan db:seed
    ```


1. **Create a new controller**:

    ```bash
    docker-compose run --rm app php artisan make:controller ExampleController
    ```

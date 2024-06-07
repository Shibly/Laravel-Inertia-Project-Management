<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskReplyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Custom application routes
    Route::resource('project', ProjectController::class);
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class);
    Route::resource('reply', TaskReplyController::class);
    Route::resource('client', ClientController::class);
    Route::resource('invoice', InvoiceController::class);
    Route::get('invoice/{invoice}/download', [InvoiceController::class, 'download'])->name('invoice.download');


    /**
     * Roles and permissions management
     */


    Route::get('/roles', [RolePermissionController::class, 'getRoles'])->name('allRoles');
    Route::get('addRole', [RolePermissionController::class, 'addRole'])->name('addRole');
    Route::post('storeRole', [RolePermissionController::class, 'storeRole'])->name('storeRole');
    Route::get('editRole/{role}', [RolePermissionController::class, 'editRole'])->name('editRole');
    Route::put('updateRole/{role}', [RolePermissionController::class, 'updateRole'])->name('updateRole');
    Route::get('assignPermissionsToRole/{role}', [RolePermissionController::class, 'assignPermissionsToRole'])->name('assignPermissionsToRole');
    Route::post('assignPermissions/{role}', [RolePermissionController::class, 'assignPermissions'])->name('assignPermissions');


    /**
     * Application Settings
     */


    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings/smtp', [SettingsController::class, 'storeSmtpCredentials'])->name('settings.smtp.store');
    Route::get('/settings/smtp', [SettingsController::class, 'getSmtpCredentials'])->name('settings.smtp.get');


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

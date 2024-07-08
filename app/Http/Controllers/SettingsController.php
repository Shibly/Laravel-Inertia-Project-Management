<?php


namespace App\Http\Controllers;

use App\Http\Requests\StoreSmtpRequest;
use App\Models\Option;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Inertia\Response;
use Inertia\ResponseFactory;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory|RedirectResponse
    {
        if (!Auth::user()->can('manage_settings')) {
            return to_route('dashboard')->with('warning', 'You do not have access to this page');
        }

        return inertia("Settings/Index", [
            'options' => Option::all(),
        ]);
    }

    public function storeSmtpCredentials(StoreSmtpRequest $request): RedirectResponse
    {
        $data = $request->validated();

        set_option('smtp_host', $data['smtp_host']);
        set_option('smtp_port', $data['smtp_port']);
        set_option('smtp_username', $data['smtp_username']);
        set_option('smtp_password', $data['smtp_password']);
        set_option('smtp_encryption', $data['smtp_encryption']);
        set_option('mail_driver', $data['mail_driver']);
        set_option('from_email_address', $data['from_email_address']);

        return redirect()->route('dashboard')
            ->with('success', 'SMTP credentials updated successfully.');
    }


    /**
     * @return JsonResponse
     */
    public function getSmtpCredentials(): JsonResponse
    {
        $smtpSettings = [
            'smtp_host' => get_option('smtp_host'),
            'smtp_port' => get_option('smtp_port'),
            'smtp_username' => get_option('smtp_username'),
            'smtp_password' => get_option('smtp_password'),
            'smtp_encryption' => get_option('smtp_encryption'),
            'mail_driver' => get_option('mail_driver'),
            'from_email_address' => get_option('from_email_address'),
        ];


        Config::set('mail.mailers.smtp.host', $smtpSettings['smtp_host']);
        Config::set('mail.mailers.smtp.port', $smtpSettings['smtp_port']);
        Config::set('mail.mailers.smtp.username', $smtpSettings['smtp_username']);
        Config::set('mail.mailers.smtp.password', $smtpSettings['smtp_password']);
        Config::set('mail.mailers.smtp.encryption', $smtpSettings['smtp_encryption']);
        Config::set('mail.default', $smtpSettings['mail_driver']);
        Config::set('mail.from.address', $smtpSettings['from_email_address']);

        return response()->json($smtpSettings);
    }
}

<?php


namespace App\Http\Controllers;

use App\Http\Requests\StoreOptionRequest;
use App\Models\Option;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
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

    public function storeSmtpCredentials(Request $request): RedirectResponse
    {
        $request->validate([
            'smtp_host' => 'required|string',
            'smtp_port' => 'required|integer',
            'smtp_username' => 'required|string',
            'smtp_password' => 'required|string',
            'smtp_encryption' => 'nullable|string',
            'mail_driver' => 'nullable|string',
            'from_email_address' => 'nullable|string',
        ]);

        set_option('smtp_host', $request->smtp_host);
        set_option('smtp_port', $request->smtp_port);
        set_option('smtp_username', $request->smtp_username);
        set_option('smtp_password', $request->smtp_password);
        set_option('smtp_encryption', $request->smtp_encryption);
        set_option('mail_driver', $request->mail_driver);
        set_option('from_email_address', $request->from_email_address);

        return redirect()->route('settings.index')
            ->with('success', 'SMTP credentials updated successfully.');
    }

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

        return response()->json($smtpSettings);
    }
}

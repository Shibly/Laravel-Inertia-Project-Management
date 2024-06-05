<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSmtpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'smtp_host' => 'required|string',
            'smtp_port' => 'required|integer',
            'smtp_username' => 'required|string',
            'smtp_password' => 'required|string',
            'smtp_encryption' => 'required|string',
            'mail_driver' => 'required|string',
            'from_email_address' => 'required|string',
        ];
    }
}

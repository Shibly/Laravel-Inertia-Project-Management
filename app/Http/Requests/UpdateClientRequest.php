<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
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
        $clientId = $this->route('client'); // Adjust this based on your route parameter name

        return [
            'name' => 'required|string',
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('clients', 'email')->ignore($clientId),
            ],
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zip' => 'nullable|string',
            'country' => 'nullable|string',
            'telephone' => 'nullable|string',
            'address' => 'nullable|string',
        ];
    }

}

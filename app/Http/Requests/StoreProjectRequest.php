<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['string',],
            'due_date' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed', 'archived', 'on_hold'])],
            //'image' => ['nullable', 'image']
            'client_id' => ['required'],
        ];
    }


    /**
     * @return string[]
     */
    public function messages(): array
    {
        return [
            'client_id.required' => 'Select a client',
        ];
    }
}

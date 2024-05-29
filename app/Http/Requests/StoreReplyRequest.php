<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreReplyRequest extends FormRequest
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
            'reply' => 'required|string',
            'attachment_path' => 'nullable|file|mimes:jpg,jpeg,png,pdf,doc,docx,json', // Adjust file types and size as needed
            'replied_by' => 'required|exists:users,id',
            'task_id' => 'required|exists:tasks,id',
        ];
    }
}

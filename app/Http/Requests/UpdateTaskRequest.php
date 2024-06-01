<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
            "name" => ['required', 'max:255'],
            'task_attachment' => ['nullable', 'file'],
            "description" => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'estimated_time' => ['required'],
            'project_id' => ['required', 'exists:projects,id'],
            'assigned_user_id' => ['required', 'exists:users,id'],
            'status' => [
                'required',
                Rule::in(['pending', 'in_progress', 'completed', 'on_hold', 'cancelled', 'revision'])
            ],
            'priority' => [
                'required',
                Rule::in(['low', 'medium', 'high'])
            ]
        ];
    }
}

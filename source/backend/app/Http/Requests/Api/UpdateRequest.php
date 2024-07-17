<?php

declare(strict_types=1);

namespace App\Http\Requests\Api;

use Illuminate\Validation\Rule;

class UpdateRequest extends ApiRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'id' => ['required', 'integer', 'exists:customers,id'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('customers')->ignore($this->post('id'))],
            'contact_number' => ['required', 'string', 'regex:/^\+?[0-9]{10,15}$/'],
        ];
    }
}

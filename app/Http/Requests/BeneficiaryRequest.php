<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BeneficiaryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // only allow updates if the user is logged in
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'NIN' => 'required|min:1|max:14',
            'gender' => [
                'required',
                Rule::in(['other', 'male', 'female'])
            ],
            'is_pwd' => 'present',
            'type_of_disability' => 'required_if:is_pwd,true',
            'phone_number' => 'required',
            'district_id' => 'required',
            'county_id' => 'required',
            'office_id' => 'required',
            'date_of_birth' => 'required|date'
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            //
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            //
        ];
    }
}

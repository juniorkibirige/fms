<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class DistributionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
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
            'distribution_data.season' => 'required',
            'distribution_data.distributed_on' => 'required|date',
            'distribution_data.status' => 'required',
            'distribution_data.office_id' => 'required|numeric',
            'distribution_data.beneficiary_id' => 'required|numeric',
            'distribution_data.delivered_by' => 'required|string',
            'inputs.inputs' => 'required'
        ];
    }
}

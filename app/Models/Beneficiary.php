<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Beneficiary extends Model
{

    protected $table = 'beneficiaries';
    protected $guarded = ['id'];
    protected $dates = [
        'created_at',
        'updated_at',
        'date_of_birth'
    ];

    protected $fillable = [
        'name',
        'NIN',
        'gender',
        'is_pwd',
        'type_of_disability',
        'date_of_birth',
        'phone_number',
        'age',
        'district_id',
        'county_id',
        'office_id'
    ];

    /* ----------------------------------------------------------------- */
    /* Relationship */
    /* ----------------------------------------------------------------- */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function county(): BelongsTo
    {
        return $this->belongsTo(Constituency::class);
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

}

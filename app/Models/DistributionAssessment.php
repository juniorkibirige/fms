<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DistributionAssessment extends Model
{

    protected $table = 'distribution_assessment';
    protected $dates = [
        'assessed_on',
    ];
    protected $guarded = ['id'];
    protected $fillable = [
        'distribution_id',
        'assessed_by',
        'assessed_on',
        'beneficiary_acknowledgement',
        'narrative',
        'office_id',
    ];

    /* ------------------------------------------------ */
    /* Relations */
    /* ------------------------------------------------ */
    public function distributions(): HasOne
    {
        return $this->hasOne(Distribution::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function office(): HasOne
    {
        return $this->hasOne(Office::class);
    }
}

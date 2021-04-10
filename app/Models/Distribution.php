<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Distribution extends Model
{

    protected $table = 'distributions';
    protected $dates = [
        'distributed_on'
    ];
    protected $fillable = [
        'season',
        'status',
        'beneficiary_id',
        'distributed_on',
        'office_id',
        'delivered_by',
    ];

    /* --------------------------------------------------------------- */
    /* Relations */
    /* --------------------------------------------------------------- */

    public function beneficiary(): HasOne
    {
        return $this->hasOne(Beneficiary::class);
    }

    public function office(): HasOne
    {
        return $this->hasOne(Office::class);
    }

    public function inputs(): BelongsToMany
    {
        return $this->belongsToMany(
            Input::class,
            'distribution_input',
            'distribution_id'
        )->withPivot([
            'quantity',
            'assessed_qty',
            'reconciled',
        ]);
    }
}

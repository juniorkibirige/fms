<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Input extends Model
{

    protected $table = 'inputs';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $guarded = ['id'];
    protected $fillable = [
        'name',
        'type',
        'description',
        'extras',
        'office_id',
    ];
    // protected $hidden = [];
    protected $dates = [
        'created_at',
        'updated_at',
    ];


    public function suppliers(): BelongsToMany
    {
        return $this->belongsToMany(Supplier::class)
            ->withPivot([
                'quantity',
                'rate',
                'total',
                'status',
                'office_id'
            ]);
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }


    public function distributions(): BelongsToMany
    {
        return $this->belongsToMany(
            Distribution::class,
            'distribution_input',
            'id'
        )->withPivot([
            'quantity',
            'assessed_qty',
            'reconciled',
        ]);
    }
}

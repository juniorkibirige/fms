<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use SoftDeletes;

    protected $table = 'suppliers';

    protected $guarded = ['id'];

    protected $fillable = [
        'name',
        'district_id',
        'county_id',
        'region_id',
        'parish_id',
        'slug',
        'supplier_contracts_id',
        'supplier_contacts_id',
        'inputs'
    ];

    public $timestamps = [
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'inputs' => 'array'
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function contacts(): BelongsTo
    {
        return $this->belongsTo(SupplierContact::class, 'supplier_contacts_id', 'id');
    }

    public function contracts(): BelongsTo
    {
        return $this->belongsTo(SupplierContract::class, 'supplier_contracts_id', 'id');
    }

    public function inputsRel(): BelongsToMany
    {
        return $this->belongsToMany(Input::class)
            ->withPivot([
                'quantity',
                'rate',
                'total',
                'status',
                'office_id'
            ]);
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function county(): BelongsTo {
        return $this->belongsTo(Constituency::class);
    }

    public function office(): BelongsToMany
    {
        return $this->belongsToMany(Office::class);
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | ACCESSORS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */
}

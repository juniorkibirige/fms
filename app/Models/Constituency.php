<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Constituency extends Model
{

    protected $table = 'constituencies';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'slug',
        'region_id',
        'district_id',
    ];

    protected $guarded = [
        'id',
    ];

    public function getSlugAttribute($value): string
    {
        return strtolower(implode('_', explode(' ', $this->attributes['name'])));

    }
}

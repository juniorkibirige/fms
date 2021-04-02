<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $table= 'regions';
    protected $fillable = [
        'name',
        'slug'
    ];
    protected $guarded = 'id';
    protected $primaryKey = 'id';
}

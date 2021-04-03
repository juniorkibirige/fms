<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierContact extends Model
{
    protected $table = 'supplier_contacts';
    protected $guarded = ['id'];
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'address',
    ];
}

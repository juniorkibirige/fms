<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierContract extends Model
{

    protected $table = "supplier_contracts";
    protected $fillable = [
        'contract_start',
        'contract_end',
        'details',
        'office_id',
        'status'
    ];
    protected $guarded = ['id'];
    public $timestamps = ['created_at', 'updated_at'];
//    protected $casts = [
//        'contract_start' => 'datetime',
//        'contract_end' => 'datetime',
//    ];

//    public function setDatetimeAttribute($value)
//    {
//        $this->attributes['datetime'] = \Carbon\Carbon::createFromFormat('dd/mm/YYYY HH:ii:ss', $value);
//    }
}

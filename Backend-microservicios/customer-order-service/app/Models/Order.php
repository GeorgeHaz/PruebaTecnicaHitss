<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['client_id', 'order_date', 'total', 'status'];

    public function client() {
        return $this->belongsTo(Client::class);
    }
}

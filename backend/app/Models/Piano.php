<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Piano extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'image', 'description', 'price', 'stock'
    ];

    // Un piano pertenece a muchos pedidos (a través de la tabla order_piano)
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_piano')
                    ->withPivot('quantity', 'price_at_purchase') 
                    ->withTimestamps();
    }
}
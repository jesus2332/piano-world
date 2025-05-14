<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;  

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'total_amount', 'status'
    ];

    //Un pedido pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un pedido tiene muchos pianos  
    public function pianos()
    {
        return $this->belongsToMany(Piano::class, 'order_piano')
                    ->withPivot('quantity', 'price_at_purchase')
                    ->withTimestamps();
    }
}
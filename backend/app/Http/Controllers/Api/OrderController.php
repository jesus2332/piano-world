<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Piano;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $orders = $user->orders()->with('pianos')->latest()->get(); // Cargar pianos relacionados y ordenar por más recientes
        return response()->json($orders);
    }

    // Crear un nuevo pedido
    public function store(Request $request)
    {
        $request->validate([
            'cart' => 'required|array',
            'cart.*.id' => 'required|exists:pianos,id',
            'cart.*.quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();
        $cartItems = $request->cart;
        $totalAmount = 0;

        DB::beginTransaction();

        try {
            foreach ($cartItems as $item) {
                $piano = Piano::find($item['id']);
                if (!$piano || $piano->stock < $item['quantity']) { //  chequeo de stock
                    DB::rollBack();
                    return response()->json(['message' => 'Piano no encontrado o sin stock suficiente: ' . ($piano ? $piano->name : 'ID ' . $item['id'])], 400);
                }
                $totalAmount += $piano->price * $item['quantity'];
            }

            $order = $user->orders()->create([
                'total_amount' => $totalAmount,
                'status' => 'pending', 
            ]);

            foreach ($cartItems as $item) {
                $piano = Piano::find($item['id']);
                $order->pianos()->attach($piano->id, [
                    'quantity' => $item['quantity'],
                    'price_at_purchase' => $piano->price,
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Pedido creado exitosamente', 'order' => $order->load('pianos')], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al crear el pedido: ' . $e->getMessage()], 500);
        }
    }
}
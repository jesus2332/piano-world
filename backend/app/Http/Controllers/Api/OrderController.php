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
        $orders = $user->orders()->with('pianos')->latest()->get(); 
        return response()->json($orders);
    }

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
        $pianosToUpdateStock = []; 

        DB::beginTransaction();

        try {
            foreach ($cartItems as $item) {
                $piano = Piano::find($item['id']); 

                if (!$piano) {
                    DB::rollBack();
                    return response()->json(['message' => 'Piano con ID ' . $item['id'] . ' no encontrado.'], 404); 
                }

                if ($piano->stock < $item['quantity']) {
                    DB::rollBack(); 
                    return response()->json(['message' => 'Stock insuficiente para: ' . $piano->name . '. Disponible: ' . $piano->stock . ', Solicitado: ' . $item['quantity']], 400); 
                }

                $totalAmount += $piano->price * $item['quantity'];
                $pianosToUpdateStock[] = ['model' => $piano, 'quantity_ordered' => $item['quantity']];
            }

            $order = $user->orders()->create([
                'total_amount' => $totalAmount,
                'status' => 'pending', 
            ]);

            foreach ($pianosToUpdateStock as $pianoData) {
                $pianoModel = $pianoData['model'];
                $quantityOrdered = $pianoData['quantity_ordered'];

                $order->pianos()->attach($pianoModel->id, [
                    'quantity' => $quantityOrdered,
                    'price_at_purchase' => $pianoModel->price, 
                ]);

              
                $pianoModel->decrement('stock', $quantityOrdered);
            }

            DB::commit(); 

            return response()->json(['message' => 'Pedido creado exitosamente', 'order' => $order->load('pianos')], 201);

        } catch (\Exception $e) {
            DB::rollBack(); 
            Log::error('Error creando pedido: ' . $e->getMessage() . ' en ' . $e->getFile() . ':' . $e->getLine()); 
            return response()->json(['message' => 'Error al procesar el pedido. Por favor, inténtalo de nuevo.'], 500); 
        }
    }
}
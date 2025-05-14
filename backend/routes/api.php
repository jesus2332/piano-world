<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PianoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;

// Rutas públicas (no requieren autenticación)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/pianos', [PianoController::class, 'index']);
Route::get('/pianos/{piano}', [PianoController::class, 'show']);

// Ruta de prueba (opcional, para verificar que el grupo 'api' base funciona)
// No necesita autenticación por sí misma, pero estará bajo el prefijo /api
Route::get('/test', function () {
    return response()->json([
        'message' => 'API test route is working',
        'status' => 'success'
    ]);
});

// Rutas protegidas (requieren autenticación vía Sanctum)
// Todas las rutas aquí usarán el middleware 'auth:sanctum'
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']); // Obtener info del usuario autenticado

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
});
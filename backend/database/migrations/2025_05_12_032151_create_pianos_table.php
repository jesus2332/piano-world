<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pianos', function (Blueprint $table) {
            $table->id(); // Columna ID autoincremental y clave primaria
            $table->string('name');
            $table->string('image'); // Guardaremos el nombre del archivo de imagen
            $table->text('description');
            $table->decimal('price', 8, 2); // 8 dígitos en total, 2 decimales
            $table->integer('stock')->default(0); // Opcional: para control de inventario
            $table->timestamps(); // Columnas created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pianos');
    }
};

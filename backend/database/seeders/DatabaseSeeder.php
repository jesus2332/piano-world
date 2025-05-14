<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory(10)->create(); // Opcional: crea usuarios de prueba

        $this->call([
            PianoSeeder::class, // Llama a tu seeder de pianos
            // Otros seeders si los tienes
        ]);
    }
}

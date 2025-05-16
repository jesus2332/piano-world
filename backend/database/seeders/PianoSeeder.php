<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Piano;

class PianoSeeder extends Seeder
{
    public function run(): void



    {

        $pianos = [
          
            [
      
                'name' => 'Roland VR-09',
                'image' => 'piano_01',
                'description' => 'Teclado versátil con sonidos de órgano, piano y sintetizador, ideal para músicos en vivo.',
                'price' => 899,
                'stock' => 12,
            ],
            [
           
                'name' => 'Yamaha CK-61',
                'image' => 'piano_02',
                'description' => 'Stage keyboard con sonidos expresivos, portátil y con opciones para directos.',
                'price' => 849,
                'stock' => 8,
            ],
            [
          
                'name' => 'Nord Piano 5',
                'image' => 'piano_03',
                'description' => 'Piano profesional con sonidos detallados, teclado contrapesado y capas avanzadas.',
                'price' => 2999,
                'stock' => 3,
            ],
            [
            
                'name' => 'Nord Lead A4',
                'image' => 'piano_04',
                'description' => 'Sintetizador analógico virtual con sonidos potentes y gran capacidad de edición.',
                'price' => 1799,
                'stock' => 5,
            ],
            [
             
                'name' => 'Juno DS-61',
                'image' => 'piano_05',
                'description' => 'Sintetizador moderno con secuenciador, sampler y sonidos versátiles.',
                'price' => 799,
                'stock' => 14,
            ],
            [
              
                'name' => 'Roland FP-30',
                'image' => 'piano_06',
                'description' => 'Piano digital con acción de martillo y sonidos realistas, ideal para casa o estudio.',
                'price' => 699,
                'stock' => 9,
            ],
            [
              
                'name' => 'Yamaha PSR-E463',
                'image' => 'piano_07',
                'description' => 'Teclado portátil con acompañamientos, grabador y sonidos variados para principiantes.',
                'price' => 359,
                'stock' => 20,
            ],
            [
            
                'name' => 'Yamaha Motif XF6',
                'image' => 'piano_08',
                'description' => 'Workstation profesional con gran banco de sonidos y funciones de producción.',
                'price' => 2499,
                'stock' => 2,
            ],
            [
         
                'name' => 'Korg Kronos 61',
                'image' => 'piano_09',
                'description' => 'Workstation avanzada con 9 motores de sonido, pantalla táctil y edición profunda.',
                'price' => 3299,
                'stock' => 1,
            ],
        ];

        foreach ($pianos as $pianoData) {
            Piano::create($pianoData);
        }
    }
}
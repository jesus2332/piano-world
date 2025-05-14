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
                'description' => 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
                'price' => 299,
                'stock' => 10,
            ],
            [
                'name' => 'Yamaha CK-61',
                'image' => 'piano_02',
                'description' => 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
                'price' => 349,
                'stock' => 15,
            ],
        ];

        foreach ($pianos as $pianoData) {
            Piano::create($pianoData);
        }
    }
}
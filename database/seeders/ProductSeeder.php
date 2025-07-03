<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 40; $i++) {
            Product::create([
                'name' => $faker->words(3, true),
                'price' => $faker->randomFloat(2, 10, 500),
                'category' => $faker->randomElement(['Electronics', 'Clothing', 'Books', 'Home', 'Toys']),
                'stock_quantity' => $faker->numberBetween(0, 100),
                // Add other fields as needed
            ]);
        }
    }
}

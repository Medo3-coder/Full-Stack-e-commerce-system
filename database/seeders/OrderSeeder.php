<?php
namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $users    = User::all();
        $products = Product::all();

        foreach ($users as $user) {
            // each user gets 2 orders
            for ($i = 0; $i < 2; $i++) {
                $order = Order::create([
                    'user_id' => $user->id,
                    'total'   => 0,
                ]);
            }

            $orderTotal = 0;
            // Attach 2-4 random products to each order
            $orderProducts = $products->random(rand(2, 4));
            foreach ($orderProducts as $product) {
                $quantity = rand(1, 3);
                $order->products()->attach($product->id, [
                    'quantity'       => $quantity,
                    'price_at_order' => $product->price,
                ]);
                $orderTotal += $product->price * $quantity;
            }
            $order->update(['total' => $orderTotal]);

        }

    }
}

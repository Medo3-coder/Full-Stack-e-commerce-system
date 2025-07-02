<?php

namespace App\Http\Controllers\API;

use App\Events\OrderPlaced;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\OrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
    public function store(OrderRequest $request)
    {
        $user = $request->user();
        $total = 0;

        DB::beginTransaction();

        $order = Order::create(['user_id' => $user->id, 'total' => 0]);

        foreach ($request->products as $item) {
            $product = Product::findOrFail($item['id']);

            if ($product->stock_quantity < $item['quantity']) {
                DB::rollBack();
                return response()->json(['message' => "Insufficient stock for {$product->name}"], 400);
            }

            $subtotal = $product->price * $item['quantity'];
            $total += $subtotal;

            $order->products()->attach($product->id, [
                'quantity' => $item['quantity'],
                'price_at_order' => $product->price
            ]);

            $product->decrement('stock_quantity', $item['quantity']);
        }

        $order->update(['total' => $total]);

        DB::commit();

        event(new OrderPlaced($order));

        return response()->json(['message' => 'Order placed', 'order_id' => $order->id]);
    }

    public function show($id)
    {
        $order = Order::with('products')->findOrFail($id);
        return response()->json($order);
    }
}

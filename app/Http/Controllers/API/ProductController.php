<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $cacheKey = 'products:filter:' . md5(serialize($request->all()));
        $products = Cache::remember($cacheKey , 3600, function () use ($request) {
            return Product::query()
                ->search($request->input('search'))
                ->category($request->input('category'))
                ->priceRange($request->input('min_price'), $request->input('max_price'))
                ->paginate(10);
        });

        return response()->json($products);
    }

}

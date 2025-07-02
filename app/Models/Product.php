<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'category', 'stock_quantity'];

    // Search scope
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, function ($query, $search) {
            return $query->where('name', 'LIKE', "%$search%");
        });
    }

    // Category scope
    public function scopeCategory(Builder $query, ?string $category): Builder
    {
        return $query->when($category, function ($query, $category) {
            return $query->where('category', $category);
        });
    }

    // Price range scope
    public function scopePriceRange(Builder $query, ?float $min, ?float $max): Builder
    {
        return $query->when($min, function ($query, $min) {
            return $query->where('price', '>=', $min);
        })->when($max, function ($query, $max) {
            return $query->where('price', '<=', $max);
        });
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot(['quantity', 'price_at_order'])->withTimestamps();
    }
}

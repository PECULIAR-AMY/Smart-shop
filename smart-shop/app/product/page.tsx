"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts, type Product } from "@/lib/api";
import ProductList from "./ProductList"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    gender: "",
    sort: "rating",
  });

  useEffect(() => {
    fetchProducts(filters)
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err));
  }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search + Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="High-End Fashion">High-End Fashion</option>
          <option value="Smart Home Devices">Smart Home Devices</option>
          <option value="Gaming & Entertainment">Gaming & Entertainment</option>
          <option value="Home & Living">Home & Living</option>
          <option value="Luxury Accessories">Luxury Accessories</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
        </select>
        <select
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="rating">Sort by Rating</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <ProductList products={products} />
    </div>
  );
}

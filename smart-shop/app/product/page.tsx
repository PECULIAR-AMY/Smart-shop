"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProducts, type Product } from "@/lib/api";
import { useCartStore } from "@/lib/store";
import ProductList from "./ProductList"

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    q: searchParams?.get("q") ?? "",
    category: "",
    gender: "",
    sort: "rating",
  });
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setFilters(prev => ({ ...prev, q: searchParams?.get("q") ?? "" }));
  }, [searchParams]);

  useEffect(() => {
    fetchProducts(filters)
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err));
  }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>



      <ProductList products={products} onAddToCart={addToCart} />
    </div>
  );
}

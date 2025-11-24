"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSearch } from "../providers/searchProviders";

// Match the ProductList type
export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
  rating?: number;
  bnpl_available?: boolean;
  [key: string]: unknown;
}

export interface SupabaseProduct {
  id: number;
  name: string;
  price: number;
  image?: string;
  image_url?: string;
  category: string;
  rating?: number;
  bnpl_available?: boolean;
  [key: string]: unknown;
}

export default function useProducts() {
  const { debouncedSearch, category } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category]);

  const fetchProducts = async () => {
    try {
      // Fetch from Supabase
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Supabase fetch error:", error);
        setProducts([]);
        return;
      }

      // Map Supabase data to match ProductList expected shape
      const mappedData: Product[] = (data ?? []).map((p: SupabaseProduct) => {
        const { id, name, price, image, image_url, category, rating, bnpl_available, ...rest } = p;
        return {
          id,
          name,
          price,
          image_url: image || image_url || "/placeholder.jpg", // fallback if no image
          category,
          rating: rating ?? 0,
          bnpl_available: bnpl_available ?? false,
          ...rest, // include any other fields except the ones already listed
        };
      });

      setProducts(mappedData);
    } catch (err) {
      console.error("Unexpected fetch error:", err);
      setProducts([]);
    }
  };

  return { products };
}

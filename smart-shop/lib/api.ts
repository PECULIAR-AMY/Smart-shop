import { supabase } from "./supabaseClient";
export type Product = {
  id: string;
  name: string;
  price: number;
  rating?: number;
  created_at?: string;
  category?: string;
  gender?: string;
  [key: string]: unknown;
};

interface FilterOptions {
  q?: string;
  category?: string;
  gender?: string;
  sort?: string;
}

export async function fetchProducts(filters: FilterOptions): Promise<Product[]> {
  let query = supabase.from("products").select("*");

  if (filters.q) query = query.ilike("name", `%${filters.q}%`);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.gender) query = query.eq("gender", filters.gender);

  switch (filters.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "rating":
      query = query.order("rating", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data as Product[];
}

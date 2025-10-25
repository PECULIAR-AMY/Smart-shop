import React from "react";
import { Product } from "@/lib/api";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products?.length) return <p>No products found.</p>;

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-4 hover:shadow-lg transition bg-white"
        >
          <img
            src={p.image_url || "/placeholder.jpg"}
            alt={p.name}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="mt-2 font-semibold text-lg">{p.name}</h3>
          <p className="text-gray-600">₦{p.price.toLocaleString()}</p>
          <p className="text-sm text-yellow-500">⭐ {p.rating ?? "N/A"}</p>
          {p.bnpl_available && (
            <p className="text-green-600 text-sm mt-1 font-medium">
              BNPL Available
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;

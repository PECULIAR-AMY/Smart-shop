import React from "react";
import Image from "next/image";
import { Product } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  if (!products?.length) return <p>No products found.</p>;

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-4 hover:shadow-lg transition bg-white"
        >
          <Image
            src={typeof p.image_url === "string" && p.image_url ? p.image_url : "/placeholder.jpg"}
            alt={p.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="mt-2 font-semibold text-lg">{p.name}</h3>
          <p className="text-gray-600">₦{p.price.toLocaleString()}</p>
          <p className="text-sm text-yellow-500">⭐ {p.rating ?? "N/A"}</p>
          {Boolean(p.bnpl_available) && (
            <p className="text-green-600 text-sm mt-1 font-medium">
              BNPL Available
            </p>
          )}
          <Button
            onClick={() => onAddToCart(p)}
            className="mt-4 w-full"
            variant="default"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

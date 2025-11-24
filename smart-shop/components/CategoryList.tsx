"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "Clothes",
  "Shoes",
  "Bags",
  "Electronics",
  "Beauty",
  "Gaming & Entertainment",
  "Home & Living",
  "Beauty & Personal Care",
];

export default function CategoryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams ? searchParams.get("category") ?? "" : "";

  const handleClick = (cat: string) => {
    router.push(`/product?q=&category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto py-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-lg ${
            currentCategory === cat ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

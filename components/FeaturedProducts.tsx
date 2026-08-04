"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/productService";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      // صرف پہلے 8 Products
      setProducts(data.slice(0, 8));
    }

    loadProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-14">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          ⭐ Featured Products
        </h2>

        <Link
          href="/products"
          className="text-orange-600 font-bold hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold line-clamp-2">
                {product.name}
              </h3>

              <p className="text-orange-600 text-2xl font-bold mt-3">
                Rs. {product.price}
              </p>

              <Link
                href={`/product/${product.id}`}
                className="block mt-4 bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-xl"
              >
                View Product
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}
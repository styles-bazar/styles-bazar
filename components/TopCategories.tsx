"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/productService";

export default function TopCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const products = await getProducts();

        const uniqueCategories = products.reduce(
          (acc: any[], product: any) => {
            if (
              product.category &&
              !acc.find((item) => item.name === product.category)
            ) {
              acc.push({
                name: product.category,
                image: product.image,
              });
            }

            return acc;
          },
          []
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shop By Category
          </h2>

          <Link
            href="/products"
            className="text-orange-600 font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500 font-semibold">
              No Categories Found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">

            {categories.map((category) => (
              <Link
                href={`/category/${encodeURIComponent(category.name)}`}
                key={category.name}
                className="group"
              >
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 text-center">

                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="mt-4 font-bold text-gray-800 capitalize line-clamp-1">
                    {category.name}
                  </h3>

                  <p className="text-sm text-orange-600 mt-1">
                    Shop Now →
                  </p>

                </div>
              </Link>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}
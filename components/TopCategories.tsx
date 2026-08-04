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
    <section className="max-w-7xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-3xl font-bold mb-8">
          Shop By Category
        </h2>

        {categories.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold">
            No Categories Found
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {categories.map((category) => (
              <Link
                href={`/category/${category.name}`}
                key={category.name}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 flex flex-col items-center">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-24 h-24 rounded-full object-cover border group-hover:scale-110 duration-300"
                  />

                  <h3 className="mt-4 font-bold text-center">
                    {category.name}
                  </h3>

                </div>
              </Link>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}
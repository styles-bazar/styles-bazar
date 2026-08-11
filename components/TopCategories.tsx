"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaLayerGroup,
} from "react-icons/fa";

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
              !acc.find(
                (item) =>
                  item.name.toLowerCase() ===
                  product.category.toLowerCase()
              )
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
    <section className="relative py-16 sm:py-20">
      <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.04] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <FaLayerGroup className="text-xs" />
              </span>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                Explore Collection
              </p>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              Shop By Category
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Explore our collection and find something you'll love.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-bold text-gray-300 transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500 sm:flex"
          >
            View All
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Categories */}
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <p className="font-semibold text-gray-500">
              No Categories Found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

            {categories.map((category, index) => (
              <Link
                href={`/category/${encodeURIComponent(category.name)}`}
                key={category.name}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d0d] p-3 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.55)]">

                  {/* Glow */}
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/10 blur-3xl transition-all duration-700 group-hover:bg-orange-500/30" />

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#171717]">

                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-700">
                        <FaLayerGroup className="text-3xl" />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Number */}
                    <span className="absolute left-3 top-3 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[9px] font-black text-gray-300 backdrop-blur-md">
                      0{index + 1}
                    </span>

                  </div>

                  {/* Text */}
                  <div className="px-2 pb-2 pt-4">

                    <h3 className="truncate text-sm font-black capitalize text-white transition-colors duration-300 group-hover:text-orange-400">
                      {category.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-600 transition-colors group-hover:text-gray-400">
                        Shop Now
                      </span>

                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.04] text-gray-600 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                        <FaArrowRight className="text-[8px]" />
                      </span>
                    </div>

                  </div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />

                </div>
              </Link>
            ))}

          </div>
        )}

        {/* Mobile Button */}
        <Link
          href="/products"
          className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 py-4 text-sm font-bold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white sm:hidden"
        >
          View All Categories
          <FaArrowRight className="text-xs" />
        </Link>

      </div>
    </section>
  );
}
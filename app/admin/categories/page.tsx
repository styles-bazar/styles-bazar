"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaFolder, FaBox } from "react-icons/fa";
import { getProducts } from "@/lib/productService";

type Product = {
  id?: string;
  category?: string;
  name?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  description?: string;
  image?: string;
  media?: unknown[];
};

export default function AdminCategoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts((data || []) as Product[]);
      } catch (error) {
        console.error("Categories products load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const map: Record<string, number> = {};

    products.forEach((product) => {
      const category =
        typeof product.category === "string" &&
        product.category.trim()
          ? product.category.trim()
          : "Uncategorized";

      if (!map[category]) {
        map[category] = 0;
      }

      map[category] += 1;
    });

    return Object.entries(map) as [string, number][];
  }, [products]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5">
          <Link
            href="/admin"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <FaArrowLeft />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              Styles Bazar
            </p>

            <h1 className="mt-1 text-2xl font-black">
              Categories
            </h1>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        {/* HERO */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#111111] to-[#090909] p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-3xl text-orange-500">
              <FaFolder />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                Product Organization
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Product Categories
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Aapke products ki categories yahan show hongi.
              </p>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-3xl border border-white/10 bg-[#101010]"
              />
            ))}
          </div>
        )}

        {/* NO CATEGORY */}
        {!loading && categories.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] py-24 text-center">
            <FaFolder className="mx-auto text-5xl text-gray-700" />

            <h3 className="mt-5 text-xl font-black">
              No Categories Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Products add karne ke baad categories yahan show hongi.
            </p>
          </div>
        )}

        {/* CATEGORY CARDS */}
        {!loading && categories.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(([category, count], index) => (
              <div
                key={category}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#111111] hover:shadow-2xl"
              >
                {/* GLOW */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                      <FaFolder />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black text-gray-500">
                      #{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black capitalize">
                    {category}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <FaBox className="text-orange-500" />

                    <span>
                      {count} Product{count === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="mt-6 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
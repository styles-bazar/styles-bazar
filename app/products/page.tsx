"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FaArrowDown,
  FaArrowRight,
  FaFilter,
  FaHeart,
  FaSearch,
  FaShoppingBag,
  FaStar,
  FaTimes,
} from "react-icons/fa";

import { getProducts } from "@/lib/productService";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const { addToWishlist, isInWishlist } = useWishlist();

  // ===============================
  // LOAD PRODUCTS
  // ===============================
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // ===============================
  // CATEGORIES
  // ===============================
  const categories = useMemo(() => {
    const unique = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...Array.from(new Set(unique))];
  }, [products]);

  // ===============================
  // FILTER + SORT
  // ===============================
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || "")
        )
      );
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[130px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24">

          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                Styles Bazar Collection
              </span>

            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Shop Everything
              <span className="block text-orange-500">
                You Love.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Discover fashion, shoes, watches, perfumes and more —
              carefully selected for your everyday style.
            </p>

          </div>

          {/* SEARCH */}
          <div className="mt-9 max-w-2xl">

            <div className="group relative flex items-center rounded-2xl border border-white/10 bg-[#111111] transition-all duration-300 focus-within:border-orange-500/50">

              <FaSearch className="ml-4 shrink-0 text-sm text-gray-600 group-focus-within:text-orange-500" />

              <input
                type="text"
                placeholder="Search products or categories..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-transparent px-4 py-4 text-sm font-medium text-white outline-none placeholder:text-gray-600"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mr-4 text-gray-500 hover:text-orange-500"
                >
                  <FaTimes />
                </button>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
              Our Collection
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              All Products
            </h2>

            {!loading && (
              <p className="mt-2 text-xs text-gray-600">
                Showing {filteredProducts.length} of{" "}
                {products.length} products
              </p>
            )}

          </div>

          <div className="flex items-center gap-3">

            {/* MOBILE FILTER */}
            <button
              type="button"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-bold text-gray-300 hover:border-orange-500/40 hover:text-orange-500 lg:hidden"
            >
              <FaFilter />
              Filters
            </button>

            {/* SORT */}
            <div className="relative">

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="appearance-none rounded-xl border border-white/10 bg-[#101010] px-5 py-3 pr-10 text-xs font-bold text-gray-300 outline-none focus:border-orange-500/50"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A-Z
                </option>
              </select>

              <FaArrowDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-gray-600" />

            </div>

          </div>

        </div>

        {/* ================= FILTERS ================= */}
        <div
          className={`mb-10 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

            {categories.map((item) => (

              <button
                key={String(item)}
                type="button"
                onClick={() =>
                  setCategory(String(item))
                }
                className={`whitespace-nowrap rounded-xl border px-5 py-3 text-xs font-black transition ${
                  category === item
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-white/10 bg-white/[0.03] text-gray-500 hover:border-orange-500/40 hover:text-orange-500"
                }`}
              >
                {String(item)}
              </button>

            ))}

          </div>

        </div>

        {/* ================================================= */}
        {/*              NEW MODERN LOADING                   */}
        {/* ================================================= */}

        {loading && (

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {Array.from({ length: 10 }).map((_, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d]"
              >

                {/* IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">

                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-white/[0.08] to-white/[0.02] animate-pulse" />

                  <div className="absolute left-3 top-3 h-6 w-20 rounded-full bg-white/[0.08] animate-pulse" />

                  <div className="absolute right-3 top-3 h-10 w-10 rounded-full bg-white/[0.08] animate-pulse" />

                  <div className="absolute bottom-3 left-3 h-8 w-8 rounded-full bg-white/[0.08] animate-pulse" />

                </div>

                {/* INFO */}
                <div className="p-4 sm:p-5">

                  <div className="mb-3 flex justify-between">

                    <div className="h-2.5 w-20 rounded-full bg-white/[0.08] animate-pulse" />

                    <div className="h-2.5 w-14 rounded-full bg-white/[0.06] animate-pulse" />

                  </div>

                  <div className="space-y-2">

                    <div className="h-4 w-full rounded bg-white/[0.08] animate-pulse" />

                    <div className="h-4 w-3/4 rounded bg-white/[0.06] animate-pulse" />

                  </div>

                  <div className="mt-4 flex gap-1">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <div
                          key={star}
                          className="h-2 w-2 rounded-full bg-orange-500/20 animate-pulse"
                        />
                      )
                    )}

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    <div className="h-6 w-24 rounded bg-orange-500/10 animate-pulse" />

                    <div className="h-9 w-9 rounded-xl bg-white/[0.06] animate-pulse" />

                  </div>

                  <div className="mt-5 h-[2px] w-full rounded bg-white/[0.05] animate-pulse" />

                </div>

              </div>

            ))}

          </div>

        )}

        {/* ================= EMPTY ================= */}

        {!loading &&
          filteredProducts.length === 0 && (

            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-24 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                <FaShoppingBag />
              </div>

              <h3 className="mt-6 text-xl font-black">
                No Products Found
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Try another search or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-xs font-black text-white hover:bg-orange-600"
              >
                Clear Filters
              </button>

            </div>

          )}

        {/* ================= PRODUCT GRID ================= */}

        {!loading &&
          filteredProducts.length > 0 && (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

              {filteredProducts.map(
                (product: any, index: number) => {

                  const saved =
                    isInWishlist(product.id);

                  return (

                    <div
                      key={product.id}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                    >

                      {/* IMAGE */}

                      <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">

                        <Link
                          href={`/product/${product.id}`}
                        >

                          <img
                            src={product.image}
                            alt={
                              product.name ||
                              "Product"
                            }
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                        </Link>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                        {/* CATEGORY */}

                        {product.category && (

                          <div className="absolute left-3 top-3 max-w-[70%] rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">

                            <span className="block truncate text-[9px] font-black uppercase tracking-widest text-orange-400">
                              {product.category}
                            </span>

                          </div>

                        )}

                        {/* RANKING */}

                        <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-[10px] font-black text-white backdrop-blur-md">
                          #{index + 1}
                        </div>

                        {/* WISHLIST */}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToWishlist(product);
                          }}
                          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md ${
                            saved
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-white/10 bg-black/60 text-white hover:border-orange-500 hover:bg-orange-500"
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <FaHeart className="text-sm" />
                        </button>

                        {/* VIEW */}

                        <Link
                          href={`/product/${product.id}`}
                          className="absolute bottom-3 right-3 flex translate-y-14 items-center gap-2 rounded-xl bg-white px-4 py-3 text-[10px] font-black text-black opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-orange-500 hover:text-white"
                        >
                          <FaShoppingBag />
                          View
                        </Link>

                      </div>

                      {/* INFO */}

                      <div className="p-4 sm:p-5">

                        <div className="mb-2 flex items-center justify-between gap-2">

                          {product.category && (
                            <span className="truncate text-[9px] font-black uppercase tracking-[0.18em] text-gray-600">
                              {product.category}
                            </span>
                          )}

                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-green-500">
                            In Stock
                          </span>

                        </div>

                        <h3 className="line-clamp-2 min-h-[42px] text-sm font-bold leading-5 text-white group-hover:text-orange-400">
                          {product.name}
                        </h3>

                        {/* RATING */}

                        <div className="mt-3 flex items-center gap-1">

                          {[1, 2, 3, 4, 5].map(
                            (star) => (
                              <FaStar
                                key={star}
                                className="text-[9px] text-orange-400"
                              />
                            )
                          )}

                          <span className="ml-1 text-[10px] text-gray-500">
                            5.0
                          </span>

                        </div>

                        {/* PRICE */}

                        <div className="mt-4 flex items-end justify-between gap-2">

                          <div className="flex flex-wrap items-end gap-2">

                            <span className="text-lg font-black text-orange-500 sm:text-xl">
                              Rs. {product.price}
                            </span>

                            {product.oldPrice && (

                              <span className="mb-0.5 text-xs text-gray-600 line-through">
                                Rs. {product.oldPrice}
                              </span>

                            )}

                          </div>

                          <Link
                            href={`/product/${product.id}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                          >
                            <FaArrowRight className="text-[10px]" />
                          </Link>

                        </div>

                        <div className="mt-5 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-500 group-hover:w-full" />

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

      </section>

      {/* ================= CTA ================= */}

      <section className="border-t border-white/10">

        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-6 lg:py-20">

          <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
            Styles Bazar
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Find Your Next Favorite
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
            Quality products, great prices and a shopping experience
            designed for you.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-black text-white hover:bg-orange-600"
          >
            Back To Home
            <FaArrowRight className="text-xs" />
          </Link>

        </div>

      </section>

    </main>
  );
}
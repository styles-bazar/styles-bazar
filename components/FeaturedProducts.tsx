"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaHeart,
  FaStar,
  FaShoppingBag,
  FaFire,
} from "react-icons/fa";

import { getProducts } from "@/lib/productService";
import { useWishlist } from "@/context/WishlistContext";

type Product = {
  id: string;
  name?: string;
  image?: string;
  price?: string | number;
  oldPrice?: string | number;
  category?: string;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        console.log("Featured Products:", data);

        if (mounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Featured products error:", error);

        if (mounted) {
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-20">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-200px] top-20 h-[450px] w-[450px] rounded-full bg-orange-600/[0.06] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">

          <div>

            <div className="mb-3 flex items-center gap-2">

              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <FaFire className="text-xs" />
              </span>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                Handpicked For You
              </p>

            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              Featured
              <span className="text-orange-500"> Products.</span>
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Discover our most popular products.
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


        {/* LOADING */}

        {loading && (

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {[1, 2, 3, 4, 5].map((item) => (

              <div
                key={item}
                className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d0d]"
              >

                <div className="aspect-[4/5] animate-pulse bg-[#151515]" />

                <div className="space-y-3 p-4">

                  <div className="h-4 w-4/5 animate-pulse rounded bg-white/10" />

                  <div className="h-3 w-2/5 animate-pulse rounded bg-white/10" />

                  <div className="h-5 w-1/2 animate-pulse rounded bg-orange-500/10" />

                </div>

              </div>

            ))}

          </div>

        )}


        {/* NO PRODUCTS */}

        {!loading && products.length === 0 && (

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] py-20 text-center">

            <FaShoppingBag className="mx-auto mb-4 text-3xl text-gray-700" />

            <h3 className="text-lg font-black text-white">
              No Featured Products
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Products will appear here when they are added to your store.
            </p>

          </div>

        )}


        {/* PRODUCTS */}

        {!loading && products.length > 0 && (

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {products.slice(0, 10).map((product, index) => {

              const saved = isInWishlist(product.id);

              return (

                <article
                  key={product.id}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d0d] transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">

                    <Link href={`/product/${product.id}`}>

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.name || "Product"}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-gray-700">
                          <FaShoppingBag className="text-3xl" />
                        </div>

                      )}

                    </Link>


                    {/* IMAGE GRADIENT */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />


                    {/* FEATURED BADGE */}

                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-black/70 px-3 py-1.5 backdrop-blur-md">

                      <FaFire className="text-[9px] text-orange-500" />

                      <span className="text-[8px] font-black uppercase tracking-widest text-orange-400">
                        Featured
                      </span>

                    </div>


                    {/* NUMBER */}

                    <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-[10px] font-black text-white backdrop-blur-md">
                      #{String(index + 1).padStart(2, "0")}
                    </div>


                    {/* WISHLIST */}

                    <button
                      type="button"
                      onClick={() => addToWishlist(product)}
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                        saved
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-white/10 bg-black/60 text-white hover:border-orange-500 hover:bg-orange-500"
                      }`}
                      aria-label="Add to wishlist"
                    >

                      <FaHeart className="text-xs" />

                    </button>


                    {/* VIEW BUTTON */}

                    <Link
                      href={`/product/${product.id}`}
                      className="absolute bottom-3 right-3 flex translate-y-12 items-center gap-2 rounded-xl bg-white px-3 py-2 text-[9px] font-black text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-orange-500 hover:text-white"
                    >

                      <FaShoppingBag />

                      View

                    </Link>

                  </div>


                  {/* INFO */}

                  <div className="p-4">

                    {/* CATEGORY */}

                    {product.category && (

                      <p className="mb-2 text-[9px] font-black uppercase tracking-[0.2em] text-orange-500">
                        {product.category}
                      </p>

                    )}


                    {/* NAME */}

                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-white transition-colors group-hover:text-orange-400">
                      {product.name || "Unnamed Product"}
                    </h3>


                    {/* RATING */}

                    <div className="mt-3 flex items-center gap-1">

                      {[1, 2, 3, 4, 5].map((star) => (

                        <FaStar
                          key={star}
                          className="text-[9px] text-orange-400"
                        />

                      ))}

                      <span className="ml-1 text-[10px] text-gray-600">
                        5.0
                      </span>

                    </div>


                    {/* PRICE */}

                    <div className="mt-3 flex items-end gap-2">

                      <span className="text-lg font-black text-orange-500">
                        Rs. {product.price ?? "0"}
                      </span>

                      {product.oldPrice && (

                        <span className="mb-0.5 text-[10px] text-gray-600 line-through">
                          Rs. {product.oldPrice}
                        </span>

                      )}

                    </div>


                    {/* BOTTOM LINE */}

                    <div className="mt-4 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />

                  </div>

                </article>

              );

            })}

          </div>

        )}


        {/* MOBILE BUTTON */}

        {!loading && products.length > 0 && (

          <Link
            href="/products"
            className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 py-4 text-sm font-bold text-orange-500 transition hover:bg-orange-500 hover:text-white sm:hidden"
          >
            Explore All Products

            <FaArrowRight className="text-xs" />

          </Link>

        )}

      </div>

    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBox,
  FaEdit,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";

import {
  getProducts,
  deleteProduct,
} from "@/lib/productService";

type Product = {
  id: string;
  name?: string;
  category?: string;
  image?: string;
  price?: number | string;
  oldPrice?: number | string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  async function loadProducts(): Promise<void> {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts((data || []) as Product[]);
    } catch (error) {
      console.error("Products load error:", error);
      alert("Products load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string): Promise<void> {
    const confirmDelete = window.confirm(
      "Kya aap is product ko delete karna chahte hain?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev: Product[]) =>
        prev.filter((product: Product) => product.id !== id)
      );

      alert("Product delete ho gaya ✅");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Product delete nahi hua.");
    }
  }

  const query: string = search.toLowerCase().trim();

  const filteredProducts: Product[] = products.filter(
    (product: Product) => {
      if (!query) return true;

      const name = String(product.name || "").toLowerCase();
      const category = String(
        product.category || ""
      ).toLowerCase();

      return (
        name.includes(query) ||
        category.includes(query)
      );
    }
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

        <div className="absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-orange-600/[0.07] blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-orange-400/[0.05] blur-[150px]" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400"
            >
              <FaArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-orange-500">
                Styles Bazar
              </p>

              <h1 className="mt-0.5 text-xl font-black tracking-tight sm:text-2xl">
                Products
              </h1>
            </div>
          </div>

          <Link
            href="/admin/products/add"
            className="group flex items-center gap-2 rounded-2xl border border-orange-400/30 bg-orange-500/90 px-4 py-3 text-xs font-black text-white transition-all duration-300 hover:bg-orange-500 sm:px-5 sm:text-sm"
          >
            <FaPlus className="transition-transform duration-300 group-hover:rotate-90" />

            <span>Add Product</span>
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10">
        {/* HERO */}
        <div className="relative mb-7 overflow-hidden rounded-[30px] border border-white/[0.09] bg-white/[0.035] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-[90px]" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-2xl text-orange-400">
                <FaBox />

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#080808] bg-orange-500" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                  Store Management
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                  All Products
                </h2>

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <FaLayerGroup className="text-orange-500" />

                  <span>
                    {products.length} products in your store
                  </span>
                </div>
              </div>
            </div>

            {/* SEARCH */}
            <div className="w-full lg:max-w-sm">
              <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl focus-within:border-orange-500/40">
                <FaSearch className="mr-3 text-sm text-gray-600" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        {!loading && (
          <div className="mb-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
                Total
              </p>

              <p className="mt-1 text-2xl font-black">
                {products.length}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/10 bg-orange-500/[0.035] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500/70">
                Showing
              </p>

              <p className="mt-1 text-2xl font-black text-orange-400">
                {filteredProducts.length}
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 sm:col-span-1">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
                Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-sm font-bold text-gray-300">
                  Store Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(
              (item: number) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 animate-pulse rounded-2xl bg-white/[0.06]" />

                    <div className="flex-1 space-y-3">
                      <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />

                      <div className="h-5 w-2/3 animate-pulse rounded bg-white/[0.06]" />

                      <div className="h-4 w-28 animate-pulse rounded bg-orange-500/[0.08]" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.03] px-6 py-24 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-orange-500/20 bg-orange-500/10 text-3xl text-orange-500">
              <FaBox />
            </div>

            <h3 className="mt-6 text-2xl font-black">
              No Products Found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              {search
                ? "Search ke liye koi product nahi mila."
                : "Abhi koi product add nahi hua."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-6 rounded-xl border border-orange-500/30 bg-orange-500/10 px-5 py-3 text-xs font-black text-orange-400 transition hover:bg-orange-500 hover:text-white"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && filteredProducts.length > 0 && (
          <div className="space-y-4">
            {filteredProducts.map(
              (product: Product, index: number) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/25"
                >
                  <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/0 blur-[80px] transition-all duration-500 group-hover:bg-orange-500/10" />

                  <div className="relative flex flex-col gap-5 p-4 sm:p-5 md:flex-row md:items-center">
                    {/* IMAGE */}
                    <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 md:h-28 md:w-28">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={
                            product.name ||
                            "Product"
                          }
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-700">
                          <FaBox className="text-3xl" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute bottom-2 left-2 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[9px] font-black text-orange-400">
                        #
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-orange-500/20 bg-orange-500/[0.08] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-orange-400">
                          {product.category ||
                            "Uncategorized"}
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-green-500">
                          <FaCheckCircle />
                          Active
                        </span>
                      </div>

                      <h3 className="mt-3 line-clamp-2 text-base font-black leading-6 text-white sm:text-lg">
                        {product.name ||
                          "Unnamed Product"}
                      </h3>

                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-xl font-black text-orange-500 sm:text-2xl">
                          Rs. {product.price || 0}
                        </span>

                        {product.oldPrice && (
                          <span className="text-xs text-gray-600 line-through">
                            Rs. {product.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex shrink-0 gap-2 md:flex-col lg:flex-row">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="flex items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-xs font-black text-blue-400 transition hover:bg-blue-500/20"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-black text-red-400 transition hover:bg-red-500/20"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

import { getProducts } from "@/lib/productService";
import { useCart } from "@/context/CartContext";

export default function CategoryPage() {
  const { name } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      const filtered = data.filter(
        (item: any) =>
          item.category?.toLowerCase() === String(name).toLowerCase()
      );

      setProducts(filtered);
    }

    loadProducts();
  }, [name]);

  return (
    <main className="min-h-screen bg-[#070707] text-white max-w-7xl mx-auto py-10 px-4">

      {/* Category Heading */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          {name}
        </h1>

        <div className="mt-3 h-1 w-14 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-400">
            No Products Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

          {products.map((product: any) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                border border-orange-500/20
                bg-white/[0.04]
                backdrop-blur-xl
                shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-orange-500/60
                hover:shadow-[0_0_25px_rgba(249,115,22,0.18)]
              "
            >

              {/* Product Image */}
              <div className="relative p-2">

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full
                    h-56
                    md:h-60
                    object-cover
                    rounded-xl
                    transition-transform
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />

                {/* Discount Badge */}
                <div className="
                  absolute
                  top-4
                  left-4
                  bg-orange-500
                  text-white
                  text-xs
                  font-bold
                  px-3
                  py-1.5
                  rounded-full
                  shadow-[0_0_12px_rgba(249,115,22,0.45)]
                ">
                  🔥 SALE
                </div>

              </div>

              {/* Product Information */}
              <div className="px-4 pb-4 pt-2">

                <h2 className="
                  font-bold
                  text-white
                  text-base
                  leading-6
                  line-clamp-2
                  min-h-[48px]
                ">
                  {product.name}
                </h2>

                {/* Current Price */}
                <p className="
                  text-orange-500
                  text-2xl
                  font-extrabold
                  mt-3
                ">
                  Rs. {product.price}
                </p>

                {/* Old Price */}
                <p className="
                  line-through
                  text-gray-500
                  text-sm
                  mt-1
                ">
                  Rs. {product.oldPrice}
                </p>

                {/* Add To Cart */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="
                    mt-4
                    w-full
                    bg-orange-600
                    hover:bg-orange-500
                    text-white
                    py-3
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    gap-2
                    font-semibold
                    transition-all
                    duration-300
                    shadow-[0_0_15px_rgba(249,115,22,0.25)]
                    hover:shadow-[0_0_22px_rgba(249,115,22,0.45)]
                  "
                >
                  <FaShoppingCart />
                  Add To Cart
                </button>

              </div>
            </Link>
          ))}

        </div>
      )}

    </main>
  );
}
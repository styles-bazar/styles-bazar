"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { getProducts } from "@/lib/productService";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useWishlist } from "@/context/WishlistContext";

export default function TrendingProducts() {
  const [products, setProducts] = useState<any[]>([]);

  const { addToCart } = useCart();
  const { search } = useSearch();
  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product: any) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto mt-12 px-4">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          🔥 Trending Products
        </h2>

        <Link
          href="/products"
          className="text-orange-600 font-bold"
        >
          View All →
        </Link>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-500">
            No Products Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {filteredProducts.map((product: any) => (

            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl duration-300 group"
            >

              <div className="relative">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 duration-300"
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(product);
                  }}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full shadow flex items-center justify-center transition ${
                    isInWishlist(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <FaHeart />
                </button>

              </div>

              <div className="p-4">

                <h3 className="font-semibold line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex text-yellow-400 mt-2 gap-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <div className="mt-3">
                  <span className="text-orange-600 text-2xl font-bold">
                    Rs. {product.price}
                  </span>
                </div>

                <div className="line-through text-gray-400">
                  Rs. {product.oldPrice}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="mt-4 w-full bg-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-700"
                >
                  <FaShoppingCart />
                  Add To Cart
                </button>

              </div>

            </Link>

          ))}

        </div>
      )}

    </section>
  );
}
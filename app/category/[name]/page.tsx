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
          item.category?.toLowerCase() ===
          String(name).toLowerCase()
      );

      setProducts(filtered);
    }

    loadProducts();
  }, [name]);

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-8">
        {name}
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-500">
            No Products Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {products.map((product: any) => (

            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold line-clamp-2">
                  {product.name}
                </h2>

                <p className="text-orange-600 text-2xl font-bold mt-2">
                  Rs. {product.price}
                </p>

                <p className="line-through text-gray-400">
                  Rs. {product.oldPrice}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
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
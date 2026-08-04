"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">
            Your Wishlist is Empty
          </h2>

          <Link
            href="/"
            className="inline-block mt-6 bg-orange-600 text-white px-8 py-3 rounded-xl"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {wishlist.map((product: any) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow overflow-hidden"
            >

              <img
                src={product.image}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold">
                  {product.name}
                </h2>

                <p className="text-orange-600 text-xl font-bold mt-2">
                  Rs. {product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-orange-600 text-white py-3 rounded-xl"
                >
                  Add To Cart
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </main>
  );
}
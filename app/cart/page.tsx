"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const router = useRouter();
  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          🛒 Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              Your Cart is Empty
            </h2>

            <Link
              href="/"
              className="inline-block mt-6 bg-orange-600 text-white px-8 py-3 rounded-xl"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}

            <div className="lg:col-span-2 space-y-6">

              {cart.map((item: any) => (

                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow p-5 flex gap-5 items-center"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-orange-600 text-xl font-bold mt-2">
                      Rs. {item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-red-600 text-white w-10 h-10 rounded-lg"
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-green-600 text-white w-10 h-10 rounded-lg"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* Summary */}

            <div className="bg-white rounded-2xl shadow p-6 h-fit">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-lg mb-4">
                <span>Total</span>
                <span className="font-bold">
                  Rs. {total}
                </span>
              </div>

              <button
  onClick={() => router.push("/checkout")}
  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold"
>
  Proceed To Checkout →
</button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}
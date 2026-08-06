"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { saveOrder } from "@/lib/orderService";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

  async function placeCustomerOrder() {
    if (
      !name ||
      !phone ||
      !city ||
      !address
    ) {
      alert("Please fill all fields.");
      return;
    }

    await saveOrder({
      customerName: name,
      customerPhone: phone,
      customerCity: city,
      customerAddress: address,

      products: cart,

      total,

      status: "Pending",

      createdAt: new Date().toISOString(),
    });

    let message = `🛍️ New Order

👤 ${name}

📱 ${phone}

🏙 ${city}

🏠 ${address}

`;

    cart.forEach((item: any) => {
      message += `📦 ${item.name}
Qty: ${item.quantity}
Price: Rs. ${item.price}

`;
    });

    message += `💰 Total: Rs. ${total}`;

    clearCart();
    alert("✅ Order Placed Successfully!");

    window.open(
      `https://wa.me/923356891247?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    router.push("/");
  }
if (cart.length === 0) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow text-center">
        <h1 className="text-3xl font-bold mb-4">
          🛒 Your Cart is Empty
        </h1>

        <p className="text-gray-500 mb-6">
          Please add some products first.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-orange-600 text-white px-6 py-3 rounded-xl"
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}
  return (
        <main className="min-h-screen bg-gray-100 py-10 px-4">

  <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

    <h1 className="text-3xl font-bold text-center mb-8">
      🛍 Checkout
    </h1>

    <input
      type="text"
      placeholder="👤 Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full border rounded-xl p-4 mb-4"
    />

    <input
      type="text"
      placeholder="📱 Phone Number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full border rounded-xl p-4 mb-4"
    />

    <input
      type="text"
      placeholder="🏙 City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="w-full border rounded-xl p-4 mb-4"
    />

    <textarea
      placeholder="🏠 Complete Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="w-full border rounded-xl p-4 mb-6"
      rows={4}
    />

    <div className="bg-gray-100 rounded-2xl p-5 mb-6">

      <h2 className="text-xl font-bold mb-4">
        🛒 Order Summary
        <div className="bg-green-100 border border-green-300 rounded-xl p-4 mb-6">

  <h2 className="font-bold text-lg mb-2">
    💵 Payment Method
  </h2>

  <p>
    Cash On Delivery (COD)
  </p>

</div>
      </h2>

      {cart.map((item: any) => (

        <div
          key={item.id}
          className="flex justify-between mb-3"
        >
          <span>
            {item.name} × {item.quantity}
          </span>

          <span className="font-semibold">
            Rs. {item.price * item.quantity}
          </span>

        </div>

      ))}

      <hr className="my-4" />

      <div className="flex justify-between text-2xl font-bold">

        <span>Total</span>

        <span className="text-orange-600">
          Rs. {total}
        </span>

      </div>

    </div>
        <button
      onClick={placeCustomerOrder}
      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold text-lg"
    >
      📦 Place Order (Cash On Delivery)
    </button>

  </div>

</main>
  );
}
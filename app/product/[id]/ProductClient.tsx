"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/productService";

export default function ProductClient({ product }: any) {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );

  const [showOrderForm, setShowOrderForm] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [quantity, setQuantity] = useState(1);

  const totalPrice = product.price * quantity;

  async function orderOnWhatsApp() {
    if (
      !customerName ||
      !customerPhone ||
      !customerCity ||
      !customerAddress
    ) {
      alert("Please fill all fields");
      return;
    }

    await placeOrder({
      customerName,
      customerPhone,
      customerCity,
      customerAddress,

      productId: product.id,
      productName: product.name,

      price: product.price,
      quantity,
      total: totalPrice,

      status: "Pending",

      createdAt: new Date().toISOString(),
    });

    const message = `Assalam-o-Alaikum

🛍️ New Order

👤 Name: ${customerName}

📱 Phone: ${customerPhone}

🏙 City: ${customerCity}

🏠 Address: ${customerAddress}

📦 Product: ${product.name}

🔢 Quantity: ${quantity}

💰 Price: Rs. ${product.price}

💵 Total: Rs. ${totalPrice}

Product Link:
${window.location.href}`;

    window.open(
      `https://wa.me/923356891247?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }
  return (
  <main className="min-h-screen bg-gray-100 py-10 px-4">

    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8 grid lg:grid-cols-2 gap-10">

      {/* Left Side */}

      <div>

        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-2xl border"
        />

        {product.images?.length > 1 && (

          <div className="flex gap-3 mt-5 overflow-x-auto">

            {product.images.map((img: string, index: number) => (

              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-orange-600"
                    : "border-gray-300"
                }`}
              />

            ))}

          </div>

        )}

      </div>

      {/* Right Side */}

      <div>

        <span className="bg-red-600 text-white px-4 py-2 rounded-full">
          {product.discount}% OFF
        </span>

        <h1 className="text-4xl font-bold mt-5">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 mt-4">

          <span className="text-yellow-500 text-xl">
            ⭐⭐⭐⭐⭐
          </span>

          <span className="text-gray-500">
            (128 Reviews)
          </span>

        </div>

        <p className="text-5xl font-bold text-orange-600 mt-6">
          Rs. {product.price}
        </p>

        <p className="line-through text-gray-400 text-xl">
          Rs. {product.oldPrice}
        </p>

        {/* Stock */}

        <div className="flex flex-wrap gap-3 mt-6">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            ✅ In Stock
          </span>

          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">
            🔥 18 Sold
          </span>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            👀 12 People Viewing
          </span>

        </div>

        {/* Trust */}

        <div className="grid grid-cols-2 gap-3 mt-6">

          <div className="bg-green-100 rounded-xl p-4 text-center">
            🚚
            <p className="font-bold">
              Free Delivery
            </p>
          </div>

          <div className="bg-yellow-100 rounded-xl p-4 text-center">
            💵
            <p className="font-bold">
              Cash On Delivery
            </p>
          </div>

          <div className="bg-blue-100 rounded-xl p-4 text-center">
            🔒
            <p className="font-bold">
              Secure Payment
            </p>
          </div>

          <div className="bg-red-100 rounded-xl p-4 text-center">
            ⭐
            <p className="font-bold">
              Premium Quality
            </p>
          </div>

        </div>

        {/* Quantity */}

        <div className="mt-8">

          <h2 className="font-bold text-xl mb-3">
            Quantity
          </h2>

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              className="bg-red-600 text-white w-12 h-12 rounded-xl text-xl"
            >
              -
            </button>

            <span className="text-2xl font-bold">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="bg-green-600 text-white w-12 h-12 rounded-xl text-xl"
            >
              +
            </button>

          </div>

        </div>

        {/* Description */}

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-3">
            Description
          </h2>

          <p className="leading-8 text-gray-700 whitespace-pre-line">
            {product.description}
          </p>

        </div>
                {/* Buttons */}

        <button
          onClick={() => addToCart({ ...product, quantity })}
          className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold text-lg"
        >
          🛒 Add To Cart
        </button>

        <button
          onClick={() => setShowOrderForm(true)}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg"
        >
          📦 Order Now
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("✅ Product Link Copied!");
          }}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold"
        >
          🔗 Copy Product Link
        </button>

        <Link
          href="/"
          className="block mt-4 text-center bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-xl font-bold"
        >
          ⬅ Back To Shop
        </Link>

      </div>

    </div>

    {/* Order Popup */}

    {showOrderForm && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-3xl p-6 w-full max-w-md relative">

          <button
            onClick={() => setShowOrderForm(false)}
            className="absolute top-4 right-4 text-red-600 text-2xl font-bold"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-5 text-center">
            Complete Your Order
          </h2>

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border rounded-xl p-3 mb-3"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full border rounded-xl p-3 mb-3"
          />

          <input
            type="text"
            placeholder="City"
            value={customerCity}
            onChange={(e) => setCustomerCity(e.target.value)}
            className="w-full border rounded-xl p-3 mb-3"
          />

          <textarea
            placeholder="Complete Address"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            className="w-full border rounded-xl p-3 mb-4"
            rows={3}
          />

          <button
            onClick={orderOnWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            📲 Confirm Order
          </button>

        </div>

      </div>
    )}

  </main>
);
}
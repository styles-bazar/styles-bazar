"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaArrowLeft,
  FaCheck,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaShieldAlt,
  FaTruck,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaTrash,
} from "react-icons/fa";

import { useCart } from "@/context/CartContext";
import { saveOrder } from "@/lib/orderService";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  async function placeCustomerOrder() {
    if (!name.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      alert("Please fill all customer details.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // Save order to Firebase
      await saveOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerCity: city.trim(),
        customerAddress: address.trim(),

        products: cart,

        total,

        status: "Pending",

        createdAt: new Date().toISOString(),
      });

      // WhatsApp message
      let message = `Assalam o Alaikum! 👋

🛍️ NEW ORDER - STYLES BAZAR

━━━━━━━━━━━━━━━━
👤 CUSTOMER DETAILS
━━━━━━━━━━━━━━━━

Name: ${name}
Phone: ${phone}
City: ${city}
Address: ${address}

━━━━━━━━━━━━━━━━
📦 ORDER DETAILS
━━━━━━━━━━━━━━━━
`;

      cart.forEach((item: any) => {
        message += `
🛍️ ${item.name}
Quantity: ${item.quantity}
Price: Rs. ${Number(item.price).toLocaleString()}
Subtotal: Rs. ${(
          Number(item.price) * Number(item.quantity)
        ).toLocaleString()}

`;
      });

      message += `━━━━━━━━━━━━━━━━
💰 TOTAL: Rs. ${total.toLocaleString()}
━━━━━━━━━━━━━━━━

💵 Payment Method: Cash on Delivery

Please confirm my order.
Thank you! ❤️`;

      const whatsappNumber = "923356891247";

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Clear cart
      clearCart();

      // Open WhatsApp
      window.open(whatsappURL, "_blank");

      alert("✅ Order placed successfully!");

      router.push("/");
    } catch (error) {
      console.error("Order Error:", error);

      alert("❌ Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#090909] px-4 py-16 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-[30px] border border-white/10 bg-[#111111] p-10 text-center shadow-2xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10">
              <FaShoppingBag className="text-3xl text-orange-500" />
            </div>

            <h1 className="mt-6 text-3xl font-black">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Please add some products to your cart before going to checkout.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black text-white transition hover:bg-orange-600"
            >
              <FaArrowLeft />
              Continue Shopping
            </button>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-8 text-white sm:px-6 lg:px-8">

      {/* HEADER */}

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <button
            onClick={() => router.push("/cart")}
            className="flex items-center gap-3 text-sm font-bold text-gray-500 transition hover:text-orange-500"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
              <FaArrowLeft />
            </span>

            Back to Cart
          </button>

          <div className="text-right">

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-500">
              Styles Bazar
            </p>

            <p className="mt-1 text-xs font-bold text-gray-500">
              Secure Checkout
            </p>

          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* LEFT */}

          <div className="space-y-6">

            {/* CUSTOMER INFORMATION */}

            <section className="rounded-[28px] border border-white/10 bg-[#111111] p-6 shadow-xl sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
                  <FaUser className="text-orange-500" />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    Delivery Information
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Enter your details for delivery
                  </p>
                </div>

              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                    Full Name
                  </label>

                  <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 transition focus-within:border-orange-500/50">

                    <FaUser className="mr-3 text-xs text-gray-600" />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-700"
                    />

                  </div>

                </div>

                {/* PHONE */}

                <div>

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                    Phone Number
                  </label>

                  <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 transition focus-within:border-orange-500/50">

                    <FaPhone className="mr-3 text-xs text-gray-600" />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XXXXXXXXX"
                      className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-700"
                    />

                  </div>

                </div>

                {/* CITY */}

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                    City
                  </label>

                  <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 transition focus-within:border-orange-500/50">

                    <FaMapMarkerAlt className="mr-3 text-xs text-gray-600" />

                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Your city"
                      className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-700"
                    />

                  </div>

                </div>

                {/* ADDRESS */}

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                    Complete Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House number, street, area, landmark..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-4 text-sm text-white outline-none placeholder:text-gray-700 transition focus:border-orange-500/50"
                  />

                </div>

              </div>

            </section>

            {/* PAYMENT */}

            <section className="rounded-[28px] border border-white/10 bg-[#111111] p-6 shadow-xl sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
                  <FaCheck className="text-green-500" />
                </div>

                <div>

                  <h2 className="text-xl font-black">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Safe and convenient payment
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/[0.06] p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-black">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-[11px] text-gray-600">
                      Pay when your order arrives.
                    </p>

                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <FaCheck className="text-xs" />
                  </div>

                </div>

              </div>

            </section>

            {/* TRUST */}

            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-2xl border border-white/10 bg-[#111111] p-4 text-center">

                <FaShieldAlt className="mx-auto text-orange-500" />

                <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-gray-600">
                  Secure
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111111] p-4 text-center">

                <FaTruck className="mx-auto text-orange-500" />

                <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-gray-600">
                  Delivery
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111111] p-4 text-center">

                <FaWhatsapp className="mx-auto text-orange-500" />

                <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-gray-600">
                  WhatsApp
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT - ORDER SUMMARY */}

          <aside className="lg:sticky lg:top-6 lg:h-fit">

            <section className="rounded-[28px] border border-white/10 bg-[#111111] p-6 shadow-2xl sm:p-7">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-500">
                    Your Order
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Order Summary
                  </h2>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">

                  <FaShoppingBag className="text-orange-500" />

                </div>

              </div>

              {/* PRODUCTS */}

              <div className="mt-7 space-y-4">

                {cart.map((item: any) => (

                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4"
                  >

                    <div className="flex gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">

                        <h3 className="line-clamp-2 text-sm font-bold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-orange-500">
                          Rs. {Number(item.price).toLocaleString()}
                        </p>

                        <div className="mt-3 flex items-center justify-between">

                          {/* QUANTITY */}

                          <div className="flex items-center overflow-hidden rounded-lg border border-white/10">

                            <button
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="flex h-8 w-8 items-center justify-center text-gray-500 transition hover:bg-orange-500 hover:text-white"
                            >
                              <FaMinus className="text-[8px]" />
                            </button>

                            <span className="flex h-8 min-w-[32px] items-center justify-center border-x border-white/10 text-xs font-black">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="flex h-8 w-8 items-center justify-center text-gray-500 transition hover:bg-orange-500 hover:text-white"
                            >
                              <FaPlus className="text-[8px]" />
                            </button>

                          </div>

                          {/* REMOVE */}

                          <button
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="text-xs text-gray-600 transition hover:text-red-500"
                            title="Remove product"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </div>

                    </div>

                    <div className="mt-4 flex justify-between border-t border-white/10 pt-3">

                      <span className="text-xs text-gray-600">
                        Subtotal
                      </span>

                      <span className="text-sm font-black">
                        Rs.{" "}
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString()}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

              {/* TOTAL */}

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-bold">
                    Rs. {total.toLocaleString()}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-gray-600">
                    Payment
                  </span>

                  <span className="font-bold text-green-500">
                    Cash on Delivery
                  </span>

                </div>

                <div className="flex items-end justify-between border-t border-white/10 pt-4">

                  <span className="text-sm font-black uppercase tracking-wider">
                    Total
                  </span>

                  <span className="text-2xl font-black text-orange-500">
                    Rs. {total.toLocaleString()}
                  </span>

                </div>

              </div>

              {/* PLACE ORDER */}

              <button
                onClick={placeCustomerOrder}
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-5 text-sm font-black text-white shadow-[0_15px_35px_rgba(249,115,22,0.2)] transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  "Processing Order..."
                ) : (
                  <>
                    <FaWhatsapp className="text-xl" />
                    Place Order via WhatsApp
                  </>
                )}

              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-gray-600">
                Your order will be saved and the details will
                open automatically in WhatsApp for confirmation.
              </p>

            </section>

          </aside>

        </div>

      </div>

    </main>
  );
}
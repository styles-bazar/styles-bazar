"use client";

import Link from "next/link";
import {
  FaArrowLeft,
  FaShoppingBag,
  FaTrash,
  FaMinus,
  FaPlus,
  FaTruck,
  FaShieldAlt,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const items = cartItems || [];

  const subtotal = items.reduce(
    (total: number, item: any) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const total = subtotal;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const whatsappNumber = "923356891247";

    const productsText = items
      .map(
        (item: any, index: number) =>
          `${index + 1}. ${item.name}
Quantity: ${item.quantity}
Price: Rs. ${Number(item.price).toLocaleString()}
Subtotal: Rs. ${(Number(item.price) * Number(item.quantity)).toLocaleString()}`
      )
      .join("\n\n");

    const message = encodeURIComponent(
      `Assalam o Alaikum! 👋

Mujhe ye products order karne hain.

━━━━━━━━━━━━━━
🛍️ ORDER DETAILS
━━━━━━━━━━━━━━

${productsText}

━━━━━━━━━━━━━━
💰 TOTAL
━━━━━━━━━━━━━━

Total: Rs. ${total.toLocaleString()}

Payment: Cash on Delivery

Please confirm my order. Thank you!`
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#070707] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-sm font-bold text-gray-500 transition hover:text-orange-500"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition group-hover:border-orange-500/40 group-hover:bg-orange-500/10">
              <FaArrowLeft className="text-xs" />
            </span>

            Continue Shopping
          </Link>

          <div className="mt-16 flex flex-col items-center justify-center rounded-[30px] border border-white/10 bg-[#0d0d0d] px-6 py-20 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500/10">
              <FaShoppingBag className="text-3xl text-orange-500" />
            </div>

            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
              Styles Bazar
            </p>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Your Cart Is Empty
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Looks like you haven't added anything to your shopping cart yet.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black text-white transition hover:bg-orange-600"
            >
              Start Shopping
              <FaArrowRight className="text-xs" />
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-6 text-white sm:px-6 sm:py-10 lg:px-8">

      {/* Background Glow */}
      <div className="pointer-events-none fixed bottom-[-180px] right-[-180px] h-[400px] w-[400px] rounded-full bg-orange-500/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">

          <div>
            <Link
              href="/products"
              className="group mb-5 inline-flex items-center gap-3 text-sm font-bold text-gray-500 transition hover:text-orange-500"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition group-hover:border-orange-500/40 group-hover:bg-orange-500/10">
                <FaArrowLeft className="text-[10px]" />
              </span>

              Continue Shopping
            </Link>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
              Styles Bazar
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {items.length} {items.length === 1 ? "product" : "products"} in
              your cart
            </p>
          </div>

          {/* Clear Cart */}
          <button
            type="button"
            onClick={clearCart}
            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-xs font-black text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <FaTrash className="text-[10px]" />
            Clear Cart
          </button>

        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* CART ITEMS */}
          <div className="space-y-4">

            {items.map((item: any) => {

              const itemTotal =
                Number(item.price || 0) * Number(item.quantity || 1);

              return (
                <div
                  key={item.id}
                  className="group rounded-[24px] border border-white/10 bg-[#0d0d0d] p-4 transition hover:border-orange-500/20 sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-5">

                    {/* IMAGE */}
                    <Link
                      href={`/product/${item.id}`}
                      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-36 sm:w-36"
                    >
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* INFO */}
                    <div className="flex min-w-0 flex-1 flex-col">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          {item.category && (
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-orange-500">
                              {item.category}
                            </p>
                          )}

                          <Link
                            href={`/product/${item.id}`}
                            className="line-clamp-2 text-base font-black transition hover:text-orange-500 sm:text-lg"
                          >
                            {item.name}
                          </Link>

                        </div>

                        {/* REMOVE */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-600 transition hover:border-red-500/30 hover:bg-red-500 hover:text-white"
                          aria-label="Remove product"
                        >
                          <FaTrash className="text-[10px]" />
                        </button>

                      </div>

                      {/* PRICE */}
                      <div className="mt-3">

                        <span className="text-xl font-black text-orange-500">
                          Rs. {Number(item.price).toLocaleString()}
                        </span>

                      </div>

                      {/* BOTTOM */}
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">

                        {/* QUANTITY */}
                        <div className="flex items-center overflow-hidden rounded-xl border border-white/10 bg-[#080808]">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, Number(item.quantity) - 1)
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center text-gray-500 transition hover:bg-orange-500 hover:text-white"
                          >
                            <FaMinus className="text-[9px]" />
                          </button>

                          <span className="flex h-10 min-w-[45px] items-center justify-center border-x border-white/10 text-sm font-black">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Number(item.quantity) + 1
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center text-gray-500 transition hover:bg-orange-500 hover:text-white"
                          >
                            <FaPlus className="text-[9px]" />
                          </button>

                        </div>

                        {/* ITEM TOTAL */}
                        <div className="text-right">

                          <p className="text-[9px] font-black uppercase tracking-wider text-gray-600">
                            Subtotal
                          </p>

                          <p className="mt-1 text-base font-black">
                            Rs. {itemTotal.toLocaleString()}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">

            <div className="rounded-[26px] border border-white/10 bg-[#0d0d0d] p-6 sm:p-7">

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                Order Summary
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Checkout
              </h2>

              {/* PRICE */}
              <div className="mt-7 space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    Subtotal
                  </span>

                  <span className="text-sm font-black">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    Delivery
                  </span>

                  <span className="text-sm font-black text-orange-500">
                    Cash on Delivery
                  </span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-black uppercase tracking-wider">
                    Total
                  </span>

                  <span className="text-2xl font-black text-orange-500">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* CHECKOUT */}
              <Link
                href="/checkout"
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-4 text-sm font-black text-white shadow-[0_10px_30px_rgba(249,115,22,0.2)] transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Proceed To Checkout
                <FaArrowRight className="text-xs" />
              </Link>

              {/* WHATSAPP */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/[0.06] py-4 text-sm font-black text-green-400 transition hover:bg-green-500 hover:text-white"
              >
                <FaWhatsapp className="text-lg" />
                Order Cart on WhatsApp
              </button>

              {/* BENEFITS */}
              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <FaTruck className="text-xs" />
                  </span>

                  <div>
                    <p className="text-xs font-black">
                      Delivery Across Pakistan
                    </p>

                    <p className="mt-1 text-[10px] text-gray-600">
                      Get your order delivered to your doorstep.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <FaShieldAlt className="text-xs" />
                  </span>

                  <div>
                    <p className="text-xs font-black">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-[10px] text-gray-600">
                      Pay when your order arrives.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

        {/* BOTTOM */}
        <section className="mt-16 border-t border-white/10 pt-12 text-center">

          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
            Styles Bazar
          </p>

          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            Ready To Shop?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
            Explore more products and find something you love.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-black text-gray-300 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
          >
            Continue Shopping
            <FaArrowLeft className="text-[10px]" />
          </Link>

        </section>

      </div>

    </main>
  );
}
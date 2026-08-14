"use client";

import { useState } from "react";
import Link from "next/link";

import {
  FaArrowLeft,
  FaHeart,
  FaShoppingBag,
  FaWhatsapp,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaMinus,
  FaPlus,
  FaStar,
  FaCheck,
  FaBolt,
  FaTimes,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

type ProductMedia = {
  url?: string;
  type?: string;
  name?: string;
};

type Product = {
  id: string;
  name: string;
  category?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  description?: string;

  image?: string;

  // New product system
  media?: ProductMedia[];

  // Old product system
  images?: string[];
};

export default function ProductClient({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);

  const [showOrderForm, setShowOrderForm] =
    useState(false);

  const [shareMessage, setShareMessage] =
    useState("");

  const [activeImage, setActiveImage] =
    useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const {
    addToWishlist,
    isInWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const saved = isInWishlist(product.id);

  // =====================================================
  // PRODUCT IMAGES
  // =====================================================
  // Priority:
  // 1. media -> new products
  // 2. images -> old products
  // 3. image -> single image products
  // =====================================================

  const productImages: string[] = Array.isArray(
    product.media
  )
    ? product.media
        .map((item) =>
          typeof item === "string"
            ? item
            : item?.url || ""
        )
        .filter(Boolean)
    : Array.isArray(product.images)
      ? product.images.filter(Boolean)
      : product.image
        ? [product.image]
        : [];

  const currentImage =
    productImages[activeImage] ||
    productImages[0] ||
    product.image ||
    "";

  // =====================================================
  // QUANTITY
  // =====================================================

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  }

  // =====================================================
  // IMAGE NAVIGATION
  // =====================================================

  function nextImage() {
    if (productImages.length <= 1) return;

    setActiveImage((current) =>
      current >= productImages.length - 1
        ? 0
        : current + 1
    );
  }

  function previousImage() {
    if (productImages.length <= 1) return;

    setActiveImage((current) =>
      current <= 0
        ? productImages.length - 1
        : current - 1
    );
  }

  function selectImage(index: number) {
    setActiveImage(index);
  }

  // =====================================================
  // DISCOUNT
  // =====================================================

  const calculatedDiscount =
    product.oldPrice &&
    Number(product.oldPrice) >
      Number(product.price)
      ? Math.round(
          ((Number(product.oldPrice) -
            Number(product.price)) /
            Number(product.oldPrice)) *
            100
        )
      : 0;

  const discount =
    product.discount &&
    Number(product.discount) > 0
      ? Number(product.discount)
      : calculatedDiscount;

  // =====================================================
  // TOTAL
  // =====================================================

  const totalPrice =
    Number(product.price || 0) *
    quantity;

  // =====================================================
  // ADD TO CART
  // =====================================================

  function handleAddToCart() {
    addToCart(product, quantity);

    alert(
      "Product added to cart successfully!"
    );
  }

  // =====================================================
  // ORDER NOW
  // =====================================================

  function handleOrderNow() {
    setShowOrderForm(true);
  }

  // =====================================================
  // SHARE
  // =====================================================

  async function handleShare() {
    const shareData = {
      title: product.name,

      text: `Check out ${product.name} on Styles Bazar - Rs. ${Number(
        product.price || 0
      ).toLocaleString()}`,

      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setShareMessage(
          "Product link copied!"
        );

        setTimeout(() => {
          setShareMessage("");
        }, 2500);
      } else {
        setShareMessage(
          "Copy this page link to share."
        );

        setTimeout(() => {
          setShareMessage("");
        }, 2500);
      }
    } catch {
      console.log(
        "Share cancelled"
      );
    }
  }

  // =====================================================
  // WHATSAPP ORDER
  // =====================================================

  function handleWhatsAppOrder(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !name.trim() ||
      !phone.trim() ||
      !city.trim() ||
      !address.trim()
    ) {
      alert(
        "Please fill all the required fields."
      );

      return;
    }

    const whatsappNumber =
      "923356891247";

    const message =
      encodeURIComponent(
        `Assalam o Alaikum! 👋

Mujhe ye product order karna hai.

━━━━━━━━━━━━━━
🛍️ PRODUCT DETAILS
━━━━━━━━━━━━━━

Product: ${product.name}
Product ID: ${product.id}
Price: Rs. ${Number(
          product.price || 0
        ).toLocaleString()}
Quantity: ${quantity}
Total: Rs. ${totalPrice.toLocaleString()}

━━━━━━━━━━━━━━
👤 CUSTOMER DETAILS
━━━━━━━━━━━━━━

Name: ${name}
Phone: ${phone}
City: ${city}
Address: ${address}

Payment: Cash on Delivery

Please confirm my order. Thank you!`
      );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );

    setShowOrderForm(false);
  }

  return (
    <main className="min-h-screen">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed bottom-[-180px] right-[-180px] h-[400px] w-[400px] rounded-full bg-orange-500/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        {/* =====================================================
            TOP NAVIGATION
        ===================================================== */}

        <div className="mb-7 flex items-center justify-between gap-4">

          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-sm font-bold text-gray-500 transition hover:text-orange-500"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition group-hover:border-orange-500/40 group-hover:bg-orange-500/10">
              <FaArrowLeft className="text-xs" />
            </span>

            Back to Products
          </Link>

          {/* SHARE */}

          <div className="relative">

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-black text-gray-400 transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
            >
              <FaShareAlt />

              Share
            </button>

            {shareMessage && (
              <div className="absolute right-0 top-14 z-20 whitespace-nowrap rounded-xl border border-orange-500/20 bg-[#151515] px-4 py-2 text-xs font-bold text-orange-400 shadow-xl">
                {shareMessage}
              </div>
            )}

          </div>

        </div>

        {/* =====================================================
            MAIN PRODUCT
        ===================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

          {/* =====================================================
              IMAGE GALLERY
          ===================================================== */}

          <div>

            <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#101010] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">

              <div className="relative aspect-square overflow-hidden sm:aspect-[4/4.4]">

                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={
                      product.name ||
                      "Product"
                    }
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* FEATURED */}

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-orange-500/30 bg-black/70 px-4 py-2 backdrop-blur-xl">

                  <FaBolt className="text-[9px] text-orange-500" />

                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-400">
                    Featured
                  </span>

                </div>

                {/* DISCOUNT */}

                {discount > 0 && (
                  <div className="absolute bottom-5 left-5 rounded-full bg-orange-500 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                    {discount}% OFF
                  </div>
                )}

                {/* WISHLIST */}

                <button
                  type="button"
                  onClick={() =>
                    addToWishlist(
                      product
                    )
                  }
                  className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl transition-all ${
                    saved
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-white/10 bg-black/60 text-white hover:border-orange-500 hover:bg-orange-500"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <FaHeart className="text-sm" />
                </button>

                {/* PREVIOUS */}

                {productImages.length >
                  1 && (
                  <button
                    type="button"
                    onClick={
                      previousImage
                    }
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-orange-500"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                )}

                {/* NEXT */}

                {productImages.length >
                  1 && (
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-orange-500"
                    aria-label="Next image"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                )}

                {/* COUNTER */}

                {productImages.length >
                  1 && (
                  <div className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-[10px] font-black text-white backdrop-blur-md">
                    {activeImage + 1} /{" "}
                    {productImages.length}
                  </div>
                )}

              </div>
            </div>

            {/* =====================================================
                THUMBNAILS
            ===================================================== */}

            {productImages.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">

                {productImages
                  .slice(0, 5)
                  .map(
                    (
                      img,
                      index
                    ) => (
                      <button
                        key={`${img}-${index}`}
                        type="button"
                        onClick={() =>
                          selectImage(
                            index
                          )
                        }
                        className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all ${
                          activeImage ===
                          index
                            ? "border-orange-500 shadow-[0_10px_30px_rgba(249,115,22,0.18)]"
                            : "border-white/10 opacity-70 hover:border-orange-500/40 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${
                            index + 1
                          }`}
                          className="h-full w-full object-cover"
                        />

                        {activeImage ===
                          index && (
                          <div className="absolute inset-0 bg-orange-500/10" />
                        )}

                        <span className="absolute bottom-2 left-2 rounded-lg bg-black/70 px-2 py-1 text-[9px] font-black text-white">
                          {index + 1}
                        </span>
                      </button>
                    )
                  )}

              </div>
            )}

            {/* =====================================================
                TRUST CARDS
            ===================================================== */}

            <div className="mt-4 grid grid-cols-3 gap-3">

              <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 text-center transition hover:border-orange-500/30">

                <FaTruck className="mx-auto text-sm text-orange-500" />

                <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-gray-500">
                  Fast Delivery
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 text-center transition hover:border-orange-500/30">

                <FaShieldAlt className="mx-auto text-sm text-orange-500" />

                <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-gray-500">
                  Secure Order
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 text-center transition hover:border-orange-500/30">

                <FaUndo className="mx-auto text-sm text-orange-500" />

                <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-gray-500">
                  Easy Support
                </p>

              </div>

            </div>

          </div>

          {/* =====================================================
              PRODUCT INFORMATION
          ===================================================== */}

          <div className="flex flex-col justify-center">

            {/* CATEGORY */}

            {product.category && (
              <div className="mb-4 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                  {product.category}
                </p>

              </div>
            )}

            {/* TITLE */}

            <h1 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="mt-5 flex items-center gap-2">

              <div className="flex gap-1">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <FaStar
                      key={star}
                      className="text-[11px] text-orange-400"
                    />
                  )
                )}

              </div>

              <span className="text-xs font-semibold text-gray-500">
                5.0
              </span>

              <span className="text-gray-700">
                •
              </span>

              <span className="text-xs text-gray-500">
                Customer Favorite
              </span>

            </div>

            {/* PRICE */}

            <div className="mt-7 rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] p-6">

              <div className="flex flex-wrap items-end gap-3">

                <span className="text-3xl font-black text-orange-500 sm:text-4xl">
                  Rs.{" "}
                  {Number(
                    product.price || 0
                  ).toLocaleString()}
                </span>

                {product.oldPrice &&
                  Number(
                    product.oldPrice
                  ) > 0 && (
                    <span className="mb-1 text-sm text-gray-600 line-through">
                      Rs.{" "}
                      {Number(
                        product.oldPrice
                      ).toLocaleString()}
                    </span>
                  )}

                {discount > 0 && (
                  <span className="mb-1 rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-black text-orange-400">
                    SAVE {discount}%
                  </span>
                )}

              </div>

              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Cash on Delivery Available
              </p>

            </div>

            <div className="my-7 h-px bg-white/10" />

            {/* DETAILS */}

            <div>

              <div className="flex items-center gap-2">

                <span className="h-5 w-1 rounded-full bg-orange-500" />

                <h2 className="text-sm font-black uppercase tracking-[0.2em]">
                  Product Details
                </h2>

              </div>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                {product.description ||
                  "Premium quality product carefully selected for the Styles Bazar collection."}
              </p>

            </div>

            {/* QUANTITY */}

            <div className="mt-7">

              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">

                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                  className="flex h-12 w-12 items-center justify-center text-gray-500 transition hover:bg-orange-500 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="text-[9px]" />
                </button>

                <span className="flex h-12 min-w-[55px] items-center justify-center border-x border-white/10 text-sm font-black">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                  className="flex h-12 w-12 items-center justify-center text-gray-500 transition hover:bg-orange-500 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="text-[9px]" />
                </button>

              </div>

            </div>

            {/* TOTAL */}

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4">

              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Total
              </span>

              <span className="text-lg font-black">
                Rs.{" "}
                {totalPrice.toLocaleString()}
              </span>

            </div>

            {/* BUTTONS */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              {/* CART */}

              <button
                type="button"
                onClick={
                  handleAddToCart
                }
                className="flex items-center justify-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/[0.08] py-4 text-sm font-black text-orange-500 transition-all hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white"
              >
                <FaShoppingBag />

                Add to Cart
              </button>

              {/* ORDER */}

              <button
                type="button"
                onClick={
                  handleOrderNow
                }
                className="flex items-center justify-center gap-3 rounded-2xl bg-orange-500 py-4 text-sm font-black text-white shadow-[0_10px_30px_rgba(249,115,22,0.2)] transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <FaBolt />

                Order Now
              </button>

            </div>

            {/* WISHLIST */}

            <button
              type="button"
              onClick={() =>
                addToWishlist(
                  product
                )
              }
              className={`mt-3 flex items-center justify-center gap-3 rounded-2xl border py-4 text-sm font-black transition ${
                saved
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-white/10 bg-white/[0.03] text-white hover:border-orange-500/40 hover:text-orange-400"
              }`}
            >
              <FaHeart />

              {saved
                ? "Saved to Wishlist"
                : "Add to Wishlist"}
            </button>

            {/* CART LINK */}

            <Link
              href="/cart"
              className="mt-3 flex items-center justify-center gap-3 rounded-2xl border border-white/10 py-4 text-sm font-black text-gray-400 transition hover:border-orange-500/40 hover:text-orange-500"
            >
              <FaShoppingBag />

              View Shopping Cart
            </Link>

            {/* BENEFITS */}

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-5">

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="flex items-start gap-3">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <FaCheck className="text-[10px]" />
                  </span>

                  <div>

                    <p className="text-xs font-black">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-600">
                      Pay when your order arrives.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <FaTruck className="text-[10px]" />
                  </span>

                  <div>

                    <p className="text-xs font-black">
                      Delivery Across Pakistan
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-600">
                      Delivered to your doorstep.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ORDER FORM
      ===================================================== */}

      {showOrderForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">

          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] border border-white/10 bg-[#111111] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:p-8">

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setShowOrderForm(
                  false
                )
              }
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-500 transition hover:bg-orange-500 hover:text-white"
              aria-label="Close order form"
            >
              <FaTimes />
            </button>

            <div className="pr-12">

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                Styles Bazar
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Complete Your Order
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Enter your delivery details.
                After submitting, your order
                will open in WhatsApp for
                confirmation.
              </p>

            </div>

            {/* PRODUCT SUMMARY */}

            <div className="mt-6 flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">

              <img
                src={currentImage}
                alt={
                  product.name ||
                  "Product"
                }
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div className="min-w-0">

                <h3 className="line-clamp-2 text-sm font-bold">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Quantity:{" "}
                  {quantity}
                </p>

                <p className="mt-1 text-sm font-black text-orange-500">
                  Rs.{" "}
                  {totalPrice.toLocaleString()}
                </p>

              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleWhatsAppOrder
              }
              className="mt-6 space-y-4"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Full Name
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 focus-within:border-orange-500/50">

                  <FaUser className="mr-3 text-xs text-gray-600" />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    placeholder="Enter your name"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-700"
                    required
                  />

                </div>

              </div>

              {/* PHONE */}

              <div>

                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Phone Number
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 focus-within:border-orange-500/50">

                  <FaPhone className="mr-3 text-xs text-gray-600" />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    placeholder="03XXXXXXXXX"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-700"
                    required
                  />

                </div>

              </div>

              {/* CITY */}

              <div>

                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                  City
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 focus-within:border-orange-500/50">

                  <FaMapMarkerAlt className="mr-3 text-xs text-gray-600" />

                  <input
                    type="text"
                    value={city}
                    onChange={(e) =>
                      setCity(
                        e.target.value
                      )
                    }
                    placeholder="Your city"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-700"
                    required
                  />

                </div>

              </div>

              {/* ADDRESS */}

              <div>

                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Complete Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  placeholder="House number, street, area..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-4 text-sm text-white outline-none placeholder:text-gray-700 focus:border-orange-500/50"
                  required
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-4 text-sm font-black text-white shadow-[0_10px_30px_rgba(249,115,22,0.2)] transition hover:bg-orange-600"
              >

                <FaWhatsapp className="text-lg" />

                Continue to WhatsApp

              </button>

              <p className="text-center text-[10px] leading-5 text-gray-600">
                Your order details will be
                prepared and opened in WhatsApp
                for confirmation.
              </p>

            </form>

          </div>

        </div>
      )}

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="mt-16 border-t border-white/10 pt-12 text-center">

        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
          Styles Bazar
        </p>

        <h2 className="mt-3 text-2xl font-black sm:text-3xl">
          Love This Product?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
          Add it to your cart or order
          directly through WhatsApp.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-black text-gray-300 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
        >
          Continue Shopping

          <FaArrowLeft className="text-[10px]" />
        </Link>

      </section>

    </main>
  );
}
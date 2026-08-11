"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaBolt,
} from "react-icons/fa";

import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { search, setSearch } = useSearch();

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080808]/95 shadow-2xl backdrop-blur-xl">

      {/* Top Bar */}
      <div className="hidden border-b border-white/[0.06] bg-black/40 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5">

          <div className="flex items-center gap-5 text-[11px] font-semibold text-gray-500">
            <span className="text-orange-500">
              Free Delivery Across Pakistan
            </span>

            <span className="h-3 w-px bg-white/10" />

            <span>Secure Payments</span>

            <span className="h-3 w-px bg-white/10" />

            <span>Quality Products</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-semibold text-gray-500">
            <Link
              href="/contact"
              className="transition hover:text-orange-500"
            >
              Customer Care
            </Link>

            <Link
              href="/"
              className="transition hover:text-orange-500"
            >
              Track Order
            </Link>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-5">

        <div className="flex items-center gap-3 sm:gap-5">

          {/* Logo */}
          <Link href="/" className="group shrink-0">

            <div className="flex items-center gap-2.5">

              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 text-xl font-black text-white shadow-[0_0_25px_rgba(249,115,22,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(249,115,22,0.45)]">

                <div className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />

                <span className="relative">S</span>

              </div>

              <div className="hidden sm:block">

                <h1 className="text-xl font-black leading-none tracking-tight text-white">
                  Styles <span className="text-orange-500">Bazar</span>
                </h1>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.35em] text-gray-600">
                  Online Store
                </p>

              </div>

            </div>

          </Link>

          {/* Search */}
          <div className="min-w-0 flex-1">

            <div className="group relative">

              <FaSearch className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-600 transition-colors group-focus-within:text-orange-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="h-12 w-full rounded-2xl border border-white/10 bg-[#111111] pl-11 pr-14 text-sm font-medium text-white outline-none transition-all duration-300 placeholder:text-gray-600 hover:border-white/20 focus:border-orange-500/50 focus:bg-[#151515] focus:shadow-[0_0_30px_rgba(249,115,22,0.08)]"
              />

              <button
                type="button"
                aria-label="Search"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
              >
                <FaSearch className="text-xs" />
              </button>

            </div>

          </div>

          {/* Desktop Icons */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
            >
              <FaHeart className="text-sm transition-transform group-hover:scale-110" />

              {wishlist.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
            >
              <FaShoppingCart className="text-sm transition-transform group-hover:scale-110" />

              {cart.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link
              href="/login"
              className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs font-bold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
            >
              <FaUserCircle className="text-base" />
              <span className="hidden md:inline">
                Account
              </span>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500 sm:hidden"
          >
            {mobileMenu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>

        {/* Desktop Navigation */}
        <nav className="mt-3 hidden items-center justify-center gap-10 border-t border-white/[0.06] pt-3 lg:flex">

          <Link
            href="/"
            className="text-xs font-black text-orange-500 transition hover:text-orange-400"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="group flex items-center gap-1 text-xs font-bold text-gray-500 transition hover:text-orange-500"
          >
            Shop
            <FaChevronDown className="text-[7px] transition-transform group-hover:translate-y-0.5" />
          </Link>

          <Link
            href="/products"
            className="text-xs font-bold text-gray-500 transition hover:text-orange-500"
          >
            New Arrivals
          </Link>

          <Link
            href="/products"
            className="text-xs font-bold text-gray-500 transition hover:text-orange-500"
          >
            Best Sellers
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-1 text-xs font-black text-orange-500 transition hover:text-orange-400"
          >
            <FaBolt className="text-[9px]" />
            Special Offers
          </Link>

        </nav>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="mt-4 border-t border-white/[0.06] pt-4 sm:hidden">

            <nav className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm font-bold text-orange-500"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-gray-400 transition hover:bg-white/[0.04] hover:text-orange-500"
              >
                Shop All Products
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-gray-400 transition hover:bg-white/[0.04] hover:text-orange-500"
              >
                New Arrivals
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-gray-400 transition hover:bg-white/[0.04] hover:text-orange-500"
              >
                Best Sellers
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-orange-500 transition hover:bg-orange-500/10"
              >
                <FaBolt className="text-xs" />
                Special Offers
              </Link>

              <div className="my-2 h-px bg-white/[0.06]" />

              <div className="grid grid-cols-3 gap-2">

                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenu(false)}
                  className="relative flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-4 text-gray-400 transition hover:border-orange-500/30 hover:text-orange-500"
                >
                  <FaHeart />
                  <span className="text-[10px] font-bold">
                    Wishlist
                  </span>

                  {wishlist.length > 0 && (
                    <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[8px] font-black text-white">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setMobileMenu(false)}
                  className="relative flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-4 text-gray-400 transition hover:border-orange-500/30 hover:text-orange-500"
                >
                  <FaShoppingCart />
                  <span className="text-[10px] font-bold">
                    Cart
                  </span>

                  {cart.length > 0 && (
                    <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[8px] font-black text-white">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <Link
                  href="/login"
                  onClick={() => setMobileMenu(false)}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-4 text-gray-400 transition hover:border-orange-500/30 hover:text-orange-500"
                >
                  <FaUserCircle />
                  <span className="text-[10px] font-bold">
                    Account
                  </span>
                </Link>

              </div>

            </nav>

          </div>
        )}

      </div>

    </header>
  );
}
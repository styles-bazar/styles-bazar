"use client";

import Link from "next/link";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";

import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { search, setSearch } = useSearch();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex gap-3 sm:gap-5">
            <span>Save More</span>
            <span>Sell on Styles Bazar</span>
          </div>

          <div className="flex gap-3 sm:gap-5">
            <Link href="/">Customer Care</Link>
            <Link href="/">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 flex items-center gap-3 sm:gap-6">

          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-extrabold whitespace-nowrap text-orange-600"
          >
            Styles Bazar
          </Link>

          {/* SEARCH */}
          <div className="flex flex-1 min-w-0">

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 border border-gray-400 rounded-l-xl px-3 sm:px-5 h-12 outline-none text-gray-900 bg-white text-sm sm:text-base"
            />

            <button className="bg-orange-600 px-4 sm:px-6 text-white rounded-r-xl flex items-center justify-center">
              <FaSearch />
            </button>

          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4 sm:gap-7 text-xl sm:text-2xl text-gray-800 flex-shrink-0">

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative hover:text-orange-600"
            >
              <FaHeart />

              {wishlist.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative hover:text-orange-600"
            >
              <FaShoppingCart />

              {cart.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link href="/login">
              <FaUserCircle className="cursor-pointer hover:text-orange-600" />
            </Link>

          </div>

        </div>
      </nav>
    </>
  );
}
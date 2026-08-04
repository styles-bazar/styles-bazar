"use client";

import Link from "next/link";
import { FaSearch, FaShoppingCart, FaHeart, FaUserCircle } from "react-icons/fa";
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
      <div className="bg-orange-600 text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between px-4 py-2">
          <div className="flex gap-5">
            <Link href="/">Save More</Link>
            <Link href="/">Sell on Styles Bazar</Link>
          </div>

          <div className="flex gap-5">
            <Link href="/">Customer Care</Link>
            <Link href="/">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">

          <Link
            href="/"
            className="text-3xl font-extrabold text-orange-600"
          >
            Styles Bazar
          </Link>

          <div className="flex-1 flex">
            <input
  type="text"
  placeholder="Search Products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-l-xl px-5 h-12 outline-none"
/>

            <button className="bg-orange-600 px-6 text-white rounded-r-xl">
              <FaSearch />
            </button>
          </div>

          <div className="flex items-center gap-7 text-2xl">

            <Link href="/wishlist" className="relative">

  <FaHeart className="cursor-pointer hover:text-red-500" />

  {wishlist.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
      {wishlist.length}
    </span>
  )}

</Link>
<Link href="/cart" className="relative">

  <FaShoppingCart className="cursor-pointer hover:text-orange-600" />

  {cart.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
      {cart.length}
    </span>
  )}

</Link>

            <FaUserCircle className="cursor-pointer hover:text-orange-600" />

          </div>

        </div>
      </nav>
    </>
  );
}
"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const brands = [
  "Nike",
  "Adidas",
  "Apple",
  "Samsung",
  "Rolex",
  "Gucci",
  "Puma",
  "Zara",
];

export default function FeaturedBrands() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.025] blur-[120px]" />

      <div className="relative">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-orange-500">
                Premium Selection
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Featured{" "}
              <span className="text-orange-500">
                Brands
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Discover products from some of the names customers know and
              love.
            </p>

          </div>

          {/* Desktop */}
          <Link
            href="/products"
            className="group hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-3.5 text-sm font-bold text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400 sm:flex"
          >
            Explore Brands

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
              <FaArrowRight className="text-[10px]" />
            </span>
          </Link>

        </div>

        {/* Brands */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">

          {brands.map((brand, index) => (

            <Link
              href="/products"
              key={brand}
              className="group relative"
            >

              <article className="relative flex min-h-[145px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b] px-4 py-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-[#101010] hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]">

                {/* Glow */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/0 blur-[50px] transition-all duration-700 group-hover:bg-orange-500/20" />

                {/* Number */}
                <span className="relative text-[9px] font-black tracking-[0.25em] text-gray-700 transition-colors duration-300 group-hover:text-orange-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Brand */}
                <h3 className="relative mt-4 text-lg font-black tracking-tight text-gray-300 transition-all duration-300 group-hover:scale-105 group-hover:text-white sm:text-xl">
                  {brand}
                </h3>

                {/* Accent */}
                <div className="relative mt-4 h-[2px] w-6 bg-gray-800 transition-all duration-500 group-hover:w-12 group-hover:bg-orange-500" />

                {/* Explore */}
                <div className="relative mt-3 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-gray-700 opacity-0 transition-all duration-300 group-hover:text-orange-500 group-hover:opacity-100">
                  Explore
                  <FaArrowRight className="text-[7px] transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />

              </article>

            </Link>

          ))}

        </div>

        {/* Mobile */}
        <Link
          href="/products"
          className="group mt-7 flex items-center justify-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/[0.06] py-4 text-sm font-bold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white sm:hidden"
        >
          Explore Brands

          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

      </div>
    </section>
  );
}
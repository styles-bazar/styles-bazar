"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBolt,
  FaTag,
} from "react-icons/fa";

const deals = [
  {
    title: "Fashion",
    discount: "UP TO 70% OFF",
    description: "Fresh looks at unbeatable prices.",
  },
  {
    title: "Shoes",
    discount: "FLAT 50% OFF",
    description: "Trending footwear for every style.",
  },
  {
    title: "Perfumes",
    discount: "BUY 1 GET 1",
    description: "Find your signature fragrance.",
  },
  {
    title: "Watches",
    discount: "SPECIAL OFFER",
    description: "Premium looks without the premium price.",
  },
];

export default function TodayDeals() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.035] blur-[130px]" />
      </div>

      <div className="relative">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <div className="mb-4 flex items-center gap-3">

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
                <FaBolt className="text-xs" />
              </span>

              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-orange-500">
                Limited Time
              </span>

            </div>

            <h2 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Today's{" "}
              <span className="text-orange-500">
                Deals
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Grab your favorites before these exclusive offers disappear.
            </p>

          </div>

          {/* Desktop button */}
          <Link
            href="/products"
            className="group hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-3.5 text-sm font-bold text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400 sm:flex"
          >
            View All Deals

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
              <FaArrowRight className="text-[10px]" />
            </span>
          </Link>

        </div>

        {/* Deal Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {deals.map((deal, index) => (

            <Link
              href="/products"
              key={deal.title}
              className="group relative"
            >

              <article className="relative h-full min-h-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0b] p-5 shadow-[0_15px_45px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_25px_65px_rgba(0,0,0,0.55)] sm:p-7">

                {/* Orange glow */}
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/0 blur-[70px] transition-all duration-700 group-hover:bg-orange-500/20" />

                {/* Top */}
                <div className="relative flex items-center justify-between">

                  <span className="text-[10px] font-black tracking-[0.2em] text-gray-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-orange-500 transition-all duration-300 group-hover:border-orange-500/40 group-hover:bg-orange-500 group-hover:text-white">
                    <FaTag className="text-xs" />
                  </div>

                </div>

                {/* Main content */}
                <div className="relative mt-10">

                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-600">
                    Exclusive Deal
                  </p>

                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {deal.title}
                  </h3>

                  <p className="mt-4 text-xl font-black tracking-tight text-orange-500">
                    {deal.discount}
                  </p>

                  <p className="mt-3 max-w-[220px] text-xs leading-5 text-gray-500">
                    {deal.description}
                  </p>

                </div>

                {/* Bottom CTA */}
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-white/10 pt-4 sm:inset-x-7 sm:bottom-7">

                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 transition-colors duration-300 group-hover:text-white">
                    Shop Deal
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                    <FaArrowRight className="text-[9px] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>

                </div>

                {/* Orange bottom line */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />

              </article>

            </Link>

          ))}

        </div>

        {/* Mobile */}
        <Link
          href="/products"
          className="group mt-7 flex items-center justify-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/[0.06] py-4 text-sm font-bold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white sm:hidden"
        >
          View All Deals

          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

      </div>
    </section>
  );
}
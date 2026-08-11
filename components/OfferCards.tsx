"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBolt,
  FaShoppingBag,
} from "react-icons/fa";

const offers = [
  {
    title: "Summer Collection",
    subtitle: "Fresh styles for your everyday look",
    discount: "UP TO 70% OFF",
    tag: "HOT DEAL",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=85",
  },
  {
    title: "Trending Shoes",
    subtitle: "Step into the latest arrivals",
    discount: "NEW ARRIVALS",
    tag: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=85",
  },
  {
    title: "Luxury Watches",
    subtitle: "Premium style that stands out",
    discount: "FLAT 40% OFF",
    tag: "PREMIUM",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85",
  },
];

export default function OfferCards() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <FaBolt className="text-xs" />
            </span>

            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
              Special Offers
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                Deals You Don't Want
                <span className="text-orange-500"> To Miss.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                Limited-time offers on the products you love.
                Grab your favorites before they're gone.
              </p>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-orange-500 sm:flex"
            >
              View All Deals
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {offers.map((offer) => (
            <Link
              href="/products"
              key={offer.title}
              className="group relative min-h-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0d0d] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              {/* Image */}
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

              {/* Orange glow */}
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-orange-500/10 blur-[80px] transition-all duration-700 group-hover:bg-orange-500/30" />

              {/* Tag */}
              <div className="absolute left-5 top-5">
                <span className="rounded-full border border-orange-500/30 bg-black/60 px-3 py-1.5 text-[9px] font-black tracking-[0.2em] text-orange-400 backdrop-blur-md">
                  {offer.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">

                <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1.5 text-[9px] font-black tracking-[0.15em] text-white shadow-lg">
                  <FaBolt className="text-[8px]" />
                  {offer.discount}
                </span>

                <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                  {offer.title}
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-300">
                  {offer.subtitle}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black text-black transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  <FaShoppingBag className="text-[10px]" />
                  Shop Now
                  <FaArrowRight className="text-[9px] transition-transform duration-300 group-hover:translate-x-1" />
                </div>

              </div>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile */}
        <Link
          href="/products"
          className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 py-4 text-sm font-bold text-orange-500 transition hover:bg-orange-500 hover:text-white sm:hidden"
        >
          View All Deals
          <FaArrowRight className="text-xs" />
        </Link>

      </div>
    </section>
  );
}
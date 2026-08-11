"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TopCategories from "@/components/TopCategories";
import OfferCards from "@/components/OfferCards";
import TrendingProducts from "@/components/TrendingProducts";
import FeaturedProducts from "@/components/FeaturedProducts";
import TodayDeals from "@/components/TodayDeals";
import FeaturedBrands from "@/components/FeaturedBrands";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">

      <Navbar />

      <main>

        {/* HERO */}
        <section className="relative">

          {/* Ambient Glow */}
          <div className="pointer-events-none absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[140px]" />

          <div className="relative mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-8 pt-3">
            <Hero />
          </div>

        </section>


        {/* TRUST / FEATURES */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 -mt-5 sm:-mt-8">
          <div className="rounded-3xl border border-white/10 bg-[#0d0d0d]/90 p-3 sm:p-5 shadow-2xl backdrop-blur-xl">
            <Features />
          </div>
        </section>


        {/* CATEGORIES */}
        <section className="relative">
          <TopCategories />
        </section>


        {/* OFFERS */}
        <section className="relative">
          <OfferCards />
        </section>


        {/* TRENDING */}
        <section className="relative">

          <div className="absolute right-[-250px] top-40 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[150px] pointer-events-none" />

          <TrendingProducts />

        </section>


        {/* FEATURED PRODUCTS */}
        <section className="relative">

          <FeaturedProducts />

        </section>


        {/* TODAY'S DEALS */}
        <section className="relative">

          <TodayDeals />

        </section>


        {/* BRANDS */}
        <section className="relative">

          <FeaturedBrands />

        </section>


        {/* FINAL CTA */}
        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24">

          <div className="relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-[#17100b] via-[#0d0d0d] to-[#050505] px-6 py-14 text-center shadow-[0_0_80px_rgba(234,88,12,0.08)] sm:px-12">

            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-orange-600/20 blur-[100px]" />

            <div className="relative">

              <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
                Styles Bazar
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                Your Style.
                <span className="text-orange-500"> Your Choice.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Discover trending fashion, accessories, beauty products,
                watches and more — all in one place.
              </p>

              <a
                href="/products"
                className="mt-8 inline-flex items-center justify-center rounded-2xl bg-orange-600 px-8 py-4 font-black text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-orange-500/40"
              >
                Explore Store
                <span className="ml-2 text-lg">→</span>
              </a>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}
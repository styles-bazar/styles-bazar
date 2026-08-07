"use client";

import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OfferCards from "@/components/OfferCards";
import TopCategories from "@/components/TopCategories";
import TrendingProducts from "@/components/TrendingProducts";
import TodayDeals from "@/components/TodayDeals";
import FeaturedBrands from "@/components/FeaturedBrands";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main>

        {/* Hero Banner */}
        <section className="px-4 pt-4">
          <div className="max-w-7xl mx-auto">
            <Hero />
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Features />
          </div>
        </section>

        {/* Categories */}
        <TopCategories />

        {/* Special Offers */}
        <section className="px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <OfferCards />
          </div>
        </section>

        {/* Trending Products */}
        <section className="px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <TrendingProducts />
          </div>
        </section>

        {/* Featured Products */}
        <section className="px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <FeaturedProducts />
          </div>
        </section>

        {/* Today's Deals */}
        <section className="px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <TodayDeals />
          </div>
        </section>

        {/* Brands */}
        <section className="px-4 py-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <FeaturedBrands />
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
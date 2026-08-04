"use client";

import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OfferCards from "@/components/OfferCards";
import TopCategories from "@/components/TopCategories";
import FlashSale from "@/components/FlashSale";
import TrendingProducts from "@/components/TrendingProducts";
import TodayDeals from "@/components/TodayDeals";
import FeaturedBrands from "@/components/FeaturedBrands";

export default function Home() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">

      <Navbar />

      <Hero />

<Features />

<OfferCards />


      <TopCategories />

      <FlashSale />

      <TrendingProducts />

      <FeaturedProducts />

      <TodayDeals />

      <FeaturedBrands />

      <Footer />

    </main>
  );
}
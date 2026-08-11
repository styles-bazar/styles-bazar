"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=85",
    eyebrow: "NEW SEASON",
    title: "Style That",
    highlight: "Speaks For You.",
    subtitle:
      "Discover premium fashion, accessories and everyday essentials at unbeatable prices.",
    button: "Shop Collection",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=85",
    eyebrow: "TRENDING NOW",
    title: "Upgrade Your",
    highlight: "Everyday Style.",
    subtitle:
      "Fresh arrivals, modern looks and carefully selected products made for you.",
    button: "Explore Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1800&q=85",
    eyebrow: "SPECIAL OFFER",
    title: "More Style.",
    highlight: "Less Price.",
    subtitle:
      "Shop selected collections with exciting discounts and delivery across Pakistan.",
    button: "View Offers",
  },
];

export default function Hero() {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop
        className="premium-hero overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div className="relative min-h-[480px] overflow-hidden sm:min-h-[560px]">
              
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Main Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Orange Glow */}
              <div className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[110px]" />

              {/* Content */}
              <div className="relative z-10 flex min-h-[480px] max-w-3xl flex-col justify-center px-7 py-14 sm:min-h-[560px] sm:px-14 lg:px-20">
                
                {/* Eyebrow */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-orange-500" />

                  <span className="text-xs font-black tracking-[0.3em] text-orange-400">
                    {banner.eyebrow}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {banner.title}
                  <br />
                  <span className="text-orange-500">
                    {banner.highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 max-w-xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
                  {banner.subtitle}
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  
                  <Link
                    href="/products"
                    className="rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-[0_10px_30px_rgba(249,115,22,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-[0_15px_40px_rgba(249,115,22,0.4)]"
                  >
                    {banner.button}
                  </Link>

                  <Link
                    href="/products"
                    className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/10"
                  >
                    Discover More
                  </Link>

                </div>

                {/* Trust */}
                <div className="mt-8 flex flex-wrap items-center gap-5 text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:gap-7">
                  
                  <span>Free Delivery</span>

                  <span className="h-3 w-px bg-white/20" />

                  <span>Secure Checkout</span>

                  <span className="h-3 w-px bg-white/20" />

                  <span>Easy Returns</span>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Styling */}
      <style jsx global>{`
        .premium-hero .swiper-button-next,
        .premium-hero .swiper-button-prev {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .premium-hero .swiper-button-next:hover,
        .premium-hero .swiper-button-prev:hover {
          background: #f97316;
          border-color: #f97316;
          transform: scale(1.05);
        }

        .premium-hero .swiper-button-next::after,
        .premium-hero .swiper-button-prev::after {
          font-size: 14px;
          font-weight: 900;
          color: white;
        }

        .premium-hero .swiper-pagination {
          bottom: 18px;
        }

        .premium-hero .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .premium-hero .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 10px;
          background: #f97316;
        }

        @media (max-width: 640px) {
          .premium-hero .swiper-button-next,
          .premium-hero .swiper-button-prev {
            width: 36px;
            height: 36px;
            border-radius: 11px;
          }

          .premium-hero .swiper-button-next::after,
          .premium-hero .swiper-button-prev::after {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
    title: "Summer Collection",
    subtitle: "Up To 70% OFF",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
    title: "New Fashion",
    subtitle: "Premium Quality",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600",
    title: "Mega Sale",
    subtitle: "Free Delivery Pakistan",
  },
];

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto mt-6 px-4">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-3xl overflow-hidden shadow-xl"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>

            <div className="relative">

              <img
                src={banner.image}
                className="w-full h-[500px] object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center pl-20">

                <h1 className="text-6xl font-bold text-white">
                  {banner.title}
                </h1>

                <p className="text-2xl text-white mt-5">
                  {banner.subtitle}
                </p>

                <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white w-52 h-14 rounded-xl text-xl font-bold">
                  Shop Now
                </button>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
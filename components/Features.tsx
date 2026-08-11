"use client";

import {
  FaTruck,
  FaLock,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: FaTruck,
    title: "Free Delivery",
    text: "Free delivery all over Pakistan",
  },
  {
    icon: FaLock,
    title: "Secure Payment",
    text: "100% safe & secure checkout",
  },
  {
    icon: FaUndo,
    title: "Easy Return",
    text: "7 days easy return policy",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    text: "We're always here to help",
  },
];

export default function Features() {
  return (
    <section className="py-4 sm:py-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#111111] hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-6"
            >

              {/* Glow */}
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl transition-all duration-500 group-hover:bg-orange-500/25" />

              <div className="relative flex flex-col items-center text-center">

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500 transition-all duration-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] sm:h-14 sm:w-14">
                  <Icon className="text-lg sm:text-xl" />
                </div>

                {/* Title */}
                <h3 className="relative mt-4 text-sm font-black text-white sm:text-lg">
                  {item.title}
                </h3>

                {/* Text */}
                <p className="relative mt-2 text-[10px] leading-4 text-gray-500 sm:text-xs sm:leading-5">
                  {item.text}
                </p>

              </div>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-orange-500 transition-all duration-500 group-hover:w-1/2" />

            </div>
          );
        })}

      </div>
    </section>
  );
}
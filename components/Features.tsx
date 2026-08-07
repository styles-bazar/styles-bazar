"use client";

import {
  FaTruck,
  FaLock,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,
    title: "Free Delivery",
    text: "Free delivery all over Pakistan",
  },
  {
    icon: <FaLock />,
    title: "Secure Payment",
    text: "100% Safe & Secure Checkout",
  },
  {
    icon: <FaUndo />,
    title: "Easy Return",
    text: "7 Days Easy Return Policy",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    text: "We're always here to help",
  },
];

export default function Features() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-3xl group-hover:bg-orange-600 group-hover:text-white transition">
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
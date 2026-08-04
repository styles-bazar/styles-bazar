"use client";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

export default function FlashSale() {
  const products = [
    {
      id: 1,
      name: "Premium T-Shirt",
      price: 1999,
      oldPrice: 2999,
      image: "https://picsum.photos/400?random=1",
    },
    {
      id: 2,
      name: "Luxury Shoes",
      price: 3499,
      oldPrice: 4999,
      image: "https://picsum.photos/400?random=2",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 5999,
      oldPrice: 7999,
      image: "https://picsum.photos/400?random=3",
    },
    {
      id: 4,
      name: "Perfume",
      price: 2499,
      oldPrice: 3499,
      image: "https://picsum.photos/400?random=4",
    },
    {
      id: 5,
      name: "Hand Bag",
      price: 2799,
      oldPrice: 3999,
      image: "https://picsum.photos/400?random=5",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-gray-800">
          🔥 Flash Sale
        </h2>

        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
          View All
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-2xl transition duration-300 overflow-hidden group"
          >

            <div className="relative">

              <img
                src={product.image}
                className="w-full h-60 object-cover group-hover:scale-105 duration-300"
              />

              <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                -30%
              </span>

              <button className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 shadow flex items-center justify-center hover:bg-red-600 hover:text-white duration-300">
                <FaHeart />
              </button>

            </div>

            <div className="p-4">

              <h3 className="font-bold text-lg line-clamp-2">
                {product.name}
              </h3>

              <div className="flex text-yellow-400 mt-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-orange-600 text-2xl font-bold mt-3">
                Rs. {product.price}
              </p>

              <p className="text-gray-400 line-through">
                Rs. {product.oldPrice}
              </p>

              <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">

                <FaShoppingCart />

                Add To Cart

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}
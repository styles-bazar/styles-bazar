"use client";

const brands = [
  "Nike",
  "Adidas",
  "Apple",
  "Samsung",
  "Rolex",
  "Gucci",
  "Puma",
  "Zara",
];

export default function FeaturedBrands() {
  return (
    <section className="max-w-7xl mx-auto mt-12 px-4">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          ⭐ Featured Brands
        </h2>

        <button className="text-orange-600 font-bold">
          View All →
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">

        {brands.map((brand) => (

          <div
            key={brand}
            className="bg-white h-28 rounded-2xl shadow hover:shadow-xl flex items-center justify-center text-xl font-bold hover:scale-105 duration-300 cursor-pointer"
          >
            {brand}
          </div>

        ))}

      </div>

    </section>
  );
}
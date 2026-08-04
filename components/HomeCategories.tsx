"use client";

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200",
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
  },
  {
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200",
  },
  {
    name: "Perfumes",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200",
  },
  {
    name: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200",
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200",
  },
];

export default function HomeCategories() {
  return (
    <section className="max-w-7xl mx-auto mt-10 px-4">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Shop by Category
        </h2>

        <button className="text-orange-600 font-semibold">
          View All →
        </button>

      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">

        {categories.map((item) => (

          <div
            key={item.name}
            className="text-center cursor-pointer group"
          >

            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg group-hover:scale-110 duration-300">

              <img
                src={item.image}
                className="w-full h-full object-cover"
                alt={item.name}
              />

            </div>

            <p className="mt-3 font-semibold group-hover:text-orange-600">
              {item.name}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
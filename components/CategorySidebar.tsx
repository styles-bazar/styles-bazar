"use client";

export default function Categories() {
  const categories = [
    {
      name: "Fashion",
      image: "https://picsum.photos/200?random=11",
    },
    {
      name: "Shoes",
      image: "https://picsum.photos/200?random=12",
    },
    {
      name: "Watches",
      image: "https://picsum.photos/200?random=13",
    },
    {
      name: "Perfumes",
      image: "https://picsum.photos/200?random=14",
    },
    {
      name: "Beauty",
      image: "https://picsum.photos/200?random=15",
    },
    {
      name: "Electronics",
      image: "https://picsum.photos/200?random=16",
    },
    {
      name: "Bags",
      image: "https://picsum.photos/200?random=17",
    },
    {
      name: "Accessories",
      image: "https://picsum.photos/200?random=18",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-14">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Shop By Category
        </h2>

        <button className="text-orange-600 font-bold hover:underline">
          View All
        </button>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">

        {categories.map((category) => (

          <div
            key={category.name}
            className="text-center cursor-pointer group"
          >

            <div className="w-28 h-28 mx-auto rounded-full bg-white shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:scale-105 transition">

              <img
                src={category.image}
                className="w-full h-full object-cover"
              />

            </div>

            <h3 className="mt-4 font-semibold text-gray-700">
              {category.name}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}
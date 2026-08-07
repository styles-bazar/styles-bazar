"use client";

export default function OfferCards() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Card 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900"
              alt="Summer Collection"
              className="w-full h-56 object-cover group-hover:scale-110 duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
              <h2 className="text-3xl font-bold text-white">
                Summer Collection
              </h2>

              <p className="text-white mt-2">
                Up to 70% OFF
              </p>

              <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg w-fit font-semibold">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
              alt="Trending Shoes"
              className="w-full h-56 object-cover group-hover:scale-110 duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
              <h2 className="text-3xl font-bold text-white">
                Trending Shoes
              </h2>

              <p className="text-white mt-2">
                New Arrival
              </p>

              <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg w-fit font-semibold">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
              alt="Luxury Watches"
              className="w-full h-56 object-cover group-hover:scale-110 duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
              <h2 className="text-3xl font-bold text-white">
                Luxury Watches
              </h2>

              <p className="text-white mt-2">
                Flat 40% OFF
              </p>

              <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg w-fit font-semibold">
                Shop Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
"use client";

export default function OfferCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Card 1 */}

        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">

          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52?w=900"
            className="w-full h-56 object-cover group-hover:scale-110 duration-500"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">

            <h2 className="text-3xl font-bold text-white">
              Summer Collection
            </h2>

            <p className="text-white mt-2">
              Up to 70% OFF
            </p>

          </div>

        </div>

        {/* Card 2 */}

        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
            className="w-full h-56 object-cover group-hover:scale-110 duration-500"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">

            <h2 className="text-3xl font-bold text-white">
              Trending Shoes
            </h2>

            <p className="text-white mt-2">
              New Arrival
            </p>

          </div>

        </div>

        {/* Card 3 */}

        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
            className="w-full h-56 object-cover group-hover:scale-110 duration-500"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">

            <h2 className="text-3xl font-bold text-white">
              Luxury Watches
            </h2>

            <p className="text-white mt-2">
              Flat 40% OFF
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
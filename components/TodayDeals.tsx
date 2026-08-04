"use client";

const deals = [
  { title: "Fashion", discount: "Up to 70% OFF", color: "bg-red-500" },
  { title: "Shoes", discount: "Flat 50% OFF", color: "bg-blue-500" },
  { title: "Perfumes", discount: "Buy 1 Get 1", color: "bg-green-500" },
  { title: "Watches", discount: "Special Offer", color: "bg-purple-500" },
];

export default function TodayDeals() {
  return (
    <section className="max-w-7xl mx-auto mt-12 px-4">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          ⚡ Today's Deals
        </h2>

        <button className="text-orange-600 font-bold">
          View All →
        </button>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {deals.map((deal) => (

          <div
            key={deal.title}
            className={`${deal.color} rounded-2xl text-white p-8 shadow-lg hover:scale-105 duration-300 cursor-pointer`}
          >

            <h3 className="text-2xl font-bold">
              {deal.title}
            </h3>

            <p className="mt-3 text-lg">
              {deal.discount}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
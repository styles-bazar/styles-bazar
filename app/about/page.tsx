export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-center mb-8">
          About Styles Bazar
        </h1>

        <p className="text-lg text-gray-700 leading-9 mb-8">
          Welcome to <strong>Styles Bazar</strong>, your trusted online
          shopping destination in Pakistan. We provide high-quality
          products including Beauty, Fashion, Watches, Shoes,
          Electronics, Kitchen Items and much more at affordable prices.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-orange-50 rounded-2xl p-6 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-xl font-bold mb-2">
              Our Mission
            </h2>
            <p>
              Deliver quality products with the best shopping experience.
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 text-center">
            <div className="text-5xl mb-4">🚚</div>
            <h2 className="text-xl font-bold mb-2">
              Fast Delivery
            </h2>
            <p>
              Fast and secure delivery across Pakistan.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <div className="text-5xl mb-4">💖</div>
            <h2 className="text-xl font-bold mb-2">
              Customer First
            </h2>
            <p>
              Your satisfaction is always our highest priority.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}
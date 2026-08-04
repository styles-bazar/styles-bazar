"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          📞 Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Get In Touch
            </h2>

            <p className="mb-4">
              📍 Pakistan
            </p>

            <p className="mb-4">
              📧 support@stylesbazar.com
            </p>

            <p className="mb-4">
              📱 +92 335 6891247
            </p>

            <a
              href="https://wa.me/923356891247"
              target="_blank"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl mt-4"
            >
              WhatsApp Us
            </a>

          </div>

          <div>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-xl p-4 mb-4"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-xl p-4 mb-4"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full border rounded-xl p-4 mb-4"
            />

            <button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold"
            >
              Send Message
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}
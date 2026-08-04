import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-orange-600">
          404
        </h1>

        <h2 className="text-4xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold"
        >
          Back To Home
        </Link>

      </div>

    </main>
  );
}
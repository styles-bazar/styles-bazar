"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            🛠️ Admin Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            href="/admin/products"
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              📦 Products
            </h2>

            <p className="text-gray-600">
              Add, Edit & Delete Products
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              🛒 Orders
            </h2>

            <p className="text-gray-600">
              View Customer Orders
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              📂 Categories
            </h2>

            <p className="text-gray-600">
              Manage Categories
            </p>
          </Link>

        </div>

      </div>

    </main>
  );
}
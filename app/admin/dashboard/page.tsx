"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [pending, setPending] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [latestProducts, setLatestProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Products
        const productSnap = await getDocs(collection(db, "products"));

        setProducts(productSnap.size);

        const latestProductsData = productSnap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .slice(0, 5);

        setLatestProducts(latestProductsData);

        // Orders
        const orderSnap = await getDocs(collection(db, "orders"));

        setOrders(orderSnap.size);

        let pendingCount = 0;
        let deliveredCount = 0;
        let totalRevenue = 0;

        orderSnap.forEach((doc) => {
          const order: any = doc.data();

          totalRevenue += Number(order.total || 0);

          if (order.status === "Pending") {
            pendingCount++;
          }

          if (order.status === "Delivered") {
            deliveredCount++;
          }
        });

        setPending(pendingCount);
        setDelivered(deliveredCount);
        setRevenue(totalRevenue);

        const latestOrders = orderSnap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .slice(0, 5);

        setRecentOrders(latestOrders);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      }
    }

    loadDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            📊 Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome to Styles Bazar Admin Panel
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 font-semibold">
              📦 Products
            </p>

            <p className="text-4xl font-bold text-orange-600 mt-3">
              {products}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 font-semibold">
              🛒 Orders
            </p>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {orders}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 font-semibold">
              ⏳ Pending
            </p>

            <p className="text-4xl font-bold text-yellow-500 mt-3">
              {pending}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 font-semibold">
              🚚 Delivered
            </p>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {delivered}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 font-semibold">
              💰 Revenue
            </p>

            <p className="text-2xl font-bold text-purple-600 mt-3">
              Rs. {revenue.toLocaleString()}
            </p>
          </div>

        </div>

        {/* Latest Products */}
        <section className="bg-white rounded-2xl shadow p-6 mt-8">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">
              🛍️ Latest Products
            </h2>

            <a
              href="/admin/products"
              className="text-orange-600 font-semibold"
            >
              View All →
            </a>
          </div>

          {latestProducts.length === 0 ? (
            <p className="text-gray-500">
              No Products Found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

              {latestProducts.map((product: any) => (

                <div
                  key={product.id}
                  className="border rounded-xl overflow-hidden hover:shadow-lg transition"
                >

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name || "Product"}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                      🛍️
                    </div>
                  )}

                  <div className="p-4">

                    <h3 className="font-bold truncate">
                      {product.name}
                    </h3>

                    <p className="text-orange-600 font-bold mt-2">
                      Rs. {Number(product.price || 0).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

        {/* Recent Orders */}
        <section className="bg-white rounded-2xl shadow p-6 mt-8">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">
              📦 Recent Orders
            </h2>

            <a
              href="/admin/orders"
              className="text-orange-600 font-semibold"
            >
              View All →
            </a>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-gray-500">
              No Orders Yet
            </p>
          ) : (
            <div className="space-y-4">

              {recentOrders.map((order: any) => (

                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-4"
                >

                  <div>
                    <p className="font-bold">
                      {order.customerName || "Customer"}
                    </p>

                    <p className="text-gray-500">
                      {Array.isArray(order.products)
                        ? `${order.products.length} Product(s)`
                        : "Order"}
                    </p>

                    <p className="text-sm text-gray-400">
                      {order.customerCity || ""}
                    </p>
                  </div>

                  <div className="sm:text-right">

                    <p className="font-bold text-orange-600">
                      Rs. {Number(order.total || 0).toLocaleString()}
                    </p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}
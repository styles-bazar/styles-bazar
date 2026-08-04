"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
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
      // Products
      const productSnap = await getDocs(
        collection(db, "products")
      );

      setProducts(productSnap.size);

      // Orders
      const orderSnap = await getDocs(
        collection(db, "orders")
      );

      setOrders(orderSnap.size);
      const latestProductsData = productSnap.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .slice(0, 5);

setLatestProducts(latestProductsData);

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
      const latest = orderSnap.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .slice(0, 5);

setRecentOrders(latest);
    }
    

    loadDashboard();
  }, []);
    return (
    <main className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        
        📊 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500 font-semibold">
            📦 Products
          </h2>

          <p className="text-4xl font-bold text-orange-600 mt-4">
            {products}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500 font-semibold">
            🛒 Orders
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            {orders}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500 font-semibold">
            ⏳ Pending
          </h2>

          <p className="text-4xl font-bold text-yellow-500 mt-4">
            {pending}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500 font-semibold">
            🚚 Delivered
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            {delivered}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500 font-semibold">
            💰 Revenue
          </h2>

          <p className="text-3xl font-bold text-purple-600 mt-4">
            Rs. {revenue}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

  <h2 className="text-2xl font-bold mb-6">
    🛒 Recent Orders
  </h2>
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

  <h2 className="text-2xl font-bold mb-6">
    🆕 Latest Products
  </h2>

  {latestProducts.length === 0 ? (

    <p className="text-gray-500">
      No Products Found
    </p>

  ) : (

    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">

      {latestProducts.map((product: any) => (

        <div
          key={product.id}
          className="border rounded-xl overflow-hidden"
        >

          <img
            src={product.image}
            className="w-full h-40 object-cover"
          />

          <div className="p-4">

            <h3 className="font-bold">
              {product.name}
            </h3>

            <p className="text-orange-600 font-bold mt-2">
              Rs. {product.price}
            </p>

          </div>

        </div>

      ))}

    </div>

  )}

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
          className="flex justify-between items-center border-b pb-3"
        >

          <div>
            <p className="font-bold">
              {order.customerName}
            </p>

            <p className="text-gray-500">
              {order.productName}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold text-orange-600">
              Rs. {order.total}
            </p>

            <p className="text-sm text-gray-500">
              {order.status}
            </p>
          </div>

        </div>

      ))}

    </div>

  )}

</div>

      </div>

    </main>
  );
}
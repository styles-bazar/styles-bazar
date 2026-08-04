"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateOrderStatus } from "@/lib/productService";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
async function changeStatus(id: string, status: string) {
  await updateOrderStatus(id, status);

  setOrders(
    orders.map((order) =>
      order.id === id
        ? { ...order, status }
        : order
    )
  );
}
  useEffect(() => {
    async function loadOrders() {
      const snapshot = await getDocs(collection(db, "orders"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
      setLoading(false);
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading Orders...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

  <div>
    <h1 className="text-4xl font-bold">
      📦 Customer Orders
    </h1>

    <p className="text-gray-500 mt-2">
      Total Orders: {orders.length}
    </p>
  </div>

  <div className="bg-orange-600 text-white px-6 py-4 rounded-xl shadow">

    <p className="text-sm">
      Revenue
    </p>

    <h2 className="text-2xl font-bold">
      Rs. {orders.reduce((sum, order) => sum + Number(order.total), 0)}
    </h2>

  </div>

</div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold">
            No Orders Yet
          </h2>
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order: any) => (

            <div
              key={order.id}
              className="bg-white rounded-2xl shadow p-6"
            >

              <h2 className="text-2xl font-bold mb-4">
                {order.productName}
              </h2>

              <p><strong>👤 Customer:</strong> {order.customerName}</p>

              <p><strong>📱 Phone:</strong> {order.customerPhone}</p>

              <p><strong>🏙 City:</strong> {order.customerCity}</p>

              <p><strong>🏠 Address:</strong> {order.customerAddress}</p>

              <p><strong>🔢 Quantity:</strong> {order.quantity}</p>

              <p><strong>💰 Total:</strong> Rs. {order.total}</p>

              <div className="mt-4">

  <label className="font-bold mr-3">
    📌 Status:
  </label>

  <select
  value={order.status}
  onChange={(e) => changeStatus(order.id, e.target.value)}
  className={`rounded-lg px-3 py-2 text-white font-bold

${
  order.status === "Pending"
    ? "bg-yellow-500"

    : order.status === "Confirmed"
    ? "bg-blue-600"

    : order.status === "Delivered"
    ? "bg-green-600"

    : "bg-red-600"
}`}
>
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>

</div>

            </div>

          ))}

        </div>
      )}

    </main>
  );
}
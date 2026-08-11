"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaMoneyBillWave,
} from "react-icons/fa";

type Order = {
  id: string;
  productName?: string;
  customerName?: string;
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  total?: number | string;
  status?: string;
  [key: string]: unknown;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadOrders() {
    try {
      const snapshot = await getDocs(
        collection(db, "orders")
      );

      const data: Order[] = [];

      snapshot.forEach((item) => {
        const firestoreData = item.data();

        data.push({
          id: item.id,
          ...firestoreData,
        } as Order);
      });

      setOrders(data);
    } catch (error) {
      console.error("Orders load error:", error);
      alert("Orders load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function changeStatus(
    id: string,
    status: string
  ) {
    try {
      await updateDoc(
        doc(db, "orders", id),
        {
          status,
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.error("Status update error:", error);
      alert("Status update nahi hua.");
    }
  }

  const revenue = orders.reduce(
    (total, order) => {
      const orderTotal = Number(
        order.total ?? 0
      );

      return total + orderTotal;
    },
    0
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <div className="flex items-center gap-4">

            <Link
              href="/admin"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <FaArrowLeft />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Styles Bazar
              </p>

              <h1 className="mt-1 text-2xl font-black">
                Orders
              </h1>
            </div>

          </div>

          {/* REVENUE */}
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-5 py-3">

            <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">
              Revenue
            </p>

            <p className="mt-1 text-xl font-black text-orange-500">
              Rs. {revenue}
            </p>

          </div>

        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">

        {/* SUMMARY */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6">

            <p className="text-xs font-black uppercase tracking-widest text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-4xl font-black">
              {orders.length}
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6">

            <p className="text-xs font-black uppercase tracking-widest text-gray-500">
              Total Revenue
            </p>

            <p className="mt-2 text-4xl font-black text-orange-500">
              Rs. {revenue}
            </p>

          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="space-y-5">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl border border-white/10 bg-[#101010]"
              />
            ))}

          </div>
        )}

        {/* EMPTY */}
        {!loading && orders.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] py-24 text-center">

            <FaShoppingCart className="mx-auto text-5xl text-gray-700" />

            <h2 className="mt-5 text-2xl font-black">
              No Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Abhi koi customer order nahi hai.
            </p>

          </div>
        )}

        {/* ORDERS */}
        {!loading && orders.length > 0 && (
          <div className="space-y-5">

            {orders.map((order, index) => (

              <div
                key={order.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] transition hover:border-orange-500/30"
              >

                {/* ORDER TOP */}
                <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                        <FaShoppingCart />
                      </div>

                      <div>

                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          Order #{index + 1}
                        </p>

                        <h2 className="mt-1 text-lg font-black">
                          {order.productName ||
                            "Customer Order"}
                        </h2>

                      </div>

                    </div>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-xs text-gray-500">
                      Total Amount
                    </p>

                    <p className="text-2xl font-black text-orange-500">
                      Rs. {order.total ?? 0}
                    </p>

                  </div>

                </div>

                {/* CUSTOMER */}
                <div className="grid gap-4 p-6 md:grid-cols-2">

                  <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">

                    <p className="mb-4 text-xs font-black uppercase tracking-widest text-orange-500">
                      Customer Details
                    </p>

                    <div className="space-y-4">

                      <div className="flex items-center gap-3">
                        <FaUser className="text-gray-600" />

                        <span className="text-sm text-gray-300">
                          {order.customerName ||
                            order.name ||
                            "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaPhone className="text-gray-600" />

                        <span className="text-sm text-gray-300">
                          {order.phone || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="mt-1 text-gray-600" />

                        <span className="text-sm leading-6 text-gray-300">
                          {order.city || "N/A"}
                          <br />
                          {order.address || "N/A"}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* STATUS */}
                  <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">

                    <p className="mb-4 text-xs font-black uppercase tracking-widest text-orange-500">
                      Order Status
                    </p>

                    <select
                      value={
                        order.status || "Pending"
                      }
                      onChange={(e) =>
                        changeStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-4 text-sm font-bold text-white outline-none focus:border-orange-500"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                    <div className="mt-5 flex items-center gap-3">

                      <FaMoneyBillWave className="text-green-500" />

                      <span className="text-sm text-gray-400">
                        Cash on Delivery
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}
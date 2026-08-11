"use client";

import Link from "next/link";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaFolderOpen,
  FaArrowRight,
  FaSignOutAlt,
  FaChartLine,
  FaStore,
} from "react-icons/fa";

export default function AdminPage() {
  function handleLogout() {
    document.cookie = "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  }

  const cards = [
    {
      title: "Products",
      description: "Add, edit & delete products",
      icon: FaBoxOpen,
      href: "/admin/products",
      number: "01",
    },
    {
      title: "Orders",
      description: "View and manage customer orders",
      icon: FaShoppingCart,
      href: "/admin/orders",
      number: "02",
    },
    {
      title: "Categories",
      description: "Create and manage categories",
      icon: FaFolderOpen,
      href: "/admin/categories",
      number: "03",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.03] blur-[120px]" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="relative z-10 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

          {/* LOGO */}
          <Link
            href="/admin"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-500 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
              <FaStore className="text-lg" />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Styles <span className="text-orange-500">Bazar</span>
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="group flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-black text-red-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            <FaSignOutAlt className="transition-transform duration-300 group-hover:translate-x-1" />
            Logout
          </button>

        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">

        {/* PAGE INTRO */}
        <div className="mb-12">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-orange-500" />

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
              Control Center
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Admin
                <span className="text-orange-500"> Dashboard</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
                Manage your Styles Bazar store, products, orders and
                categories from one powerful dashboard.
              </p>
            </div>

            {/* STATUS */}
            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">
                  System Status
                </p>
                <p className="mt-0.5 text-xs font-bold text-green-500">
                  Online
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= QUICK STATS ================= */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <FaChartLine />
            </div>

            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">
              Store
            </p>

            <p className="mt-1 text-xl font-black">
              Active
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FaShoppingCart />
            </div>

            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">
              Orders
            </p>

            <p className="mt-1 text-xl font-black">
              Manage
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <FaBoxOpen />
            </div>

            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">
              Products
            </p>

            <p className="mt-1 text-xl font-black">
              Manage
            </p>
          </div>

        </div>

        {/* ================= MANAGEMENT CARDS ================= */}
        <div className="mb-5">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            Management
          </p>

          <h3 className="mt-2 text-2xl font-black">
            Store Controls
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-[#101010] hover:shadow-[0_25px_70px_rgba(249,115,22,0.08)]"
              >

                {/* NUMBER */}
                <span className="absolute right-5 top-4 text-5xl font-black text-white/[0.025]">
                  {card.number}
                </span>

                {/* ORANGE GLOW */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/0 blur-[70px] transition-all duration-500 group-hover:bg-orange-500/10" />

                {/* ICON */}
                <div className="relative mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500 transition-all duration-500 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_10px_35px_rgba(249,115,22,0.25)]">
                  <Icon className="text-xl" />
                </div>

                {/* TEXT */}
                <div className="relative">

                  <h4 className="text-2xl font-black tracking-tight transition-colors duration-300 group-hover:text-orange-500">
                    {card.title}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {card.description}
                  </p>

                </div>

                {/* ARROW */}
                <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 transition-colors group-hover:text-orange-500">
                    Open Section
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-500 transition-all duration-300 group-hover:border-orange-500/40 group-hover:bg-orange-500 group-hover:text-white">
                    <FaArrowRight className="text-[10px]" />
                  </div>

                </div>

              </Link>
            );
          })}

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-12 rounded-3xl border border-orange-500/10 bg-orange-500/[0.03] p-6 text-center sm:p-8">

          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
            Styles Bazar
          </p>

          <h3 className="mt-3 text-xl font-black">
            Everything under control.
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-gray-600">
            Keep your products, orders and categories organized from
            your admin dashboard.
          </p>

        </div>

      </section>

    </main>
  );
}
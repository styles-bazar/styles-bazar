"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Dashboard",
      icon: "📊",
      link: "/admin/dashboard",
    },
    {
      title: "Products",
      icon: "📦",
      link: "/admin/products",
    },
    {
      title: "Add Product",
      icon: "➕",
      link: "/admin/add-product",
    },
    {
      title: "Orders",
      icon: "🛒",
      link: "/admin/orders",
    },
    {
      title: "Store",
      icon: "🏠",
      link: "/",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10 text-orange-500">
        Styles Bazar
      </h1>

      <nav className="space-y-3">

        {menus.map((item) => (

          <Link
            key={item.link}
            href={item.link}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition ${
              pathname === item.link
                ? "bg-orange-600"
                : "hover:bg-gray-800"
            }`}
          >
            <span className="text-2xl">
              {item.icon}
            </span>

            <span className="font-semibold">
              {item.title}
            </span>

          </Link>

        ))}

      </nav>

    </aside>
  );
}
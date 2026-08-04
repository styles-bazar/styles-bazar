"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getProducts,
  deleteProduct,
} from "@/lib/productService";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    const ok = confirm("Delete this product?");

    if (!ok) return;

    await deleteProduct(id);

    loadProducts();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          📦 Manage Products
        </h1>

        <Link
          href="/admin/add-product"
          className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          + Add Product
        </Link>

      </div>
            <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Product</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="p-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                </td>

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4 text-orange-600 font-bold">
                  Rs. {product.price}
                </td>

                <td className="p-4">

                  <div className="flex gap-3">

                    <Link
  href={`/admin/edit-product/${product.id}`}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  Edit
</Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {products.length === 0 && (
        <div className="text-center py-16">

          <h2 className="text-3xl font-bold text-gray-400">
            No Products Found
          </h2>

          <p className="mt-3 text-gray-500">
            Click "Add Product" to create your first product.
          </p>

        </div>
      )}

    </main>
  );
}
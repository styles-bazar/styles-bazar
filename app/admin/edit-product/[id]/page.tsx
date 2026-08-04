"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateProduct } from "@/lib/productService";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const product = snap.data();

        setName(product.name || "");
        setPrice(String(product.price || ""));
        setOldPrice(String(product.oldPrice || ""));
        setDiscount(String(product.discount || ""));
        setDescription(product.description || "");
        setCategory(product.category || "");
        setImage(product.image || "");
      }

      setLoading(false);
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  async function handleUpdate() {
    await updateProduct(id, {
      name,
      price: Number(price),
      oldPrice: Number(oldPrice),
      discount: Number(discount),
      description,
      category,
      image,
    });

    alert("✅ Product Updated Successfully");
    router.push("/admin/products");
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          ✏️ Edit Product
        </h1>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Old Price"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          rows={5}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-6"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg mb-6"
          />
        )}

        <button
          onClick={handleUpdate}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold"
        >
          💾 Update Product
        </button>

      </div>

    </main>
  );
}
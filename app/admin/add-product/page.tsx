"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addProduct } from "@/lib/productService";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  async function uploadImages(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const files = e.target.files;

  if (!files) return;

  if (files.length > 4) {
    alert("Maximum 4 images allowed.");
    return;
  }

  setUploading(true);

  const uploadedImages: string[] = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("file", files[i]);
      formData.append("upload_preset", "styles_bazar");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/gtvdutcc/image/upload",
        formData
      );

      uploadedImages.push(response.data.secure_url);
    }

    setImages(uploadedImages);

  } catch (error) {
    console.log(error);
    alert("Image upload failed.");
  }

  setUploading(false);
}
async function saveProduct() {
  if (!name || !price || images.length === 0) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    await addProduct({
      name,
      category,
      price: Number(price),
      oldPrice: Number(oldPrice),
      discount: Number(discount),
      description,
      image: images[0],
      images,
    });

    alert("✅ Product Added Successfully");

    setName("");
    setCategory("");
    setPrice("");
    setOldPrice("");
    setDiscount("");
    setDescription("");
    setImages([]);

    router.push("/admin/products");

  } catch (error) {
    console.error(error);
    alert("Failed to save product.");
  }
}
return (
  <main className="min-h-screen bg-gray-100 py-10 px-4">

    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
  ➕ Add New Product
</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4"
      />

      <input
        type="number"
        placeholder="Old Price"
        value={oldPrice}
        onChange={(e) => setOldPrice(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4"
      />

      <input
        type="number"
        placeholder="Discount (%)"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4"
      />
<div className="mb-4">
  <label className="block font-bold mb-2">
    Category
  </label>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border rounded-xl p-4"
  >
    <option value="">Select Category</option>

    <option value="Beauty">Beauty</option>

    <option value="Perfumes">Perfumes</option>

    <option value="Watches">Watches</option>

    <option value="Shoes">Shoes</option>

    <option value="Clothing">Clothing</option>

    <option value="Electronics">Electronics</option>

    <option value="Kitchen">Kitchen</option>

    <option value="Home">Home</option>

  </select>
</div>
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="w-full border rounded-xl p-4 mb-6"
      />

      <div className="mb-6">

        <label className="block font-bold mb-3">
          Product Images (Max 4)
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={uploadImages}
          className="w-full border rounded-xl p-3"
        />

      </div>

      {uploading && (
        <p className="text-blue-600 font-bold mb-4">
          Uploading Images...
        </p>
      )}

      {images.length > 0 && (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          {images.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              className="w-full h-28 object-cover rounded-xl border"
            />

          ))}

        </div>

      )}

      <button
        onClick={saveProduct}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold text-lg"
      >
        💾 Save Product
      </button>

    </div>

  </main>
);
}
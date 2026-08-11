"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaCloudUploadAlt,
  FaTrash,
  FaPlus,
  FaImage,
  FaTag,
  FaSave,
  FaCheck,
} from "react-icons/fa";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

type PreviewItem = {
  file: File;
  url: string;
};

type UploadedMedia = {
  url: string;
  type: "image";
  name: string;
};

export default function AddProductPage() {
  const router = useRouter();

  // =========================
  // PRODUCT STATES
  // =========================

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Beauty");

  const [oldPrice, setOldPrice] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const [description, setDescription] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "Beauty",
    "Clothes",
    "Shoes",
    "Watches",
    "Perfumes",
    "Kids",
    "Other",
  ];

  // =========================
  // DISCOUNT
  // =========================

  function calculateDiscount(
    oldValue: string = oldPrice,
    saleValue: string = price
  ) {
    const oldAmount = Number(oldValue);
    const saleAmount = Number(saleValue);

    if (
      oldAmount > 0 &&
      saleAmount > 0 &&
      oldAmount > saleAmount
    ) {
      return Math.round(
        ((oldAmount - saleAmount) / oldAmount) * 100
      );
    }

    return 0;
  }

  function handleOldPriceChange(value: string) {
    setOldPrice(value);

    if (
      value &&
      price &&
      Number(value) > Number(price)
    ) {
      setDiscount(
        String(calculateDiscount(value, price))
      );
    }
  }

  function handleSalePriceChange(value: string) {
    setPrice(value);

    if (
      oldPrice &&
      value &&
      Number(oldPrice) > Number(value)
    ) {
      setDiscount(
        String(calculateDiscount(oldPrice, value))
      );
    }
  }

  // =========================
  // SELECT PHOTOS
  // MAXIMUM 5
  // =========================

  function handleFiles(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(
      e.target.files || []
    );

    if (!selectedFiles.length) return;

    // Sirf images
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (!imageFiles.length) {
      alert("Sirf photos select karein.");
      e.target.value = "";
      return;
    }

    // Total 5 photos se zyada nahi
    const remainingSlots = 5 - files.length;

    if (remainingSlots <= 0) {
      alert("Maximum 5 photos allowed hain.");
      e.target.value = "";
      return;
    }

    const filesToAdd = imageFiles.slice(
      0,
      remainingSlots
    );

    if (imageFiles.length > remainingSlots) {
      alert(
        `Maximum 5 photos allowed hain. Sirf ${remainingSlots} aur photo add ho sakti hain.`
      );
    }

    const newPreviews: PreviewItem[] =
      filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

    setFiles((prev) => [
      ...prev,
      ...filesToAdd,
    ]);

    setPreviews((prev) => [
      ...prev,
      ...newPreviews,
    ]);

    e.target.value = "";
  }

  // =========================
  // REMOVE PHOTO
  // =========================

  function removeFile(index: number) {
    setPreviews((prev) => {
      const item = prev[index];

      if (item?.url) {
        URL.revokeObjectURL(item.url);
      }

      return prev.filter((_, i) => i !== index);
    });

    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  // =========================
  // CLOUDINARY UPLOAD
  // =========================

  async function uploadToCloudinary(
    file: File
  ): Promise<string> {
    const cloudName = "gtvdutcc";

    const uploadPreset = "styles_bazar";

    if (!cloudName) {
      throw new Error(
        "Cloudinary Cloud Name missing hai. .env.local check karein."
      );
    }

    if (!uploadPreset) {
      throw new Error(
        "Cloudinary Upload Preset missing hai. .env.local check karein."
      );
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      uploadPreset
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Cloudinary error:",
        data
      );

      throw new Error(
        data?.error?.message ||
          "Photo Cloudinary par upload nahi hui."
      );
    }

    return data.secure_url;
  }

  // =========================
  // ADD PRODUCT
  // =========================

  async function handleAddProduct(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Product name likhein.");
      return;
    }

    if (!price || Number(price) <= 0) {
      alert("Sale price likhein.");
      return;
    }

    if (!files.length) {
      alert(
        "Kam az kam 1 photo select karein."
      );
      return;
    }

    if (files.length > 5) {
      alert(
        "Maximum 5 photos allowed hain."
      );
      return;
    }

    try {
      setLoading(true);

      const uploadedMedia: UploadedMedia[] =
        [];

      // =========================
      // UPLOAD PHOTOS
      // =========================

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        setUploadText(
          `Photo ${i + 1} / ${files.length} upload ho rahi hai...`
        );

        const imageUrl =
          await uploadToCloudinary(file);

        uploadedMedia.push({
          url: imageUrl,
          type: "image",
          name: file.name,
        });
      }

      // =========================
      // FINAL DISCOUNT
      // =========================

      const finalDiscount =
        discount !== ""
          ? Math.min(
              100,
              Math.max(0, Number(discount))
            )
          : calculateDiscount();

      // =========================
      // FIRST IMAGE
      // =========================

      const firstImage =
        uploadedMedia[0]?.url || "";

      // =========================
      // SAVE FIRESTORE
      // =========================

      setUploadText(
        "Product save ho raha hai..."
      );

      await addDoc(
        collection(db, "products"),
        {
          name: name.trim(),

          category,

          oldPrice: oldPrice
            ? Number(oldPrice)
            : 0,

          price: Number(price),

          discount: finalDiscount,

          description:
            description.trim(),

          // All 5 photos
          media: uploadedMedia,

          // Main product image
          image: firstImage,

          createdAt:
            serverTimestamp(),
        }
      );

      // Preview URLs clean
      previews.forEach((preview) => {
        URL.revokeObjectURL(
          preview.url
        );
      });

      alert(
        "Product successfully add ho gaya ✅"
      );

      router.push(
        "/admin/products"
      );
    } catch (error: unknown) {
      console.error(
        "Add product error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Product add nahi ho saka.";

      alert(message);
    } finally {
      setLoading(false);
      setUploadText("");
    }
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-screen bg-[#030303] text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[150px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />
      </div>

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/70 backdrop-blur-2xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/products"
                )
              }
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-orange-500/50 hover:bg-orange-500 hover:text-white"
            >
              <FaArrowLeft />
            </button>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-orange-500">
                STYLES BAZAR
              </p>

              <h1 className="mt-1 text-2xl font-black">
                Add Product
              </h1>
            </div>

          </div>

          <div className="hidden rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2 text-xs font-black text-orange-400 sm:block">
            NEW PRODUCT
          </div>

        </div>

      </header>

      {/* MAIN */}

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        <form
          onSubmit={handleAddProduct}
          className="space-y-6"
        >

          {/* PRODUCT INFORMATION */}

          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/60 backdrop-blur-2xl">

            <div className="border-b border-white/10 bg-white/[0.025] p-6 sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-xl text-orange-500">
                  <FaBoxOpen />
                </div>

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-500">
                    PRODUCT SETUP
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    Product Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Product ki complete information add karein.
                  </p>

                </div>

              </div>

            </div>

            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">

              {/* NAME */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Premium Ladies Handbag"
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />

              </div>

              {/* CATEGORY */}

              <div className="md:col-span-2">

                <label className="mb-3 block text-sm font-bold text-gray-300">
                  Category
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">

                  {categories.map(
                    (item) => {

                      const active =
                        category === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setCategory(
                              item
                            )
                          }
                          className={`relative flex min-h-[58px] items-center justify-center rounded-2xl border px-3 py-3 text-sm font-black transition ${
                            active
                              ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                              : "border-white/10 bg-black/40 text-gray-400 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"
                          }`}
                        >

                          {active && (
                            <FaCheck className="mr-2 text-xs" />
                          )}

                          {item}

                        </button>
                      );
                    }
                  )}

                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">

                  <FaTag className="text-orange-500" />

                  Selected Category:

                  <span className="font-black text-orange-500">
                    {category}
                  </span>

                </div>

              </div>

              {/* OLD PRICE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Old Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-gray-500">
                    Rs.
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={oldPrice}
                    onChange={(e) =>
                      handleOldPriceChange(
                        e.target.value
                      )
                    }
                    placeholder="2999"
                    className="w-full rounded-2xl border border-white/10 bg-black/50 py-4 pl-12 pr-5 text-white outline-none placeholder:text-gray-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />

                </div>

              </div>

              {/* SALE PRICE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Sale Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-orange-500">
                    Rs.
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) =>
                      handleSalePriceChange(
                        e.target.value
                      )
                    }
                    placeholder="1999"
                    className="w-full rounded-2xl border border-orange-500/30 bg-orange-500/[0.05] py-4 pl-12 pr-5 text-white outline-none placeholder:text-gray-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />

                </div>

              </div>

              {/* DISCOUNT */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Discount Percentage
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">

                  <div className="relative flex-1">

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) =>
                        setDiscount(
                          e.target.value
                        )
                      }
                      placeholder="30"
                      className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 pr-16 text-white outline-none placeholder:text-gray-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    />

                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-black text-orange-500">
                      %
                    </span>

                  </div>

                  <div className="flex items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 px-7 py-4">

                    <span className="text-sm font-bold text-gray-400">
                      Discount:
                    </span>

                    <span className="ml-2 text-xl font-black text-orange-500">
                      {discount || 0}%
                    </span>

                  </div>

                </div>

                <p className="mt-2 text-xs text-gray-600">
                  Old Price aur Sale Price dene par percentage automatically calculate hogi.
                </p>

              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Product Description
                </label>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Product ki detailed description likhein..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none placeholder:text-gray-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />

              </div>

            </div>

          </div>

          {/* PHOTOS */}

          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/60 backdrop-blur-2xl">

            <div className="border-b border-white/10 bg-white/[0.025] p-6 sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-xl text-orange-500">
                  <FaCloudUploadAlt />
                </div>

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-500">
                    MEDIA
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    Product Photos
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Maximum 5 photos upload karein.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6 sm:p-8">

              {/* UPLOAD */}

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-orange-500/30 bg-gradient-to-br from-orange-500/[0.08] to-transparent px-6 py-14 text-center transition hover:border-orange-500 hover:bg-orange-500/[0.12]">

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFiles}
                  disabled={
                    loading ||
                    files.length >= 5
                  }
                  className="hidden"
                />

                <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-[30px] border border-orange-500/20 bg-orange-500/10 text-5xl text-orange-500 shadow-xl shadow-orange-500/10 transition group-hover:scale-110">

                  <FaCloudUploadAlt />

                </div>

                <h3 className="text-xl font-black">
                  Choose Photos
                </h3>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                  Maximum 5 photos select karein.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">

                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-gray-400">

                    <FaImage className="text-orange-500" />

                    Photos Only

                  </span>

                  <span className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-400">

                    {files.length} / 5 Selected

                  </span>

                </div>

              </label>

              {/* PREVIEWS */}

              {previews.length > 0 && (

                <div className="mt-8">

                  <div className="mb-5 flex items-center justify-between">

                    <div>

                      <h3 className="text-lg font-black">
                        Selected Photos
                      </h3>

                      <p className="mt-1 text-xs text-gray-600">
                        Ye photos Cloudinary par upload hongi.
                      </p>

                    </div>

                    <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-black text-orange-500">
                      {files.length} / 5
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                    {previews.map(
                      (preview, index) => (

                        <div
                          key={`${preview.url}-${index}`}
                          className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl"
                        >

                          <img
                            src={preview.url}
                            alt={`Product ${index + 1}`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute left-2 top-2 rounded-lg border border-white/10 bg-black/80 px-2 py-1 text-[9px] font-black text-orange-400 backdrop-blur">
                            PHOTO
                          </div>

                          <div className="absolute bottom-2 left-2 rounded-lg bg-black/80 px-2 py-1 text-[9px] font-black text-white">
                            #{index + 1}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFile(
                                index
                              )
                            }
                            disabled={loading}
                            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                          >
                            <FaTrash className="text-xs" />
                          </button>

                        </div>

                      )
                    )}

                  </div>

                  {/* ADD MORE */}

                  {files.length < 5 && (

                    <label className="mt-5 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-black text-gray-400 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500">

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFiles}
                        disabled={loading}
                        className="hidden"
                      />

                      <FaPlus />

                      Add More Photos

                    </label>

                  )}

                </div>

              )}

            </div>

          </div>

          {/* SAVE */}

          <div className="rounded-[32px] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-lg font-black">
                  Ready to Publish?
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Product save hone ke baad Products section mein show hoga.
                </p>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-black text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.02] hover:from-orange-400 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    {uploadText ||
                      "Saving..."}
                  </>
                ) : (
                  <>
                    <FaSave />

                    Add Product
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </section>

    </main>
  );
}
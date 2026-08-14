import ProductClient from "./ProductClient";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Product = {
  id: string;
  name: string;
  category?: string;
  oldPrice?: number;
  price: number;
  discount?: number;
  description?: string;
  image?: string;
  images?: string[];
  media?: {
    url: string;
    type: "image";
    name: string;
  }[];
};

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </main>
    );
  }

  const data = snap.data();

  const product: Product = {
    id: snap.id,
    name: String(data.name || ""),
    category: data.category
      ? String(data.category)
      : undefined,
    oldPrice:
      data.oldPrice !== undefined
        ? Number(data.oldPrice)
        : undefined,
    price: Number(data.price || 0),
    discount:
      data.discount !== undefined
        ? Number(data.discount)
        : undefined,
    description: data.description
      ? String(data.description)
      : undefined,
    image: data.image
      ? String(data.image)
      : undefined,
    images: Array.isArray(data.images)
      ? data.images.filter(Boolean).map(String)
      : undefined,
    media: Array.isArray(data.media)
      ? data.media
          .filter((item: any) => item?.url)
          .map((item: any) => ({
            url: String(item.url),
            type: "image" as const,
            name: String(item.name || ""),
          }))
      : undefined,
  };

  return <ProductClient product={product} />;
}
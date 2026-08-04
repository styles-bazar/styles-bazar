import ProductClient from "./ProductClient";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </main>
    );
  }

  const product = {
    id: snap.id,
    ...snap.data(),
  };

  return <ProductClient product={product} />;
}
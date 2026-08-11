import { db } from "./firebase";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

// ===============================
// GET ALL PRODUCTS
// ===============================
export async function getProducts() {
  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);

    const products = [];

    querySnapshot.forEach((document) => {
      products.push({
        id: document.id,
        ...document.data(),
      });
    });

    console.log("🔥 Firebase Products:", products);

    return products;
  } catch (error) {
    console.error("❌ getProducts Error:", error);
    throw error;
  }
}

// ===============================
// GET SINGLE PRODUCT
// ===============================
export async function getProduct(id) {
  try {
    const productRef = doc(db, "products", id);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return null;
    }

    return {
      id: productSnapshot.id,
      ...productSnapshot.data(),
    };
  } catch (error) {
    console.error("❌ getProduct Error:", error);
    throw error;
  }
}

// ===============================
// ADD PRODUCT
// ===============================
export async function addProduct(product) {
  try {
    const docRef = await addDoc(
      collection(db, "products"),
      product
    );

    return {
      id: docRef.id,
      ...product,
    };
  } catch (error) {
    console.error("❌ addProduct Error:", error);
    throw error;
  }
}

// ===============================
// DELETE PRODUCT
// ===============================
export async function deleteProduct(id) {
  try {
    await deleteDoc(
      doc(db, "products", id)
    );
  } catch (error) {
    console.error("❌ deleteProduct Error:", error);
    throw error;
  }
}

// ===============================
// UPDATE PRODUCT
// ===============================
export async function updateProduct(id, product) {
  try {
    await updateDoc(
      doc(db, "products", id),
      product
    );
  } catch (error) {
    console.error("❌ updateProduct Error:", error);
    throw error;
  }
}

// ===============================
// TOTAL PRODUCTS
// ===============================
export async function getTotalProducts() {
  try {
    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    return querySnapshot.size;
  } catch (error) {
    console.error("❌ getTotalProducts Error:", error);
    throw error;
  }
}

// ===============================
// PLACE ORDER
// ===============================
export async function placeOrder(order) {
  try {
    const docRef = await addDoc(
      collection(db, "orders"),
      order
    );

    return {
      id: docRef.id,
      ...order,
    };
  } catch (error) {
    console.error("❌ placeOrder Error:", error);
    throw error;
  }
}

// ===============================
// UPDATE ORDER STATUS
// ===============================
export async function updateOrderStatus(id, status) {
  try {
    await updateDoc(
      doc(db, "orders", id),
      {
        status,
      }
    );
  } catch (error) {
    console.error("❌ updateOrderStatus Error:", error);
    throw error;
  }
}
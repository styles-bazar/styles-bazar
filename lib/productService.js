import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

// Get All Products
export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));

  const products = [];

  querySnapshot.forEach((document) => {
    products.push({
      id: document.id,
      ...document.data(),
    });
  });

  return products;
}

// Add Product
export async function addProduct(product) {
  await addDoc(collection(db, "products"), product);
}

// Delete Product
export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}

// Update Product
export async function updateProduct(id, product) {
  await updateDoc(doc(db, "products", id), product);
}

// Total Products
export async function getTotalProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.size;
}

// Place Order
export async function placeOrder(order) {
  await addDoc(collection(db, "orders"), order);
}

// Update Order Status
export async function updateOrderStatus(id, status) {
  await updateDoc(doc(db, "orders", id), {
    status,
  });
}
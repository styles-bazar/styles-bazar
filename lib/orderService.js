import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function saveOrder(order) {
  await addDoc(collection(db, "orders"), order);
}
import { getDocs } from "firebase/firestore";

export async function getOrders() {
  const querySnapshot = await getDocs(collection(db, "orders"));

  const orders = [];

  querySnapshot.forEach((document) => {
    orders.push({
      id: document.id,
      ...document.data(),
    });
  });

  return orders;
}
import { updateDoc, doc } from "firebase/firestore";

export async function updateOrderStatus(id, status) {
  await updateDoc(doc(db, "orders", id), {
    status,
  });
}
import { deleteDoc } from "firebase/firestore";

export async function deleteOrder(id) {
  await deleteDoc(doc(db, "orders", id));
}
export async function getTotalOrders() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  return querySnapshot.size;
}
export async function getTotalSales() {
  const querySnapshot = await getDocs(collection(db, "orders"));

  let total = 0;

  querySnapshot.forEach((document) => {
    const order = document.data();
    total += Number(order.total || 0);
  });

  return total;
}
export async function getTotalCustomers() {
  const querySnapshot = await getDocs(collection(db, "orders"));

  const customers = new Set();

  querySnapshot.forEach((document) => {
    const order = document.data();
    customers.add(order.customerPhone);
  });

  return customers.size;
}
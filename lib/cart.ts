export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export function getCart() {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product: any) {
  const cart = getCart();

  const existing = cart.find((item: CartItem) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((item: CartItem) => item.id !== id);
  saveCart(cart);
}
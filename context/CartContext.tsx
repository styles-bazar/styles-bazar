"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      localStorage.removeItem("cart");
    }

    setLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, loaded]);

  // ADD TO CART
  function addToCart(product: any, quantity: number = 1) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + Number(quantity),
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: Number(quantity) || 1,
        },
      ];
    });
  }

  // REMOVE
  function removeFromCart(id: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  // UPDATE QUANTITY
  function updateQuantity(id: string, quantity: number) {
    const newQuantity = Math.max(1, Number(quantity));

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  }

  // INCREASE
  function increaseQuantity(id: string) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 1) + 1,
            }
          : item
      )
    );
  }

  // DECREASE
  function decreaseQuantity(id: string) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Number(item.quantity || 1) - 1
              ),
            }
          : item
      )
    );
  }

  // CLEAR CART
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        // Original name
        cart,

        // Compatibility with new Cart page
        cartItems: cart,

        // Functions
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
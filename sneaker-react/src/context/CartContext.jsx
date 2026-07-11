import { createContext, useContext, useState } from "react";

// ── Create the context ───────────────────────────────
const CartContext = createContext();

// ── Provider — wraps the whole app ──────────────────
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item — if already in cart, increase quantity
  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Remove item completely
  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  // Increase quantity
  function increaseQty(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  // Decrease quantity — remove if reaches 0
  function decreaseQty(productId) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // Total number of items (for navbar badge)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Custom hook — easy way to use cart anywhere ──────
export function useCart() {
  return useContext(CartContext);
}

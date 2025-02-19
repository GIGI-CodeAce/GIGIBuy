import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ClothingItem } from "../Homepage/items";

interface CartContextType {
  cart: ClothingItem[];
  addToCart: (item: ClothingItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ClothingItem[]>([]);

  // Saving into local storage cart elements
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: ClothingItem) => {
    setCart((prev) => {
      const existingItem = prev.find((ClothingItem) => ClothingItem.id === item.id);
      if (existingItem) {
        return prev.map((ClothingItem) =>
          ClothingItem.id === item.id
            ? { ...ClothingItem, quantity: (ClothingItem.quantity || 0) + 1 }
            : ClothingItem
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

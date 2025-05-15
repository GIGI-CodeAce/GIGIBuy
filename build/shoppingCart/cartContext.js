import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext, useEffect } from "react";
const CartContext = createContext(undefined);
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error("useCart must be used within a CartProvider");
    return context;
};
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    const addToCart = (item) => {
        setCart((prev) => {
            const existingItem = prev.find((ClothingItem) => ClothingItem.id === item.id);
            if (existingItem) {
                return prev.map((ClothingItem) => ClothingItem.id === item.id
                    ? { ...ClothingItem, quantity: (ClothingItem.quantity || 0) + 1 }
                    : ClothingItem);
            }
            return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
    };
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };
    const updateQuantity = (id, quantity) => {
        setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
    };
    return (_jsx(CartContext.Provider, { value: { cart, addToCart, removeFromCart, updateQuantity }, children: children }));
};

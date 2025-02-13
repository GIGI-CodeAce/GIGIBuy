// CartPage.tsx
import React from "react";
import { useCart } from "../shoppingCart/cartContext"; // Using cart context to manage cart data
import { Link } from "react-router-dom"; // For navigation
import { ClothingItem } from "../Homepage/items";

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate the total price of the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle removing an item
  const handleRemove = (productId: string) => {
    const productIdNumber = Number(productId); // Convert to number if productId is a string
    removeFromCart(productIdNumber);
  };

  // Handle quantity change
  const handleQuantityChange = (productId: string, quantity: number) => {
    const productIdNumber = Number(productId); // Convert to number if productId is a string
    updateQuantity(productIdNumber, quantity);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {/* If the cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        // If the cart has items
        <div>
          {cart.map((item) => (
            <div key={item.productId} className="flex justify-between items-center border-b py-4">
              {/* Product Info */}
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(String(item.productId), item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(String(item.productId), item.quantity + 1)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              {/* Remove Item */}
              <button
                onClick={() => handleRemove(String(item.productId))}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-medium">Total:</h2>
            <p className="text-xl font-bold">${getTotalPrice().toFixed(2)}</p>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 text-center">
            <Link to="/checkout">
              <button className="px-6 py-2 bg-green-500 text-white rounded">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

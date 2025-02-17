import React, { useEffect, useState } from "react";
import { useCart } from "../shoppingCart/cartContext"; 
import { Link } from "react-router-dom"; 
import Footer from "../Fixed/footer";
import { useNavigate } from "react-router-dom";
import SpecialOffer from "../Fixed/specialOffer";
import NavigationBar from "../Fixed/navBar";

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [searchText, setSearchText] = useState(localStorage.getItem("searchQuery") || "");
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return total + price * quantity;
    }, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleRemove = (id: string | number) => {
    removeFromCart(Number(id)); 
  };

  const handleQuantityChange = (id: string | number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(Number(id), quantity);
  };

  return (
    <>
<NavigationBar value={searchText} 
                onSearch={(query) => {setSearchText(query);
                localStorage.setItem("searchQuery", query);
              }}/>
      <SpecialOffer/>
        <div className="container mx-auto mb-4 p-4 min-h-[352px]">
      <h1 className="text-2xl text-[#4b6686] pb-2 font-bold underline">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
         <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                <img
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                <h2 className="text-md sm:text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-[#ffac99] shadow w-20">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.id, Number(item.quantity) - 1)}
                  disabled={Number(item.quantity) <= 1}
                  className="px-2 py-1 bg-[#e2e6e9] hover:bg-[#ebedef] rounded"
                >
                  -
                </button>
                <span>{Number(item.quantity) || 1}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, Number(item.quantity) + 1)}
                  className="px-2 py-1 bg-[#e2e6e9] hover:bg-[#ebedef] rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="px-4 bg-[#a0c4d7] scale-88 sm:scale-100 p-2 mr-2 rounded-lg rounded-r-2xl text-white hover:text-[#FFB6A6]"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-medium">Total:</h2>
            <p className="text-xl font-bold">${getTotalPrice().toFixed(2)}</p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/checkout">
              <button className="px-6 py-2 rounded-lg rounded-b-3xl text-white bg-[#a0c4d7] hover:bg-[#90bad0] active:bg-[#7eaec9]" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default CartPage;

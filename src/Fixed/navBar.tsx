import { useState } from "react";
import { useCart } from "../shoppingCart/cartContext";
import { useNavigate } from "react-router-dom";

function NavigationBar({ onSearch }: { onSearch: (query: string) => void }) {
  const { cart } = useCart();
  const navigate = useNavigate();
  const profileCartStyling = "flex items-center gap-1 mr-2 hover:text-[#FFB6A6] hover:cursor-pointer transition-colors";

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value); 
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <nav className="w-full pt-0 h-20 bg-[#455d7a] flex justify-evenly items-center text-[15px] sm:text-[20px] text-white">
      <a href="https://gigibuy.com/">
        <h1 className="text-2xl active:text-[#e5c9c3] text-[20px] font-[iconic] ml-2 sm:text-[25px] flex items-center gap-1 mr-2">
          <div className="w-10 h-10 bg-cover bg-center bg-[url('https://raw.githubusercontent.com/GIGIsOtherStuff/GIGIbuy/main/diamond.png')]"></div>
          GIGIbuy
        </h1>
      </a>

      <input
        className="pl-2 w-full sm:w-[30vw] rounded-xl text-[#e9c6be] border-2 bg-[#4b6686] border-white ml-2 mr-2 placeholder-[#e5c9c3]"
        placeholder="Search.."
        onChange={handleSearchChange}
      />

      <div
        className={`${profileCartStyling} ${totalItemsInCart > 0 ? "text-[#e9c6be]" : "text-white"}`}
        onClick={handleCartClick}
      >
        {totalItemsInCart}
        <span className="material-symbols-outlined">shopping_cart</span>
        <span className="align-super font-bold whitespace-nowrap">Cart</span>
      </div>

      <div className={profileCartStyling}>
        <span className="material-symbols-outlined">person</span>
        <span className="align-super font-bold">Profile</span>
      </div>
    </nav>
  );
}

export default NavigationBar;

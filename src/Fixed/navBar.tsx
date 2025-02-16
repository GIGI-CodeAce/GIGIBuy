import { useState, useEffect } from "react";
import { useCart } from "../shoppingCart/cartContext";
import { useNavigate } from "react-router-dom";

function NavigationBar({ onSearch, value }: { onSearch: (query: string) => void; value: string }) {
  const { cart } = useCart();
  const navigate = useNavigate();
  const profileCartStyling = "flex items-center gap-1 mr-2 hover:text-[#FFB6A6] hover:cursor-pointer transition-colors";
  const [searchText, setSearchText] = useState(value);

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery") || "";
    setSearchText(storedQuery);
    onSearch(storedQuery);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchText(query);
    onSearch(query);
    localStorage.setItem("searchQuery", query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchText.trim()) {
      navigate("/items");
    }
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

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
        list="recommendations"
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />

      <datalist id="recommendations">
        <option value="Shirt" />
        <option value="Jacket" />
        <option value="Pants" />
      </datalist>

      <div
        className={`${profileCartStyling} ${totalItemsInCart > 0 ? "text-[#e9c6be]" : "text-white"}`}
        onClick={() => navigate("/cart")}
      >
        {totalItemsInCart}
        <span className="material-symbols-outlined">shopping_cart</span>
        <span className="align-super font-bold whitespace-nowrap">Cart</span>
      </div>

      <div className={profileCartStyling} onClick={() => navigate("/profile")}>
        <span className="material-symbols-outlined">person</span>
        <span className="align-super font-bold">Profile</span>
      </div>
    </nav>
  );
}

export default NavigationBar;

import { useState, useEffect } from "react";
import { useCart } from "../shoppingCart/cartContext";
import { useNavigate,useLocation } from "react-router-dom";

function NavigationBar({ onSearch, value }: { onSearch: (query: string) => void; value: string }) {
  const { cart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const profileCartStyling = "flex items-center gap-1 mr-2 hover:text-[#FFB6A6] hover:cursor-pointer transition-colors"
  const [searchText, setSearchText] = useState(value)

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery") || "";
    setSearchText(storedQuery)
    onSearch(storedQuery)
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchText(query)
    onSearch(query)
    localStorage.setItem("searchQuery", query)
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchText.trim() && location.pathname !== "/") {
      navigate("/items")
    }
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="w-full z-100 pt-0 h-20 bg-[#455d7aee] flex fixed justify-evenly items-center text-[15px] sm:text-[20px] text-white">
      <a onClick={()=> navigate('/')}>
        <h1 title="Refresh homepage" className="text-2xl active:text-[#e5c9c3] text-[20px] font-[iconic] ml-1 sm:text-[25px] flex items-center gap-1">
       <div className={`w-10 h-9 mt-1 bg-cover bg-center sm:block ${totalItemsInCart >= 100 ? 'hidden' : ''}
        bg-[url('https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/diamondFixed.png')]`}></div>
          GIGIbuy
        </h1>
      </a>

      {/* Search bar */}
      <div title="Search fashion items" className="relative w-full sm:w-[30vw] ml-2 mr-2">
        <span
          className="material-symbols-outlined select-none absolute left-[8px] top-1/2 transform -translate-y-1/2 text-[#e9c6be]"
          aria-hidden="true">
          search</span>
        <input
          className="pl-[33px] w-full rounded-xl text-[#e9c6be] border-2 bg-[#4b6686] border-white placeholder-[#e5c9c3]"
          placeholder="Search.."
          list="recommendations"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
      </div>

      <datalist id="recommendations">
        <option value="Shirt" />
        <option value="Jacket" />
        <option value="Pants" />
      </datalist>

      <div title="Shopping cart"
        className={`${profileCartStyling} ${totalItemsInCart > 0 ? "text-[#e9c6be]" : "text-white"}`}
        onClick={() => navigate("/cart")}
      >
        {totalItemsInCart}
        <span className="material-symbols-outlined">shopping_cart</span>
        <span className="align-super font-bold whitespace-nowrap">Cart</span>
      </div>

      <div title="User profile" className={profileCartStyling} onClick={() => navigate("/profile")}>
        <span className="material-symbols-outlined">person</span>
        <span className="align-super font-bold">Profile</span>
      </div>
    </nav>
  );
}

export default NavigationBar

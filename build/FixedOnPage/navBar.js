import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useCart } from "../shoppingCart/cartContext";
import { useNavigate, useLocation } from "react-router-dom";
function NavigationBar({ onSearch, value }) {
    const { cart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const profileCartStyling = "flex items-center gap-1 mr-2 hover:text-[#FFB6A6] hover:cursor-pointer transition-colors";
    const [searchText, setSearchText] = useState(value);
    useEffect(() => {
        const storedQuery = localStorage.getItem("searchQuery") || "";
        setSearchText(storedQuery);
        onSearch(storedQuery);
    }, []);
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchText(query);
        onSearch(query);
        localStorage.setItem("searchQuery", query);
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter" && searchText.trim() && location.pathname !== "/") {
            navigate("/items");
        }
    };
    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
    return (_jsxs("nav", { className: "w-full z-100 pt-0 h-20 bg-[#455d7aee] flex fixed justify-evenly items-center text-[15px] sm:text-[20px] text-white", children: [_jsx("a", { href: "https://gigibuy.com/", children: _jsxs("h1", { title: "Refresh homepage", className: "text-2xl active:text-[#e5c9c3] text-[20px] font-[iconic] ml-1 sm:text-[25px] flex items-center gap-1", children: [_jsx("div", { className: `w-10 h-10 bg-cover bg-center sm:block ${totalItemsInCart >= 100 ? 'hidden' : ''}
        bg-[url('https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/diamond.png')]` }), "GIGIbuy"] }) }), _jsxs("div", { title: "Search fashion items", className: "relative w-full sm:w-[30vw] ml-2 mr-2", children: [_jsx("span", { className: "material-symbols-outlined select-none absolute left-[8px] top-1/2 transform -translate-y-1/2 text-[#e9c6be]", "aria-hidden": "true", children: "search" }), _jsx("input", { className: "pl-[33px] w-full rounded-xl text-[#e9c6be] border-2 bg-[#4b6686] border-white placeholder-[#e5c9c3]", placeholder: "Search..", list: "recommendations", value: searchText, onChange: handleSearchChange, onKeyDown: handleKeyPress })] }), _jsxs("datalist", { id: "recommendations", children: [_jsx("option", { value: "Shirt" }), _jsx("option", { value: "Jacket" }), _jsx("option", { value: "Pants" })] }), _jsxs("div", { title: "Shopping cart", className: `${profileCartStyling} ${totalItemsInCart > 0 ? "text-[#e9c6be]" : "text-white"}`, onClick: () => navigate("/cart"), children: [totalItemsInCart, _jsx("span", { className: "material-symbols-outlined", children: "shopping_cart" }), _jsx("span", { className: "align-super font-bold whitespace-nowrap", children: "Cart" })] }), _jsxs("div", { title: "User profile", className: profileCartStyling, onClick: () => navigate("/profile"), children: [_jsx("span", { className: "material-symbols-outlined", children: "person" }), _jsx("span", { className: "align-super font-bold", children: "Profile" })] })] }));
}
export default NavigationBar;

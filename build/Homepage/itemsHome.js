import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import ProductListing from "./productsListing";
import Categories from "./categories";
function Items() {
    const [clothing, setClothing] = useState([]);
    const [filteredClothing, setFilteredClothing] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
    setTimeout(() => {
        localStorage.removeItem("searchQuery");
    }, 100);
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem("selectedCategory") || "All");
    // Fetch clothing items from Supabase
    useEffect(() => {
        const fetchClothing = async () => {
            const { data, error } = await supabase.from("Clothing").select("*");
            if (error) {
                setError("Error fetching clothing data");
            }
            else {
                setClothing(data || []);
            }
        };
        fetchClothing();
    }, []);
    useEffect(() => {
        let filtered = clothing;
        if (selectedCategory !== "All") {
            filtered = filtered.filter((item) => item.categories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase()));
        }
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((item) => item.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredClothing(filtered);
    }, [searchQuery, selectedCategory, clothing]);
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        localStorage.setItem("selectedCategory", category);
    };
    useEffect(() => {
        return () => {
            localStorage.removeItem("searchQuery");
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Categories, { selectedCategory: selectedCategory, onCategoryChange: handleCategoryChange }), _jsxs("div", { className: "container mx-auto mb-10 min-h-[300px]", children: [_jsx("h1", { className: "text-2xl text-[#4b6686] xl:pl-8 p-4 font-bold underline", children: "Clothing Items" }), error && _jsxs("p", { className: "text-red-500", children: ["Error: ", error] }), filteredClothing.length === 0 && !error && (_jsxs("div", { className: "text-gray-500 flex-col text-center justify-center mt-20", children: [_jsx("h1", { className: "text-4xl", children: "\u02D9\u25E0\u02D9" }), _jsx("p", { className: "text-xl", children: "No clothing items found" })] })), _jsx("div", { className: "w-full grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 xl:pl-6 pr-[6px]\r\n                        md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-y-4 gap-x-3", children: filteredClothing.map((item) => (_jsx(ProductListing, { ...item }, item.id))) })] })] }));
}
export default Items;

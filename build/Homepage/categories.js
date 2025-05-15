import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Categories({ selectedCategory, onCategoryChange }) {
    const buttonStyle = "hover:cursor-pointer select-none hover:rounded-lg hover:border-3 transition-all w-2/3 max-w-[300px] border-2 border-[#455d7a] m-2 h-7 rounded-xl";
    return (_jsxs("main", { className: "h-10 flex text-center justify-center", children: [_jsx("button", { onClick: () => onCategoryChange("All"), className: `${buttonStyle} ${selectedCategory === "All" ? "bg-[#516d90] text-[#FFB6A6]" : ""}`, children: "All" }), _jsx("button", { onClick: () => onCategoryChange("Men"), className: `${buttonStyle} ${selectedCategory === "Men" ? "bg-[#516d90] text-[#FFB6A6]" : ""}`, children: "Men" }), _jsx("button", { onClick: () => onCategoryChange("Women"), className: `${buttonStyle} ${selectedCategory === "Women" ? "bg-[#516d90] text-[#FFB6A6]" : ""}`, children: "Women" })] }));
}
export default Categories;

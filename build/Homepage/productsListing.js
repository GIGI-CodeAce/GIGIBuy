import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ProductListing({ id, name, image, coverImage, description, price, bool = false }) {
    const [showCoverImg, setShowCoverImg] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        const formattedName = name.replace(/\s+/g, "-").toLowerCase();
        navigate(`/${id}/${formattedName}`);
    };
    return (_jsxs("div", { className: `pt-5 max-w-[250px]  ${bool ? "sm:w-[230px] w-[210px]" : ""} text-center h-[303px] border-2 rounded-xl border-[#4b6686] ml-[5px]
                 hover:scale-103 cursor-pointer transition-all hover:bg-[#eff2f5]`, onMouseEnter: () => setShowCoverImg(true), onMouseLeave: () => setShowCoverImg(false), onClick: handleClick, children: [_jsx("img", { src: coverImage, alt: "", className: "hidden", "aria-hidden": "true" }), _jsx("div", { className: "bg-cover rounded-t-xl h-[200px] duration-300", style: { backgroundImage: `url(${showCoverImg ? coverImage : image})` }, children: _jsx("div", { className: `justify-end p-4 pt-0 ${showCoverImg ? "flex" : "hidden"}`, children: _jsx("span", { className: "material-symbols-outlined", children: "favorite" }) }) }), _jsx("h1", { className: `font-bold text-lg ${showCoverImg ? "text-[#FFB6A6]" : "text-gray-800"}`, children: name }), _jsx("abbr", { className: "no-underline", title: description, children: _jsx("h2", { className: "text-gray-600 truncate px-1", children: description }) }), _jsxs("p", { className: "opacity-60", children: [price, "$"] })] }));
}
export default ProductListing;

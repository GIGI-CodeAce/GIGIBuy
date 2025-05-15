import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../shoppingCart/cartContext";
import useFetchClothing from "./itemPageData";
import supabase from "../supabase-client";
import Recommendations from "./recommendations";
import ImagesSelect from "./imagesSelect";
function ItemPage() {
    const { cart, addToCart } = useCart();
    const [clothing, setClothing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(false);
    const [canHover, setCanHover] = useState(true);
    const [error, setError] = useState(null);
    const [cardAdd, setCardAdd] = useState('Add to cart');
    const [allItems, setAllItems] = useState([]);
    const [similarItems, setSimilarItems] = useState([]);
    const { id, name } = useParams();
    function CartAdded() {
        setCardAdd('Item added!');
        setTimeout(() => {
            setCardAdd('Add to cart');
        }, 1000);
    }
    useFetchClothing(supabase, id, name, setClothing, setError, setLoading);
    useEffect(() => {
        const fetchAllItems = async () => {
            const { data, error } = await supabase.from("Clothing").select("*");
            if (!error)
                setAllItems(data || []);
        };
        if (clothing)
            fetchAllItems();
    }, [clothing]);
    useEffect(() => {
        if (clothing && allItems.length > 0) {
            const lastWord = clothing.description.trim().split(" ").pop()?.toLowerCase();
            const materials = clothing.FabricMaterials?.split(',').map((m) => m.trim().toLowerCase()) || [];
            const filteredByDescription = allItems.filter(item => {
                if (item.id === clothing.id)
                    return false;
                const itemLastWord = item.description.trim().split(" ").pop()?.toLowerCase();
                return itemLastWord === lastWord;
            });
            if (filteredByDescription.length < 5) {
                const filteredByMaterials = allItems.filter(item => {
                    if (item.id === clothing.id)
                        return false;
                    const itemMaterials = item.FabricMaterials?.split(',').map(m => m.trim().toLowerCase()) || [];
                    return itemMaterials.some(m => materials.includes(m));
                });
                const combined = [...new Set([...filteredByDescription, ...filteredByMaterials])];
                setSimilarItems(combined.slice(0, 5));
            }
            else {
                setSimilarItems(filteredByDescription.slice(0, 5));
            }
        }
    }, [clothing, allItems]);
    const handleAddToCart = () => {
        CartAdded();
        if (clothing) {
            const cartItem = {
                ...clothing,
            };
            addToCart(cartItem);
        }
    };
    if (loading)
        return _jsxs("div", { className: "text-gray-500 flex-col text-center justify-center mt-50", children: [_jsx("span", { className: "material-symbols-outlined", children: "autorenew" }), _jsx("p", { className: "text-xl opacity-60", children: "Loading..." })] });
    if (error)
        return _jsx("div", { className: "text-gray-500 flex-col text-center justify-center mt-40", children: _jsxs("p", { className: "text-red-500", children: ["Error: ", error] }) });
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-hidden sm:flex justify-center items-center min-h-[70vh] max-h-[130vh] mb-10", children: clothing && (_jsxs(_Fragment, { children: [_jsx(ImagesSelect, { image: clothing.image, coverImage: clothing.coverImage, setCanHover: setCanHover, setImage: setImage }), _jsx("div", { className: "max-w-[470px] max-h-[500px] min-h-[420px] sm:mt-8 mt-2 border-2 bg-center bg-contain bg-no-repeat transition-all border-[#4b6686] flex items-center rounded-2xl p-20 justify-center mx-auto sm:mx-0 sm:ml-2", onMouseEnter: () => canHover && setImage(true), onMouseLeave: () => canHover && setImage(false), style: { backgroundImage: `url(${image ? clothing.coverImage : clothing.image})` }, children: _jsx("img", { className: "w-96 max-h-[450px] object-contain opacity-0", "aria-hidden": "true", src: clothing.image, alt: clothing.name }) }), _jsxs("main", { className: "max-w-[500px] min-w-[250px] sm:text-xl text-md text-center pt-[0] mx-auto sm:mx-0 sm:pt-[20vh] mt-2 sm:mt-8 sm:p-10 sm:mr-2", children: [_jsx("h1", { className: "font-[iconic] font-bold sm:text-md text-xl lg:w-[222px] mx-auto", children: clothing.name }), _jsx("p", { title: clothing.description, className: "lg:min-w-[222px] text-gray-500", children: clothing.description }), _jsxs("p", { className: "text-[#FFB6A6] mx-auto rounded-xl w-16 shadow-xl", children: ["$", clothing.price] }), _jsx("br", {}), _jsx("br", {}), _jsx("button", { title: "Click to add", onClick: handleAddToCart, className: "text-[#ffd5cc] w-40 cursor-pointer bg-[#a0c4d7] hover:bg-[#90bad0] active:bg-[#7eaec9] p-2 rounded-2xl", children: cardAdd }), _jsxs("section", { className: "text-[17px]/[20px] font-light mt-14", children: [_jsx("h1", { className: "font-medium underline text-[#7eaec9] decoration-[#FFB6A6]", children: "About the product" }), _jsxs("p", { children: ["Materials: ", clothing.FabricMaterials] }), _jsxs("p", { children: ["Brand: ", clothing.company] })] })] })] })) }), _jsx(Recommendations, { similarItems: similarItems })] }));
}
export default ItemPage;

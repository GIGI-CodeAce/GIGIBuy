import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCart } from "../shoppingCart/cartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const addSubstractStyle = "px-2 py-1 bg-[#e2e6e9] hover:bg-[#ebedef] active:bg-[#e2e6e9] cursor-pointer rounded";
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
    const handleRemove = (id) => {
        removeFromCart(Number(id));
    };
    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1)
            return;
        updateQuantity(Number(id), quantity);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "container mx-auto mb-4 p-4 min-h-[352px]", children: [_jsx("h1", { className: "text-2xl text-[#4b6686] pb-2 font-bold underline", children: "Your Cart" }), cart.length === 0 ? (_jsxs("div", { className: "text-gray-500 flex-col text-center justify-center mt-20", children: [_jsx("h1", { className: "text-4xl", children: "\u02D9\u25E0\u02D9" }), _jsx("p", { className: "text-xl", children: "Your cart is empty" })] })) : (_jsxs("div", { children: [cart.map((item) => (_jsxs("div", { className: "flex justify-between items-center border-b py-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Link, { to: `/${item.id}/${item.name}`, className: "flex items-center", children: _jsx("img", { src: item.image, alt: item.name, className: "w-16 h-16 object-cover mr-4 hover:opacity-80" }) }), _jsxs("div", { children: [_jsx(Link, { to: `/${item.id}/${item.name}`, children: _jsx("h2", { className: "text-[14px] sm:text-lg font-bold hover:underline", children: item.name }) }), _jsxs("p", { className: "text-sm text-[#ffac99] shadow w-20", children: ["$", item.price] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => handleQuantityChange(item.id, Number(item.quantity) - 1), disabled: Number(item.quantity) <= 1, className: addSubstractStyle, children: "-" }), _jsx("span", { children: Number(item.quantity) || 1 }), _jsx("button", { onClick: () => handleQuantityChange(item.id, Number(item.quantity) + 1), className: addSubstractStyle, children: "+" })] }), _jsx("button", { onClick: () => handleRemove(item.id), className: "px-4 bg-[#a0c4d7] scale-88 sm:scale-100 p-2 rounded-lg rounded-r-2xl text-white cursor-pointer hover:text-[#ffc5b8]", children: "Remove" })] }, item.id))), _jsxs("div", { className: "mt-6 flex justify-between items-center", children: [_jsx("h2", { className: "text-xl font-medium", children: "Total:" }), _jsxs("p", { className: "text-xl font-bold", children: ["$", getTotalPrice().toFixed(2)] })] }), _jsx("div", { className: "mt-4 text-center", children: _jsx(Link, { to: "/checkout", children: _jsx("button", { className: "px-6 py-2 rounded-lg rounded-b-3xl text-white bg-[#a0c4d7] hover:bg-[#90bad0] active:bg-[#7eaec9] hover:text-[#ffc5b8] cursor-pointer", onClick: handleCheckout, children: "Proceed to Checkout" }) }) })] }))] }) }));
}
export default CartPage;

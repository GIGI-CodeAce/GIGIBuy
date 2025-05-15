import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ProductListing from "../Homepage/productsListing";
function Recommendations({ similarItems }) {
    return (_jsx(_Fragment, { children: similarItems.length > 0 && (_jsxs("section", { className: "container mx-auto mb-20", children: [_jsx("h2", { className: "text-2xl text-[#4b6686] xl:pl-8 p-4 font-bold underline", children: "You may also like" }), _jsx("div", { className: `flex overflow-x-auto ${similarItems.length < 4 ? 'sm:justify-center' : ''} scrollbar-hide`, children: _jsx("div", { className: "flex gap-4 p-4", children: similarItems.map((item) => (_jsx("div", { children: _jsx(ProductListing, { ...item, bool: true }) }, item.id))) }) })] })) }));
}
export default Recommendations;

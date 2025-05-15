import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import NavigationBar from "./FixedOnPage/navBar";
import Footer from "./FixedOnPage/footer";
import SpecialOffer from "./FixedOnPage/specialOffer";
import { useState } from "react";
function DefaultLayout() {
    const [searchText, setSearchText] = useState(localStorage.getItem("searchQuery") || "");
    return (_jsxs(_Fragment, { children: [_jsx(NavigationBar, { value: searchText, onSearch: (query) => { setSearchText(query); localStorage.setItem("searchQuery", query); } }), _jsx(SpecialOffer, {}), _jsx(Outlet, {}), _jsx(Footer, {})] }));
}
export default DefaultLayout;

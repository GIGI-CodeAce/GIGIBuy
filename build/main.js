import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ItemPage from './ItemPage/itemPage';
import Items from './Homepage/itemsHome';
import { CartProvider } from './shoppingCart/cartContext';
import CartPage from './shoppingCart/cartPage';
import Checkout from './shoppingCart/checkout';
import UserProfile from './userProfile';
import DefaultLayout from './layout';
import './index.css';
import './layout.js';
createRoot(document.getElementById('root')).render(_jsx(CartProvider, { children: _jsx(Routing, {}) }));
export default function Routing() {
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsxs(Route, { path: '/', element: _jsx(DefaultLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(Items, {}) }), _jsx(Route, { path: "/*", element: _jsx(Items, {}) }), _jsx(Route, { path: "/:id/:name", element: _jsx(ItemPage, {}) }), _jsx(Route, { path: "/*", element: _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(Checkout, {}) }), _jsx(Route, { path: "/profile", element: _jsx(UserProfile, {}) })] }) }) }));
}

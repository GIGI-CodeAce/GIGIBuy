import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ItemPage from './ItemPage/itemPage';
import Items from './Homepage/itemsHome';
import { CartProvider } from './shoppingCart/cartContext';
import CartPage from './shoppingCart/cartPage';
import Checkout from './shoppingCart/checkout';
import UserProfile from './userProfile';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <Routing />
  </CartProvider>
);

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/:id/:name" element={<ItemPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/profile" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

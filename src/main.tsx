import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ItemPage from './ItemPage/itemPage';
import Items from './Homepage/itemsHome';
import { CartProvider } from './shoppingCart/cartContext';
import CartPage from './shoppingCart/cartPage';
import Checkout from './shoppingCart/checkout';
import UserProfile from './userProfile';
import DefaultLayout from './layout'
import './index.css';
import './layout.js'
import ItemPageFallBack from './ItemPage/itemPageFallBack';

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <Routing />
  </CartProvider>
);

export default function Routing() {
  return (
<HashRouter>
  <Routes>
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Items />} />
      <Route path="items" element={<Items />} />
      <Route path=":id/:name" element={<ItemPage />} />

      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="profile" element={<UserProfile />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
</HashRouter>

  );
}

import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ItemPage from './ItemPage/itemPage';
import Items from './Homepage/itemsHome';
import { CartProvider } from './shoppingCart/cartContext';
import CartPage from './shoppingCart/cartPage';
import Checkout from './shoppingCart/checkout';
import DefaultLayout from './layout'
import RegisterPage from './User/RegisterPage';
import LoginPage from './User/LoginPage';
import UserProfile from './User/userProfile';
import './index.css';
import './layout.js'
import ProtectedRoute from './protectedRouter';
import { UserContextProvider } from './userContext'
// import ItemPageFallBack from './ItemPage/itemPageFallBack';

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <Routing />
  </CartProvider>
);

export default function Routing() {
  return (
<HashRouter>
  <UserContextProvider>
  <Routes>
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Items />} />
      <Route path="items" element={<Items />} />
      <Route path=":id/:name" element={<ItemPage />} />

      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
  </UserContextProvider>
</HashRouter>

  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout, RegistrationLayout } from './layout';
import { CartProvider } from './shoppingCart/cartContext';
import { UserContextProvider } from './userContext';
import FavoritesPage from './Favorites/Favorites';
import ProtectedRoute from './protectedRouter';
import RegisterPage from './User/RegisterPage';
import CartPage from './shoppingCart/cartPage';
import Checkout from './shoppingCart/checkout';
import { createRoot } from 'react-dom/client';
import UserProfile from './User/userProfile';
import ItemPage from './ItemPage/itemPage';
import Items from './Homepage/itemsHome';
import LoginPage from './User/LoginPage';
import PublicRoute from './PublicRoute'; 
import Logout from "./User/Logout";
import './index.css';

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <Routing />
  </CartProvider>
);

export default function Routing() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Items />} />
            <Route path="items" element={<Items />} />
            <Route path=":id/:name" element={<ItemPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path='favorites' element={<FavoritesPage/>}/>
            <Route path="checkout" element={<Checkout />} />

            <Route
              path="logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }/>

            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route element={<RegistrationLayout />}>
            <Route path="register"element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>  }/>

            <Route path="login"element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>  }/>

            <Route path="profile"element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }/>
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

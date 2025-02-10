import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemPage from "./ItemPage/itemPage";
import Items from "./Homepage/items";
import './index.css'

createRoot(document.getElementById('root')!).render(Routing())

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items/>} />
        <Route path="/:id" element={<ItemPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

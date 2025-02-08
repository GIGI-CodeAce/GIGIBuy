import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./main";
import ItemPage from "./itemPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<ItemPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

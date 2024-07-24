
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FingerAreaPage from "./pages/FingerAreaPage";
import AbdominalAreaPage from "./pages/AbdominalAreaPage";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FingerAreaPage />} />
          <Route path="finger" element={<FingerAreaPage />} />
          <Route path="abdominal" element={<AbdominalAreaPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



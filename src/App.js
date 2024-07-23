import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FingerAreaPage from "./pages/FingerAreaPage";
import AbdominalAreaPage from "./pages/AbdominalAreaPage";
import Voronoi from "./components/Voronoi";
import {data} from "./data/data";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Voronoi data={data} width={400} height={400} />} />
          <Route path="finger" element={<FingerAreaPage />} />
          <Route path="abdominal" element={<AbdominalAreaPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



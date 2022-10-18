/** @format */

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/shared/Navbar/Navbar";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

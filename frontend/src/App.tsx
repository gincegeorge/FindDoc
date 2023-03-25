import "./App.css";
import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

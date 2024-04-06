import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/ui/header/Header";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Admin from "./pages/admin/Admin";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <section style={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </section>
      </Router>
      <Toaster />
    </>
  );
};

export default App;

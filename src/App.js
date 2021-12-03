import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="swarm" element={<FindSpace />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

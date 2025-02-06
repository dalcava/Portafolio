import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Control from "./pages/Control";
import Header from "./components/Header";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/control" element={<Control />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "./components/Nav/NavBar";
import Invoice from "./components/Invoicing/Invoice";
import Company from "./components/Company/Company";
import Partners from "./components/Partners/Partners";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <SideNav />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Invoice />} />
          <Route path="/company" element={<Company />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

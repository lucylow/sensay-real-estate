import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/components/LandingPage";

const SimpleApp = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  </BrowserRouter>
);

export default SimpleApp;

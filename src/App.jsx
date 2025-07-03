import React from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import BacktestPage from "@/pages/BacktestPage"; // 👈 Add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/backtest" element={<BacktestPage />} /> {/* 👈 Add this line */}
      </Routes>
    </Router>
  );
}

export default App;

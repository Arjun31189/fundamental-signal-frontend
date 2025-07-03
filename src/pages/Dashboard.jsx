// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import StockSearchCard from '../components/StockSearchCard';
import MacroIndicators from '../components/MacroIndicators';
import ActiveSignals from '../components/ActiveSignals';

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Intelligent F&O Signal Engine
        </h1>
        <p className="text-slate-600 text-lg mb-8">
          Generate live Buy Call/Put signals with fundamental, macro, and sentiment analysis.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <StockSearchCard onStockSelect={setSelectedStock} />
          <MacroIndicators />
        </div>

        <ActiveSignals selectedStock={selectedStock} />
      </div>
    </div>
  );
}

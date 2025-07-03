import React, { useState } from "react";
import { Search, Zap } from "lucide-react";

export default function StockSearchCard({ onStockSelect }) {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!symbol.trim()) return;
    setLoading(true);

    try {
      // Trigger parent callback
      onStockSelect(symbol.toUpperCase());
    } catch (err) {
      alert("❌ Failed to fetch signal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Stock Signal Generator</h2>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter stock symbol (e.g., RELIANCE)"
            className="pl-10 pr-4 py-3 w-full border border-slate-300 rounded-lg focus:outline-blue-500"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !symbol.trim()}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Generating..." : "Generate Signal"}
        </button>
      </div>
    </div>
  );
}

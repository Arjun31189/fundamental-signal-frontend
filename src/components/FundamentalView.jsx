import React, { useEffect, useState } from "react";
import { BarChart2 } from "lucide-react";

export default function FundamentalView({ symbol }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!symbol) return;

    setLoading(true);
    fetch(`/api/fundamentals?symbol=${symbol}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [symbol]);

  if (!symbol) return null;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-blue-600" />
        Fundamental Metrics
      </h2>

      {loading ? (
        <p className="text-slate-500 animate-pulse">Loading fundamentals for {symbol}...</p>
      ) : !data ? (
        <p className="text-slate-400">No fundamental data found for {symbol}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-700">
          <div><strong>P/E:</strong> {data.pe_ratio}</div>
          <div><strong>P/B:</strong> {data.pb_ratio}</div>
          <div><strong>EPS:</strong> {data.eps}</div>
          <div><strong>ROE:</strong> {data.roe}%</div>
          <div><strong>Market Cap:</strong> ₹{data.market_cap} Cr</div>
          <div><strong>Debt/Equity:</strong> {data.de_ratio}</div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";

export default function OptionChainViewer({ symbol, accessToken }) {
  const [chainData, setChainData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbol && accessToken) fetchOptionChain();
  }, [symbol]);

  const fetchOptionChain = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.upstox.com/v2/option/chain?symbol=${symbol}`, // Replace with correct endpoint
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      const json = await response.json();
      // Assume json.data.option_chain is the structure
      setChainData(json.data.option_chain || []);
    } catch (err) {
      console.error("Error fetching option chain", err);
      setChainData([]);
    }
    setLoading(false);
  };

  if (!symbol || !accessToken) return null;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">Live Option Chain</h2>
        <button
          onClick={fetchOptionChain}
          className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {chainData.length === 0 ? (
        <p className="text-slate-500 text-sm">No data available.</p>
      ) : (
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-blue-100 text-slate-700">
                <th>CALL LTP</th>
                <th>CALL IV</th>
                <th>CALL OI</th>
                <th>STRIKE</th>
                <th>PUT OI</th>
                <th>PUT IV</th>
                <th>PUT LTP</th>
              </tr>
            </thead>
            <tbody>
              {chainData.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-slate-50">
                  <td>{row.call_ltp}</td>
                  <td>{(row.call_iv * 100).toFixed(1)}%</td>
                  <td>{(row.call_oi / 1000).toFixed(0)}K</td>
                  <td className="font-bold bg-slate-100">{row.strike_price}</td>
                  <td>{(row.put_oi / 1000).toFixed(0)}K</td>
                  <td>{(row.put_iv * 100).toFixed(1)}%</td>
                  <td>{row.put_ltp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

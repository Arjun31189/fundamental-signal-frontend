import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

export default function ActiveSignals({ selectedStock }) {
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedStock) return;

    setLoading(true);
    fetch(`/api/signal?symbol=${selectedStock}`)
      .then((res) => {
        if (!res.ok) throw new Error("Signal not found");
        return res.json();
      })
      .then((data) => setSignal(data))
      .catch(() => setSignal(null))
      .finally(() => setLoading(false));
  }, [selectedStock]);

  const getIcon = (type) => {
    if (type === "CALL") return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (type === "PUT") return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <AlertCircle className="w-5 h-5 text-yellow-600" />;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-blue-600" />
        Signal Output
      </h2>

      {loading && (
        <div className="text-center text-slate-500 py-6 animate-pulse">
          Fetching signal for <b>{selectedStock}</b>...
        </div>
      )}

      {!loading && !signal && selectedStock && (
        <div className="text-center text-slate-400 py-6">
          ❌ No signal found for <b>{selectedStock}</b>. Try another stock.
        </div>
      )}

      {!loading && signal && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {getIcon(signal.signal_type)}
            <span className="text-lg font-semibold text-slate-700">{signal.signal_type} Option</span>
            <span className="text-sm text-slate-500">({signal.expiry_type})</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-700">
            <div><strong>Stock:</strong> {selectedStock}</div>
            <div><strong>Strike:</strong> ₹{signal.strike_price}</div>
            <div><strong>Entry:</strong> ₹{signal.entry_price}</div>
            <div><strong>Target:</strong> ₹{signal.take_profit}</div>
            <div><strong>Stop Loss:</strong> ₹{signal.stop_loss}</div>
            <div><strong>Delta:</strong> {signal.delta?.toFixed(2)}</div>
          </div>

          <div className="mt-3 pt-3 border-t text-sm text-slate-600">
            <strong>Reason:</strong> {signal.reasoning || "Model-based decision"}
          </div>
        </div>
      )}
    </div>
  );
}

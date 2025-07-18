import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Clock } from "lucide-react";

export default function SignalHistory() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/signals?status=Active")
      .then((res) => res.json())
      .then((data) => setSignals(data))
      .catch((err) => console.error("Error loading signal history:", err))
      .finally(() => setLoading(false));
  }, []);

  const getSignalIcon = (type) => {
    switch (type) {
      case "CALL": return <TrendingUp className="text-green-600 w-4 h-4" />;
      case "PUT": return <TrendingDown className="text-red-600 w-4 h-4" />;
      case "AVOID": return <AlertTriangle className="text-yellow-600 w-4 h-4" />;
      default: return <Clock className="text-slate-400 w-4 h-4" />;
    }
  };

  const getConfidenceClass = (score) => {
    if (score >= 80) return "bg-green-50 text-green-600";
    if (score >= 60) return "bg-yellow-50 text-yellow-600";
    return "bg-red-50 text-red-600";
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        Recent Signals
      </h2>

      {loading ? (
        <p className="text-slate-500 animate-pulse">Loading...</p>
      ) : signals.length === 0 ? (
        <p className="text-slate-400">No active signals found.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {signals.map((signal, i) => (
            <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 font-semibold">
                  {getSignalIcon(signal.signal_type)}
                  {signal.symbol} ({signal.signal_type})
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${getConfidenceClass(signal.confidence_score)}`}>
                  {signal.confidence_score}% Confidence
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-slate-600">
                <div><strong>Strike:</strong> ₹{signal.strike_price}</div>
                <div><strong>R:R:</strong> 1:{signal.risk_reward_ratio}</div>
                <div><strong>Target:</strong> ₹{signal.take_profit}</div>
                <div><strong>Stop:</strong> ₹{signal.stop_loss}</div>
                <div><strong>Delta:</strong> {signal.delta?.toFixed(2)}</div>
              </div>
              <div className="mt-2 pt-2 border-t text-xs text-slate-500">
                {signal.reasoning || "Generated by analysis pipeline"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

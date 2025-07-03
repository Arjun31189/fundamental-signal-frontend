import React, { useEffect, useState } from "react";
import { fetchBacktestResults } from "@/api/backtestApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BacktestResults({ symbol, fromDate, toDate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbol && fromDate && toDate) {
      fetchData();
    }
  }, [symbol, fromDate, toDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchBacktestResults(symbol, fromDate, toDate);
      setData(result);
    } catch (error) {
      console.error("Backtest error:", error);
    }
    setLoading(false);
  };

  if (!symbol) return null;

  return (
    <Card className="mt-6 shadow-lg bg-white">
      <CardHeader>
        <CardTitle>Backtest Results: {symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-slate-500">Loading backtest data...</p>
        ) : data?.summary ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Stat label="Signals Tested" value={data.summary.count} />
              <Stat label="Win Rate" value={`${data.summary.win_rate}%`} />
              <Stat label="Avg R:R" value={data.summary.avg_rr} />
              <Stat label="Net PnL" value={data.summary.net_pnl} />
              <Stat label="Wins" value={data.summary.wins} />
              <Stat label="Losses" value={data.summary.losses} />
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm border mt-4">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-2">Date</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Entry</th>
                    <th className="p-2">Exit</th>
                    <th className="p-2">PnL</th>
                    <th className="p-2">Hit</th>
                    <th className="p-2">R:R</th>
                  </tr>
                </thead>
                <tbody>
                  {data.details.map((row, i) => (
                    <tr key={i} className="text-center border-t">
                      <td className="p-2">{row.signal_date?.slice(0, 10)}</td>
                      <td className="p-2">
                        <Badge className={row.type === "CALL" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}>
                          {row.type}
                        </Badge>
                      </td>
                      <td className="p-2">₹{row.entry}</td>
                      <td className="p-2">₹{row.exit}</td>
                      <td className="p-2">{row.pnl}</td>
                      <td className="p-2">{row.hit.toUpperCase()}</td>
                      <td className="p-2">{row.rr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-slate-500">No backtest results found for this period.</p>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-bold text-slate-800 text-lg">{value}</div>
    </div>
  );
}

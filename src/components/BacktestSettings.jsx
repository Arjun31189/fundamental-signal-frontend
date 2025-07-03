import React, { useState } from "react";
import BacktestResults from "./BacktestResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BacktestSettings() {
  const [symbol, setSymbol] = useState("");
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-06-30");

  const [showResults, setShowResults] = useState(false);

  const handleRun = () => {
    if (!symbol.trim()) return;
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 border-0 shadow-md">
        <CardHeader>
          <CardTitle>Backtest Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Stock Symbol (e.g. RELIANCE)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <Button onClick={handleRun} className="bg-blue-600 text-white">
              Run Backtest
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <BacktestResults symbol={symbol} fromDate={fromDate} toDate={toDate} />
      )}
    </div>
  );
}

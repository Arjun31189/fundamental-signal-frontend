import React from "react";
import BacktestSettings from "@/components/BacktestSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BacktestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <Card className="bg-white/95 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Options Strategy Backtesting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Select a stock and date range to simulate signal performance
            </p>
          </CardContent>
        </Card>

        <BacktestSettings />
      </div>
    </div>
  );
}

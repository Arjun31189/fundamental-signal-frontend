import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Fuel, Building2, Globe } from "lucide-react";

export default function MacroIndicators() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/macro")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching macro data", err))
      .finally(() => setLoading(false));
  }, []);

  const indicators = data
    ? [
        {
          label: "Repo Rate",
          value: `${data.repo_rate}%`,
          icon: Building2,
          trend: "neutral",
          color: "bg-slate-500"
        },
        {
          label: "CPI Inflation",
          value: `${data.cpi_inflation}%`,
          icon: TrendingUp,
          trend: data.cpi_inflation > 5 ? "negative" : "positive",
          color: data.cpi_inflation > 5 ? "bg-red-500" : "bg-green-500"
        },
        {
          label: "USD/INR",
          value: `${data.usd_inr}`,
          icon: DollarSign,
          trend: "neutral",
          color: "bg-blue-500"
        },
        {
          label: "Brent Crude",
          value: `$${data.brent_crude}`,
          icon: Fuel,
          trend: "neutral",
          color: "bg-orange-500"
        },
        {
          label: "FII Activity",
          value: `${data.fii_activity} Cr`,
          icon: Globe,
          trend: data.fii_activity > 0 ? "positive" : "negative",
          color: data.fii_activity > 0 ? "bg-green-500" : "bg-red-500"
        },
        {
          label: "DII Activity",
          value: `${data.dii_activity} Cr`,
          icon: Building2,
          trend: data.dii_activity > 0 ? "positive" : "negative",
          color: data.dii_activity > 0 ? "bg-green-500" : "bg-red-500"
        }
      ]
    : [];

  return (
    <div className="p-6">
      {loading ? (
        <div>Loading macro indicators...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {indicators.map((indicator, idx) => (
            <div
              key={indicator.label}
              className={`flex items-center p-4 rounded-lg shadow ${indicator.color}`}
            >
              <indicator.icon className="w-8 h-8 mr-4" />
              <div>
                <div className="text-lg font-semibold">{indicator.label}</div>
                <div className="text-2xl">{indicator.value}</div>
                <div className={`text-sm ${
                  indicator.trend === "positive"
                    ? "text-green-200"
                    : indicator.trend === "negative"
                    ? "text-red-200"
                    : "text-slate-200"
                }`}>
                  {indicator.trend === "positive" && <TrendingUp className="inline w-4 h-4" />}
                  {indicator.trend === "negative" && <TrendingDown className="inline w-4 h-4" />}
                  {indicator.trend.charAt(0).toUpperCase() + indicator.trend.slice(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    );
  }

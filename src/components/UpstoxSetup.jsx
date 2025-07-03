import React, { useState, useEffect } from "react";
import { Key, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function UpstoxSetup({ onConfigured }) {
  const [apiKey, setApiKey] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [status, setStatus] = useState("not_configured");

  useEffect(() => {
    const savedKey = localStorage.getItem("upstox_api_key");
    const savedToken = localStorage.getItem("upstox_access_token");
    if (savedKey && savedToken) {
      setApiKey(savedKey);
      setAccessToken(savedToken);
      setStatus("configured");
    }
  }, []);

  const handleSave = () => {
    if (!apiKey || !accessToken) return;

    localStorage.setItem("upstox_api_key", apiKey);
    localStorage.setItem("upstox_access_token", accessToken);
    setStatus("configured");
    if (onConfigured) onConfigured(apiKey, accessToken);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "configured":
        return (
          <span className="flex items-center text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Connected
          </span>
        );
      case "error":
        return (
          <span className="flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            Error
          </span>
        );
      default:
        return (
          <span className="flex items-center text-slate-500 text-sm">
            <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            Not Configured
          </span>
        );
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Key className="w-5 h-5 text-blue-600" />
          Upstox API Setup
        </h2>
        {getStatusBadge()}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">API Key *</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded-lg border-slate-300"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Upstox API key"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Access Token *</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded-lg border-slate-300"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="Enter your Upstox access token"
          />
        </div>
        <button
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          onClick={handleSave}
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}

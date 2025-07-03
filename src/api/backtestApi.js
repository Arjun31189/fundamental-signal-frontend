export async function fetchBacktestResults(symbol, fromDate, toDate) {
  const url = `/api/backtest?symbol=${symbol}&from_date=${fromDate}&to_date=${toDate}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch backtest data");
  }
  return await response.json();
}

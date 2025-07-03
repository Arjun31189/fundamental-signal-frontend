export async function fetchSignal(symbol) {
  const response = await fetch(`/api/signal?symbol=${symbol}`);
  if (!response.ok) {
    throw new Error("Failed to generate signal");
  }
  return await response.json();
}

export async function fetchActiveSignals() {
  const response = await fetch("/api/signal/active");
  if (!response.ok) {
    throw new Error("Failed to fetch active signals");
  }
  return await response.json();
}

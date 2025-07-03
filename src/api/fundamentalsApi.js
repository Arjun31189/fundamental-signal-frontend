export async function fetchFundamentals(symbol) {
  const response = await fetch(`/api/fundamentals?symbol=${symbol}`);
  if (!response.ok) {
    throw new Error("Failed to fetch fundamentals");
  }
  return await response.json();
}

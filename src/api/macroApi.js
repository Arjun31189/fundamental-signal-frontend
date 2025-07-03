export async function fetchMacroData() {
  const response = await fetch("/api/macro");
  if (!response.ok) {
    throw new Error("Failed to fetch macro data");
  }
  return await response.json();
}

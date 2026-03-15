// src/api/faultsApi.js
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function getFaultsApi() {
  const res = await fetch(`${baseURL}/faults`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch faults");
  return res.json(); // array of faults
}

export async function createFaultApi(payload) {
  const res = await fetch(`${baseURL}/faults`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create fault");
  return res.json();
}

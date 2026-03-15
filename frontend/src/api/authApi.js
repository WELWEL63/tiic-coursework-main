// src/api/authApi.js
// TODO: replace baseURL with your Express backend URL.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function loginApi({ username, password }) {
  // POST /auth/login
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // for cookies/JWT
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // expected { username, role, token? }
}

// src/api/usersApi.js
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function getUsersApi() {
  const res = await fetch(`${baseURL}/users`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createUserApi(payload) {
  const res = await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function updateUserApi(id, payload) {
  const res = await fetch(`${baseURL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function deleteUserApi(id) {
  const res = await fetch(`${baseURL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}

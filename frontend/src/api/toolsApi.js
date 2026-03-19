// src/api/toolsApi.js

// In‑memory dummy data (reset on page reload)
let tools = [
  {
    id: "t-1",
    name: "Torque Wrench",
    status: "available", // "available" | "checked-out" | "missing"
    lastSeenAt: "Depot A",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "t-2",
    name: "Thermal Camera",
    status: "checked-out",
    lastSeenAt: "Train 14 – Bay 3",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "t-3",
    name: "Voltage Tester",
    status: "available",
    lastSeenAt: "Workshop 2",
    lastUpdated: new Date().toISOString(),
  },
];

let idCounter = 4;

// Small helper to simulate network delay
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simulate occasional error (optional, you can remove this)
function maybeThrowError(probability = 0.0) {
  if (Math.random() < probability) {
    const err = new Error("Simulated network error");
    err.code = "NETWORK_ERROR";
    throw err;
  }
}

/**
 * Get all tools
 * Later: GET /api/tools
 */
export async function getTools() {
  await delay();
  // maybeThrowError(0.05);
  return [...tools];
}

/**
 * Create a new tool
 * Later: POST /api/tools
 */
export async function createTool(payload) {
  await delay();
  // maybeThrowError(0.05);

  const now = new Date().toISOString();
  const newTool = {
    id: `t-${idCounter++}`,
    name: payload.name ?? "Unnamed tool",
    status: payload.status ?? "available",
    lastSeenAt: payload.lastSeenAt ?? "Unspecified",
    lastUpdated: now,
  };

  tools.push(newTool);
  return newTool;
}

/**
 * Update tool status / info
 * Later: PATCH /api/tools/:id
 */
export async function updateTool(id, updates) {
  await delay();
  // maybeThrowError(0.05);

  const index = tools.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error("Tool not found");
    err.code = "NOT_FOUND";
    throw err;
  }

  const now = new Date().toISOString();
  tools[index] = {
    ...tools[index],
    ...updates,
    lastUpdated: now,
  };

  return tools[index];
}

/**
 * Delete a tool
 * Later: DELETE /api/tools/:id
 */
export async function deleteTool(id) {
  await delay();
  // maybeThrowError(0.05);

  const index = tools.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error("Tool not found");
    err.code = "NOT_FOUND";
    throw err;
  }

  const [removed] = tools.splice(index, 1);
  return removed;
}

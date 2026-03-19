// src/pages/ToolCheckPage.jsx
import React, { useEffect, useState } from "react";
import ToolScanner from "../components/ToolScanner.jsx";
import {
  getTools,
  createTool,
  updateTool,
  deleteTool,
} from "../api/toolsApi.js";

// As a maintenance engineer, I can scan tools and also see a tracked list (dummy API).
function ToolCheckPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tools from dummy API
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getTools();
        setTools(data);
      } catch (err) {
        setError(err.message || "Failed to load tools.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const markMissing = async (id) => {
    try {
      const updated = await updateTool(id, { status: "missing" });
      setTools((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert(err.message || "Failed to update tool.");
    }
  };

  const addDummyTool = async () => {
    const newTool = await createTool({
      name: "New Demo Tool",
      status: "available",
      lastSeenAt: "Demo Area",
    });
    setTools((prev) => [...prev, newTool]);
  };

  return (
    <div className="page tools-page">
      <h2>Tool Check</h2>
      <p>
        Scan and verify your tools before starting maintenance tasks. This helps
        ensure all required equipment is present and reduces the risk of tools
        being lost.
      </p>

      {/* Camera scanner (your original component) */}
      <div className="tool-scanner">
        <ToolScanner />
      </div>

      {/* Optional: dummy tools list below the scanner */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Tracked tools (demo data)</h3>
        {loading && <p>Loading tools…</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <button onClick={addDummyTool}>Add demo tool</button>
            <ul className="tool-checklist">
              {tools.map((tool) => (
                <li key={tool.id}>
                  {tool.name} – {tool.status} ({tool.lastSeenAt}){" "}
                  <button
                    className="secondary-btn"
                    onClick={() => markMissing(tool.id)}
                  >
                    Mark missing
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default ToolCheckPage;

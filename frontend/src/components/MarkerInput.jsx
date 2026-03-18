// src/components/MarkerInput.jsx
import React from "react";

// Simple, reusable marker input for simulated ArUco IDs.
function MarkerInput({ markerId, onChange }) {
  return (
    <div className="marker-panel" style={{ marginTop: "0.75rem" }}>
      <label>
        Simulated ArUco Marker ID
        <input
          type="number"
          value={markerId ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
          placeholder="e.g. 101"
        />
      </label>
      <p className="marker-help">
        In a real system, this marker ID would be detected from the AR marker
        in the camera view and used as the anchor for faults on this surface.
      </p>
    </div>
  );
}

export default MarkerInput;

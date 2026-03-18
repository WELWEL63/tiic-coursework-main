// src/components/MarkerStatus.jsx
import React from "react";

function MarkerStatus({ markerId }) {
  return (
    <div className="marker-panel" style={{ marginTop: "0.75rem" }}>
      <p>
        Currently detected marker:{" "}
        <strong>{markerId != null ? markerId : "Scanning..."}</strong>
      </p>
    </div>
  );
}

export default MarkerStatus;

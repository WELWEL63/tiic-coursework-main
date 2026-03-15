import React from "react";

function FaultList({ faults }) {
  return (
    <div className="fault-list">
      <h3>Existing Faults</h3>
      {faults.length === 0 ? (
        <p>No faults recorded yet.</p>
      ) : (
        <ul>
          {faults.map((fault) => (
            <li key={fault.id}>
              <strong>{fault.title}</strong> – {fault.severity.toUpperCase()} –{" "}
              {fault.status || "open"} – Marker:{" "}
              {fault.markerId ? `#${fault.markerId}` : "none"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FaultList;

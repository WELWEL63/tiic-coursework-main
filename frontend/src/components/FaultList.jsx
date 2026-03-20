import React from "react";

function FaultList({ faults }) {
  // Helper function to pick the right color class based on severity
  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case "high": return "badge-high";
      case "medium": return "badge-medium";
      case "low": return "badge-low";
      default: return "badge-medium";
    }
  };

  return (
    <div className="fault-list">
      <h3 style={{ marginTop: "2rem" }}>Existing Faults</h3>
      
      {faults.length === 0 ? (
        <p style={{ color: "#6b7280", fontStyle: "italic" }}>No faults recorded yet.</p>
      ) : (
        <div className="ticket-container">
          {faults.map((fault) => (
            <div className="ticket-card" key={fault.id}>
              {/* Top Row: Title & Status */}
              <div className="ticket-header">
                <h4 className="ticket-title">{fault.title}</h4>
                <span className="badge badge-open">{fault.status || "Open"}</span>
              </div>
              
              {/* Middle Row: Description */}
              {fault.description && (
                <p className="ticket-desc">{fault.description}</p>
              )}
              
              {/* Bottom Row: Severity Badge & Marker ID */}
              <div className="ticket-footer">
                <div className="ticket-tags">
                  <span className={`badge ${getSeverityClass(fault.severity)}`}>
                    {fault.severity}
                  </span>
                </div>
                <div className="ticket-marker">
                  📍 Marker: <strong>{fault.markerId ? `#${fault.markerId}` : "None"}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FaultList;
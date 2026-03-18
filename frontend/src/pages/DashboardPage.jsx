import React from "react";

// Placeholder for FR17–FR18 (fault and maintenance data visualisation).[file:6]
function DashboardPage() {
  return (
    <div className="page dashboard-page">
      <h2>Maintenance Dashboard</h2>
      <p>Overview of faults, repairs and tool activity (prototype view).</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">Fault statistics (placeholder)</div>
        <div className="dashboard-card">Tool usage (placeholder)</div>
        <div className="dashboard-card">Alerts & unusual activity (placeholder)</div>
      </div>
    </div>
    );
}

export default DashboardPage;

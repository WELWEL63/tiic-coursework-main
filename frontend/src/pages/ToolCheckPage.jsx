import React from "react";
import ToolScanner from "../components/ToolScanner.jsx";

// Simple user story: As a maintenance engineer, I want to scan and tick off
// my tools before starting a job so that I can make sure I have all required equipment.[file:6]
function ToolCheckPage() {
  return (
    <div className="page tools-page">
      <h2>Tool Check</h2>
      <p>
        Scan and verify your tools before starting maintenance tasks. This helps
        ensure all required equipment is present and reduces the risk of tools
        being lost.
      </p>
      <ToolScanner />
    </div>
  );
}

export default ToolCheckPage;

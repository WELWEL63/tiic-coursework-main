import React from "react";

function BrandLogo() {
  return (
    <div className="login-logo">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        color="#024a5f"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <h1
        style={{
          margin: 0,
          color: "#024a5f",
          fontSize: "1.5rem",
          fontWeight: 700,
        }}
      >
        Inspectra
      </h1>
    </div>
  );
}

export default BrandLogo;

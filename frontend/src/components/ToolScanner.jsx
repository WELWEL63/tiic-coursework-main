import React, { useEffect, useRef, useState } from "react";

const INITIAL_TOOLS = [
  { id: 1, name: "Torque Wrench", required: true, scanned: false },
  { id: 2, name: "Voltage Tester", required: true, scanned: false },
  { id: 3, name: "Inspection Camera", required: false, scanned: false },
];

// Simulates overview tool flow: start scan, wait, checklist result. [file:17]
function ToolScanner() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let stream;
    async function enableCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error(err);
        setError("Unable to access camera.");
      }
    }
    enableCamera();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startToolScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // In a real app, here we would use CV to recognise tools from the frame. [file:17]
          // For now, we simulate that all required tools are detected.
          setTools((prevTools) =>
            prevTools.map((t) =>
              t.required ? { ...t, scanned: true } : t
            )
          );
          setIsScanning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const requiredCount = tools.filter((t) => t.required).length;
  const scannedRequired = tools.filter((t) => t.required && t.scanned).length;

  return (
    <div className="tool-scanner">
      <div className="tool-scanner-header">
        <h3>Tool Check</h3>
      </div>

      {error && <p className="error-text">{error}</p>}

      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: "8px",
          border: "2px solid #0b3d91",
          background: "#000",
        }}
      />

      <p style={{ marginTop: "0.5rem" }}>
        Place your tools in view, then start the scan. The prototype simulates
        automatic detection of required tools. [file:17]
      </p>

      <button onClick={startToolScan} disabled={isScanning}>
        {isScanning ? `Scanning... ${countdown}` : "Start tool scan"}
      </button>

      <div className="tool-summary" style={{ marginTop: "0.5rem" }}>
        <strong>
          Required tools scanned: {scannedRequired} / {requiredCount}
        </strong>
      </div>

      <ul className="tool-checklist">
        {tools.map((tool) => (
          <li key={tool.id}>
            <div>
              <strong>{tool.name}</strong>{" "}
              {tool.required && <span>(required)</span>}
            </div>
            <div>Status: {tool.scanned ? "Scanned" : "Not scanned"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToolScanner;

// src/components/ArScanner.jsx
import React, { useRef } from "react";
import CameraFeed from "./CameraFeed.jsx";
import MarkerInput from "./MarkerInput.jsx";

function ArScanner({ selectedMarkerId, onMarkerChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Receive refs from CameraFeed
  const handleCameraReady = ({ videoRef: vRef, canvasRef: cRef }) => {
    videoRef.current = vRef.current;
    canvasRef.current = cRef.current;
  };

  const drawHighlightBox = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Ensure video dimensions are available
    if (!video.videoWidth || !video.videoHeight) {
      setTimeout(drawHighlightBox, 200);
      return;
    }

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const boxWidth = canvas.width / 3;
    const boxHeight = canvas.height / 3;
    const x = (canvas.width - boxWidth) / 2;
    const y = (canvas.height - boxHeight) / 2;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, boxWidth, boxHeight);
  };

  const clearOverlay = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="ar-scanner">
      {/* Camera feed with overlay canvas */}
      <CameraFeed onReady={handleCameraReady} />

      {/* Demo controls for overlay */}
      <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={drawHighlightBox}>Highlight area (demo)</button>
        <button onClick={clearOverlay}>Clear overlay</button>
      </div>

      {/* Marker input for simulated ArUco ID */}
      <MarkerInput markerId={selectedMarkerId} onChange={onMarkerChange} />
    </div>
  );
}

export default ArScanner;

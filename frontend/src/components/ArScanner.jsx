// src/components/ArScanner.jsx
import React, { useRef } from "react";
import CameraFeed from "./CameraFeed.jsx";
import MarkerOverlay from "./MarkerOverlay.jsx";
import MarkerStatus from "./MarkerStatus.jsx";

/**
 * ArScanner
 * - Uses CameraFeed to show camera and canvas
 * - Uses MarkerOverlay to detect markers and draw red outlines
 * - Shows MarkerStatus based on selectedMarkerId
 */
function ArScanner({ selectedMarkerId, onMarkerChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleCameraReady = ({ videoRef: vRef, canvasRef: cRef }) => {
    videoRef.current = vRef.current;
    canvasRef.current = cRef.current;
  };

  return (
    <div className="ar-scanner">
      {/* Camera + canvas */}
      <CameraFeed onReady={handleCameraReady} />

      {/* AR detection overlay */}
      <MarkerOverlay
        videoRef={videoRef}
        canvasRef={canvasRef}
        onMarkerChange={onMarkerChange}
      />

      {/* Status text */}
      <MarkerStatus markerId={selectedMarkerId} />
    </div>
  );
}

export default ArScanner;

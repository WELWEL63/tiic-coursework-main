// src/components/MarkerOverlay.jsx
import React, { useEffect } from "react";
import { AR } from "js-aruco";



/**
 * MarkerOverlay
 * - Takes video+canvas refs
 * - Runs js-aruco detection loop
 * - Draws red outlines on detected markers
 * - Calls onMarkerChange(markerId | null)
 */
function MarkerOverlay({ videoRef, canvasRef, onMarkerChange }) {
  useEffect(() => {
    let animationFrameId;

    const scanFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // draw current frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        try {
          const detector = new AR.Detector();
          const markers = detector.detect(imageData);

          if (markers.length > 0) {
            const newId = markers[0].id;
            onMarkerChange && onMarkerChange(newId);

            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ff0000";
            ctx.beginPath();

            markers.forEach((marker) => {
              const corners = marker.corners;
              ctx.moveTo(corners[0].x, corners[0].y);
              ctx.lineTo(corners[1].x, corners[1].y);
              ctx.lineTo(corners[2].x, corners[2].y);
              ctx.lineTo(corners[3].x, corners[3].y);
              ctx.closePath();
            });

            ctx.stroke();
          } else {
            onMarkerChange && onMarkerChange(null);
          }
        } catch (err) {
          console.error("AR detection error:", err);
        }
      }

      animationFrameId = requestAnimationFrame(scanFrame);
    };

    scanFrame();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [videoRef, canvasRef, onMarkerChange]);

  return null; // purely logic, no UI
}

export default MarkerOverlay;

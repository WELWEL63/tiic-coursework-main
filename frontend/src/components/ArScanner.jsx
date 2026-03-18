import React, { useEffect, useRef, useState } from "react";
import { AR } from "js-aruco";

function ArScanner({ selectedMarkerId, onMarkerChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);

  // Get camera devices
  useEffect(() => {
    async function loadDevices() {
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        const cams = all.filter((d) => d.kind === "videoinput");
        setDevices(cams);
      } catch (err) {
        console.error(err);
        setError("Unable to list cameras.");
      }
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
        loadDevices();
      })
      .catch((err) => {
        console.error(err);
        setError("Allow camera access to use AR view.");
      });
  }, []);

  // Start selected camera
  useEffect(() => {
    let currentStream;

    async function startFromDevice() {
      if (!devices.length) return;
      const device = devices[currentDeviceIndex];

      try {
        setError("");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: device.deviceId } },
          audio: false,
        });
        currentStream = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // FIX: Catch the harmless React Strict Mode AbortError so it stops flooding the console
          videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.error(err);
        setError("Unable to start selected camera.");
      }
    }

    startFromDevice();

    return () => {
      if (currentStream) currentStream.getTracks().forEach((t) => t.stop());
    };
  }, [devices, currentDeviceIndex]);

  // The AR Scanning Loop
  useEffect(() => {
    let animationFrameId;

    const scanFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video to the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // --- NEW AR DETECTION LOGIC ---
        try {
          const detector = new AR.Detector();
          const markers = detector.detect(imageData);

          if (markers.length > 0) {
            onMarkerChange(markers[0].id); // Update ID when found

            // --- VISUAL DEBUGGING: Draw a red box ---
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ff0000";
            ctx.beginPath();
            markers.forEach(marker => {
              ctx.moveTo(marker.corners[0].x, marker.corners[0].y);
              ctx.lineTo(marker.corners[1].x, marker.corners[1].y);
              ctx.lineTo(marker.corners[2].x, marker.corners[2].y);
              ctx.lineTo(marker.corners[3].x, marker.corners[3].y);
              ctx.closePath();
              ctx.stroke();
            });
          } else {
            // NEW FIX: Clear the ID if the screen is empty!
            onMarkerChange(null);
          }
        } catch (err) {
          console.error("AR Error:", err); 
        }
        // ------------------------------
      }
      animationFrameId = requestAnimationFrame(scanFrame);
    };

    scanFrame();

    return () => cancelAnimationFrame(animationFrameId);
  }, [onMarkerChange]); // FIX: Added onMarkerChange to dependency array

  const handleSwitchCamera = () => {
    if (!devices.length) return;
    setCurrentDeviceIndex((prev) => (prev + 1) % devices.length);
  };

  return (
    <div className="ar-scanner">
      <div className="ar-scanner-header">
        <h3>Camera & Marker</h3>
        {devices.length > 1 && (
          <button onClick={handleSwitchCamera}>
            Switch camera ({currentDeviceIndex + 1}/{devices.length})
          </button>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      <div style={{ position: "relative", width: "100%", maxWidth: "480px", margin: "0 auto" }}>
        {/* We hide the actual video element, and ONLY show the Canvas now! */}
        <video
          ref={videoRef}
          playsInline
          muted
          style={{ display: "none" }}
        />
        
        {/* The Canvas is now our main display, showing the video + the AR drawings */}
        <canvas 
          ref={canvasRef} 
          style={{ width: "100%", borderRadius: "8px", border: "2px solid #024a5f", background: "#000" }} 
        />
      </div>

      <div className="marker-panel">
        <p>Currently Detected Marker: <strong>{selectedMarkerId || "Scanning..."}</strong></p>
      </div>
    </div>
  );
}

export default ArScanner;
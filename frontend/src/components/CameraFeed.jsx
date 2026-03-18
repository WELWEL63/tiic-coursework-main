// src/components/CameraFeed.jsx
import React, { useEffect, useRef, useState } from "react";

function CameraFeed({ onReady }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);

  // Expose refs and camera switch helper to parent
  useEffect(() => {
    if (onReady) {
      onReady({
        videoRef,
        canvasRef,
        getCurrentDeviceIndex: () => currentDeviceIndex,
        setCurrentDeviceIndex,
      });
    }
  }, [onReady, currentDeviceIndex]);

  // Get camera devices once
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

  // Start selected camera whenever device index changes
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
          // Avoid noisy AbortError in StrictMode
          videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.error(err);
        setError("Unable to start selected camera.");
      }
    }

    startFromDevice();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [devices, currentDeviceIndex]);

  const handleSwitchCamera = () => {
    if (!devices.length) return;
    setCurrentDeviceIndex((prev) => (prev + 1) % devices.length);
  };

  return (
    <div>
      <div
        className="ar-scanner-header"
        style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}
      >
        <h3>Camera & Marker</h3>
        {devices.length > 1 && (
          <button onClick={handleSwitchCamera}>
            Switch camera ({currentDeviceIndex + 1}/{devices.length})
          </button>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        {/* Hidden video: input for AR detection */}
        <video
          ref={videoRef}
          playsInline
          muted
          style={{ display: "none" }}
        />

        {/* Visible canvas: video frame + overlays */}
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            borderRadius: "8px",
            border: "2px solid #024a5f",
            background: "#000",
          }}
        />
      </div>
    </div>
  );
}

export default CameraFeed;

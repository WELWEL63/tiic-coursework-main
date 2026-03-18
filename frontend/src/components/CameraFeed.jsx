// src/components/CameraFeed.jsx
import React, { useEffect, useRef, useState } from "react";

function CameraFeed({ onReady }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);

  // Expose refs to parent (ArScanner) if needed
  useEffect(() => {
    if (onReady) {
      onReady({ videoRef, canvasRef });
    }
  }, [onReady]);

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
          await videoRef.current.play();
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

  const handleSwitchCamera = () => {
    if (!devices.length) return;
    setCurrentDeviceIndex((prev) => (prev + 1) % devices.length);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between mb-2"
        style={{ gap: "0.5rem" }}
      >
        <h3>Camera</h3>
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
          display: "inline-block",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          style={{
            width: "100%",
            borderRadius: "8px",
            border: "2px solid #0b3d91",
            background: "#000",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

export default CameraFeed;

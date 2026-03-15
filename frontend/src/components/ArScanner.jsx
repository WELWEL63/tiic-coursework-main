import React, { useEffect, useRef, useState } from "react";

function ArScanner({ selectedMarkerId, onMarkerChange }) {
  const videoRef = useRef(null);
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

      <div className="marker-panel">
        <label>
          Simulated ArUco Marker ID
          <input
            type="number"
            value={selectedMarkerId ?? ""}
            onChange={(e) => onMarkerChange(e.target.value || null)}
            placeholder="e.g. 101"
          />
        </label>
        <p className="marker-help">
          In a real system, this marker ID would be detected from the AR marker
          (ArUco) in the camera view and used as the anchor for faults on this
          surface.[file:17]
        </p>
      </div>
    </div>
  );
}

export default ArScanner;

import React, { useEffect, useState } from "react";
import ArScanner from "../components/ArScanner.jsx";
import FaultForm from "../components/FaultForm.jsx";
import FaultList from "../components/FaultList.jsx";
import { getFaultsApi } from "../api/faultsApi.js";

// Matches initial overview fault flow: mark fault with camera, attach to marker, store ticket. [file:17]
function ArMaintenancePage() {
  const [markerId, setMarkerId] = useState(null);
  const [faults, setFaults] = useState([]);

  useEffect(() => {
    // TODO: uncomment when backend exists
    // getFaultsApi()
    //   .then(setFaults)
    //   .catch((err) => console.error(err));
  }, []);

  const handleFaultCreated = (fault) => {
    setFaults((prev) => [...prev, fault]);
  };

  return (
    <div className="page ar-page">
      <h2>AR Maintenance</h2>
      <p>
        Scan the environment and bind faults to simulated ArUco marker IDs. A
        second engineer can later view faults attached to the same marker. [file:17]
      </p>

      <section className="ar-section">
        <ArScanner selectedMarkerId={markerId} onMarkerChange={setMarkerId} />
      </section>

      <section className="fault-section">
        <FaultForm markerId={markerId} onCreated={handleFaultCreated} />
        <FaultList faults={faults} />
      </section>
    </div>
  );
}

export default ArMaintenancePage;

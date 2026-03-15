import React, { useState } from "react";
import { createFaultApi } from "../api/faultsApi.js";

// markerId is the simulated anchor; when present, attach to fault. [file:17]
function FaultForm({ markerId, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "medium",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      severity: form.severity,
      markerId: markerId ? Number(markerId) : null,
    };

    try {
      // TODO: uncomment when backend exists:
      // const created = await createFaultApi(payload);
      // onCreated && onCreated(created);
      console.log("Create fault (mock)", payload);
      onCreated && onCreated({ id: Date.now().toString(), ...payload, status: "open" });

      setForm({ title: "", description: "", severity: "medium" });
    } catch (err) {
      console.error(err);
      setError("Failed to create fault.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="fault-form" onSubmit={handleSubmit}>
      <h3>Create / Annotate Fault</h3>

      <p className="marker-binding">
        Current marker anchor:{" "}
        {markerId ? <strong>#{markerId}</strong> : "None (fault not bound to a marker yet)"}
      </p>

      <label>
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Severity
        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Fault"}
      </button>
    </form>
  );
}

export default FaultForm;

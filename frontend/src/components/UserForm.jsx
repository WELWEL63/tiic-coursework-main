// src/components/UserForm.jsx
import React, { useEffect, useState } from "react";

// mode: "create" or "edit"
function UserForm({ mode = "create", initialUser, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "MaintenanceEngineer",
    password: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialUser) {
      setForm({
        name: initialUser.name,
        email: initialUser.email,
        role: initialUser.role,
        password: "",
      });
    }
  }, [mode, initialUser]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For edit, password may be empty = no change.
    onSubmit(form);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3>{mode === "create" ? "Create User" : "Update User"}</h3>

      <label>
        Full name
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Role
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="MaintenanceEngineer">Maintenance Engineer</option>
          <option value="MaintenanceTechnician">Maintenance Technician</option>
          <option value="SecurityAnalyst">Security Analyst</option>
          <option value="SecurityAdministrator">Security Administrator</option>
          <option value="DataAnalyst">Data Analyst</option>
          <option value="AuthorisedPersonnel">Authorised Personnel</option>
          <option value="SystemAdministrator">System Administrator</option>
        </select>
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={mode === "edit" ? "Leave blank to keep current" : ""}
          required={mode === "create"}
        />
      </label>

      <div className="user-form-actions">
        <button type="submit">
          {mode === "create" ? "Create" : "Save changes"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="secondary-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;

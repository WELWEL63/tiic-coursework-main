import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Supports secure login user story (US14) and FR14/FR15 when wired to backend. [file:6]
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const ok = await login(form);
    if (ok) {
      navigate("/ar");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <h1>AR Maintenance Support System</h1>
      </header>

      <main className="login-center">
        <div className="login-card">
          <div className="login-logo">
            {/* Replace with <img src="/logo.png" alt="Logo" /> when you have a real logo */}
            <div className="login-logo-circle">AR</div>
          </div>

          <h2>Sign in</h2>
          <p className="login-subtitle">
            Sign in to access AR maintenance, tool checks and dashboards.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Username
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

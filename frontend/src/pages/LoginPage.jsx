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
              
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h1 style={{ margin: 0,color: '#024a5f', fontSize: '1.5rem' }}>Inspectra </h1>
        </div>

<p className="mt-3 text-xs text-slate-400 text-center">
  Don’t have an account?{" "}
  <a
    href="/signup"
    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
  >
    Sign up
  </a>
</p>

            
          
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

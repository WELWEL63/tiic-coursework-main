import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import BrandLogo from "../components/BrandLogo.jsx";
import "../styles/SignupPage.css";

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
    <div className="signup-page">
      <header className="signup-header">
        <h1 className="signup-header-title">
          AR Maintenance Support System
        </h1>
        <p className="signup-header-subtitle">
          Secure access for authorised maintenance staff.
        </p>
      </header>

      <main className="signup-main">
        <div className="signup-card" aria-labelledby="login-title">
          <BrandLogo />

          <h2 id="login-title" className="signup-card-title">
            Log in
          </h2>
          <p className="signup-card-subtitle">
            Sign in to access AR maintenance, tool checks and dashboards.
          </p>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label className="signup-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="signup-input"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="signup-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="signup-input"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="signup-error">{error}</p>}

            <button type="submit" className="signup-submit">
              Login
            </button>
          </form>

          <p className="signup-footer">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-footer-link">
              Sign up? 
            </Link>  {""}
        
         
  Forgot your password?{" "}
  <Link to="/forgot-password" className="signup-footer-link">
    Reset it
  </Link>
</p>
          <p className="signup-footer">
            Powered by Group (need an ngroup namehere)
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

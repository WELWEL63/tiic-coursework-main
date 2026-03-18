import React, { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo.jsx";
import "../styles/SignupPage.css";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") || "";
  const emailFromQuery = searchParams.get("email") || "";

  const [form, setForm] = useState({
    email: emailFromQuery,
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Reset link is missing or invalid.");
      return;
    }

    // FRONTEND ONLY: simulate backend call
    await new Promise((r) => setTimeout(r, 400));
    setStatus("Password reset successful. You can now log in.");
    setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <h1 className="signup-header-title">
          AR Maintenance Support System
        </h1>
        <p className="signup-header-subtitle">
          Set a new password for your account.
        </p>
      </header>

      <main className="signup-main">
        <div className="signup-card" aria-labelledby="reset-title">
          <BrandLogo />

          <h2 id="reset-title" className="signup-card-title">
            Reset password
          </h2>
          <p className="signup-card-subtitle">
            Choose a strong password that you don&apos;t use elsewhere.
          </p>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label
                className="signup-label"
                htmlFor="reset-email-field"
              >
                Work email
              </label>
              <input
                id="reset-email-field"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="signup-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="signup-label" htmlFor="new-password">
                New password
              </label>
              <input
                id="new-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="signup-input"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label
                className="signup-label"
                htmlFor="confirm-new-password"
              >
                Confirm new password
              </label>
              <input
                id="confirm-new-password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="signup-input"
                autoComplete="new-password"
              />
            </div>

            {error && <p className="signup-error">{error}</p>}
            {status && (
              <p className="signup-error" style={{ color: "#22c55e" }}>
                {status}
              </p>
            )}

            <button type="submit" className="signup-submit">
              Update password
            </button>
          </form>

          <p className="signup-footer">
            Back to{" "}
            <Link to="/login" className="signup-footer-link">
              login
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

export default ResetPasswordPage;

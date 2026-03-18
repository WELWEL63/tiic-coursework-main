import React, { useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo.jsx";
import "../styles/SignupPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // FRONTEND ONLY: simulate backend call
    await new Promise((r) => setTimeout(r, 400));
    setStatus(
      "If an account exists for this email, a reset link has been sent."
    );
    setEmail("");
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <h1 className="signup-header-title">
          AR Maintenance Support System
        </h1>
        <p className="signup-header-subtitle">
          Password reset for authorised users.
        </p>
      </header>

      <main className="signup-main">
        <div className="signup-card" aria-labelledby="forgot-title">
          <BrandLogo />

          <h2 id="forgot-title" className="signup-card-title">
            Forgot password
          </h2>
          <p className="signup-card-subtitle">
            Enter your work email and we&apos;ll send a reset link if an
            account exists.
          </p>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label className="signup-label" htmlFor="reset-email">
                Work email
              </label>
              <input
                id="reset-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup-input"
                autoComplete="email"
              />
            </div>

            {error && <p className="signup-error">{error}</p>}
            {status && (
              <p className="signup-error" style={{ color: "#22c55e" }}>
                {status}
              </p>
            )}

            <button type="submit" className="signup-submit">
              Send reset link
            </button>
          </form>

          <p className="signup-footer">
            Remembered your password?{" "}
            <Link to="/login" className="signup-footer-link">
              Back to login
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

export default ForgotPasswordPage;

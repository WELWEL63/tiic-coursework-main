import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/SignupPage.css";


function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const ok = await login({
      username: form.username || form.email,
      password: form.password,
    });

    if (ok) {
      navigate("/ar");
    } else {
      setError("Unable to sign up right now.");
    }
  };

  return (
    <div className="signup-page">
     

    <main className="login-center">
        <div className="login-card">
          <div className="login-logo">
              
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h1 style={{ margin: 0,color: '#024a5f', fontSize: '1.5rem' }}>Inspectra </h1>
        </div>
        
          <h2 className="signup-card-title">Sign up</h2>
           <p className="signup-header-subtitle">
          Create an account to access AR maintenance tools.
        </p>
          <p className="signup-card-subtitle">
            Basic prototype signup (no backend yet, logs you in directly).
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-row-2">
              <div>
                <label className="signup-label">First name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
              <div>
                <label className="signup-label">Last name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            <div>
              <label className="signup-label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="signup-input"
              />
            </div>

            <div>
              <label className="signup-label">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="signup-input"
              />
            </div>

            <div>
              <label className="signup-label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="signup-input"
              />
            </div>

            {error && <p className="signup-error">{error}</p>}

            <button type="submit" className="signup-submit">
              Create account
            </button>
          </form>

          <p className="signup-footer">
            Already have an account?{" "}
            <Link to="/login" className="signup-footer-link">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;

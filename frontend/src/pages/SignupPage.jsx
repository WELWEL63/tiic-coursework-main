import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import BrandLogo from "../components/BrandLogo.jsx";
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      <header className="signup-header">
        <h1 className="signup-header-title">
          AR Maintenance Support System
        </h1>
        <p className="signup-header-subtitle">
          Controlled account creation for authorised maintenance staff.
        </p>
      </header>

      <main className="signup-main">
        <div className="signup-card" aria-labelledby="signup-title">
          <BrandLogo />
          <BrandLogo variant="image" />


          <h2 id="signup-title" className="signup-card-title">
            Sign up
          </h2>
          <p className="signup-card-subtitle">
            Accounts are for authorised users only. All activity is auditable.
          </p>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="signup-row-2">
              <div>
                <label className="signup-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
              <div>
                <label className="signup-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            <div>
              <label className="signup-label" htmlFor="email">
                Work email
              </label>
              <input
                id="email"
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
              />
            </div>

            <div>
              <label className="signup-label" htmlFor="new-password">
                Password
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
          <p className="signup-footer">
            Powered by Group (need an ngroup namehere)
          </p>
        </div>
        
      </main>
    </div>
  );
}

export default SignupPage;

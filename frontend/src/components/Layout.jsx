import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>AR Maintenance Support</h1>
        <div className="app-header-right">
          {user && (
            <>
              <span>
                {user.username} ({user.role})
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </header>

      <nav className="app-nav">
        <nav className="app-nav">
  <NavLink to="/ar">AR Maintenance</NavLink>
  <NavLink to="/tools">Tool Check</NavLink>
  <NavLink to="/dashboard">Dashboard</NavLink>
  <NavLink to="/users">Users</NavLink>
</nav>

      </nav>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

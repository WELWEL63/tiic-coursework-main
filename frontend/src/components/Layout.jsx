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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* SVG Box/Layers Icon to represent AR/Infrastructure */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Inspectra</h1>
        </div>
        
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

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ArMaintenancePage from "./pages/ArMaintenancePage.jsx";
import ToolCheckPage from "./pages/ToolCheckPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import UserManagementPage from "./pages/UserManagementPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// App routing:
// - /login is public (will later call backend auth FR14).
// - All other routes are wrapped in ProtectedRoute (requires user)
//   and rendered inside Layout (header + nav + Outlet). [file:6]
function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected layout with nested routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Default route inside layout redirects to /ar */}
        <Route index element={<Navigate to="/ar" replace />} />

        {/* AR maintenance page (fault scanning, etc.) */}
        <Route path="ar" element={<ArMaintenancePage />} />

        {/* Tool check page (tool scanning + checklist) */}
        <Route path="tools" element={<ToolCheckPage />} />

        {/* Dashboard page (faults, tools, alerts overview) */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* User management page (create users with role/email/password) */}
        <Route path="users" element={<UserManagementPage />} />
      </Route>

      {/* Fallback: anything else goes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

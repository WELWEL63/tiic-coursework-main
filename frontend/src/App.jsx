// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ArMaintenancePage from "./pages/ArMaintenancePage.jsx";
import ToolCheckPage from "./pages/ToolCheckPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import UserManagementPage from "./pages/UserManagementPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";


function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected layout */}
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

        {/* Dashboard page */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* AR maintenance page */}
        <Route path="ar" element={<ArMaintenancePage />} />

        {/* Tool check page */}
        <Route path="tools" element={<ToolCheckPage />} />

        {/* User management page */}
        <Route path="users" element={<UserManagementPage />} />
      </Route>

      {/* Fallback: anything else goes to /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

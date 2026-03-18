// src/pages/UserManagementPage.jsx
import React, { useState } from "react";
import UserForm from "../components/UserForm.jsx";
import UserList from "../components/UserList.jsx";
import AccessControlInfo from "../components/AccessControlInfo.jsx";

// This page supports FR14–FR15: user accounts and role-based access control (frontend side). 
function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const handleCreateUser = (userData) => {
    // TODO: call backend POST /api/users, then refresh list.
    const newUser = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleUpdateUser = (updatedData) => {
    // TODO: call backend PUT /api/users/:id, then refresh list.
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id
          ? { ...u, name: updatedData.name, email: updatedData.email, role: updatedData.role }
          : u
      )
    );
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    // TODO: call backend DELETE /api/users/:id.
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="page user-mgmt-page">
      <h2>User Management</h2>
      <p>
        Create, update and delete users, and manage role-based access to
        different parts of the system.
      </p>

      <div className="user-mgmt-layout">
        <div className="user-mgmt-left">
          {editingUser ? (
            <UserForm
              mode="edit"
              initialUser={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditingUser(null)}
            />
          ) : (
            <UserForm mode="create" onSubmit={handleCreateUser} />
          )}

          <AccessControlInfo />
        </div>

        <div className="user-mgmt-right">
          <UserList
            users={users}
            onEdit={(user) => setEditingUser(user)}
            onDelete={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
}

export default UserManagementPage;

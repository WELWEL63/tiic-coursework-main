// src/components/UserList.jsx
import React from "react";

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="user-list">
      <h3>Users</h3>
      {users.length === 0 ? (
        <p>No users defined yet.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => onEdit(u)}>Edit</button>
                  <button
                    onClick={() => onDelete(u.id)}
                    className="danger-btn"
                    style={{ marginLeft: "0.3rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function AdminUsers() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, username: "john_doe", email: "john@example.com", name: "John Doe", role: "user", status: "active", joinedDate: "2024-01-15", lastLogin: "2024-05-12" },
    { id: 2, username: "sarah_chen", email: "sarah@example.com", name: "Sarah Chen", role: "user", status: "active", joinedDate: "2024-01-20", lastLogin: "2024-05-11" },
    { id: 3, username: "mike_wilson", email: "mike@example.com", name: "Mike Wilson", role: "user", status: "inactive", joinedDate: "2024-02-01", lastLogin: "2024-04-30" },
    { id: 4, username: "emma_davis", email: "emma@example.com", name: "Emma Davis", role: "user", status: "active", joinedDate: "2024-02-15", lastLogin: "2024-05-12" },
    { id: 5, username: "admin", email: "admin@example.com", name: "Administrator", role: "admin", status: "active", joinedDate: "2024-01-01", lastLogin: "2024-05-12" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user || user.role !== "admin") {
        router.push("/login");
        return;
      }
      setCurrentUser(user);
    }
  }, [router]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const changeUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole }
        : user
    ));
  };

  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Navigation currentPage="/pages/admin/users" />
      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h1>👥 Manage Users</h1>
          <p style={{ color: "#666" }}>Manage user accounts, roles, and permissions</p>
        </div>

        {/* Filters */}
        <div style={{ 
          display: "flex", 
          gap: "15px", 
          marginBottom: "30px", 
          flexWrap: "wrap",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <div style={{
          backgroundColor: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>User</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Email</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Role</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Status</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Joined</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Last Login</th>
                  <th style={{ padding: "15px", textAlign: "center", borderBottom: "1px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: "1px solid #f8f9fa" }}>
                    <td style={{ padding: "15px" }}>
                      <div>
                        <div style={{ fontWeight: "bold", color: "#333" }}>{user.name}</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>@{user.username}</div>
                      </div>
                    </td>
                    <td style={{ padding: "15px", color: "#666" }}>{user.email}</td>
                    <td style={{ padding: "15px" }}>
                      <select
                        value={user.role}
                        onChange={(e) => changeUserRole(user.id, e.target.value)}
                        style={{
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "3px",
                          fontSize: "12px"
                        }}
                        disabled={user.username === "admin"}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        backgroundColor: user.status === "active" ? "#d4edda" : "#f8d7da",
                        color: user.status === "active" ? "#155724" : "#721c24"
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: "15px", color: "#666" }}>{user.joinedDate}</td>
                    <td style={{ padding: "15px", color: "#666" }}>{user.lastLogin}</td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: user.status === "active" ? "#ffc107" : "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                          disabled={user.username === "admin"}
                        >
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                          disabled={user.username === "admin"}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <h3>No users found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Statistics */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "20px", 
          marginTop: "30px" 
        }}>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>
              {users.length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Users</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>
              {users.filter(u => u.status === "active").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Active Users</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>
              {users.filter(u => u.status === "inactive").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Inactive Users</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>
              {users.filter(u => u.role === "admin").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Admin Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}

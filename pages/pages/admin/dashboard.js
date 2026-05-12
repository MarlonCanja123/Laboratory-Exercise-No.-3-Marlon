import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 1234,
    totalArticles: 567,
    totalComments: 8901,
    totalViews: 45678,
    activeUsers: 234,
    newUsersToday: 12
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: "user", action: "New user registered", user: "john_doe", time: "2 minutes ago" },
    { id: 2, type: "article", action: "New article published", user: "sarah_chen", article: "Advanced NLP Techniques", time: "15 minutes ago" },
    { id: 3, type: "comment", action: "New comment posted", user: "mike_wilson", article: "ML Basics", time: "1 hour ago" },
    { id: 4, type: "admin", action: "Admin login", user: "admin", time: "2 hours ago" },
    { id: 5, type: "user", action: "User profile updated", user: "emma_davis", time: "3 hours ago" }
  ]);

  useEffect(() => {
    // Check if user is logged in and is admin
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.role !== "admin") {
        router.push("/pages/dashboard");
        return;
      }
      setCurrentUser(user);
    }
  }, [router]);

  const getActivityIcon = (type) => {
    switch(type) {
      case "user": return "👤";
      case "article": return "📄";
      case "comment": return "💬";
      case "admin": return "👑";
      default: return "📊";
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case "user": return "#007bff";
      case "article": return "#28a745";
      case "comment": return "#ffc107";
      case "admin": return "#dc3545";
      default: return "#6c757d";
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
      <Navigation currentPage="/pages/admin/dashboard" />
      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h1>👑 Admin Dashboard</h1>
          <p style={{ color: "#666" }}>Welcome back, {currentUser.name}!</p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "20px", 
          marginBottom: "40px" 
        }}>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "32px", color: "#007bff", marginBottom: "10px" }}>👥</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{stats.totalUsers.toLocaleString()}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Users</div>
          </div>

          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "32px", color: "#28a745", marginBottom: "10px" }}>📚</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{stats.totalArticles.toLocaleString()}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Articles</div>
          </div>

          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "32px", color: "#ffc107", marginBottom: "10px" }}>💬</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{stats.totalComments.toLocaleString()}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Comments</div>
          </div>

          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "32px", color: "#dc3545", marginBottom: "10px" }}>👁️</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{stats.totalViews.toLocaleString()}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Views</div>
          </div>

          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "32px", color: "#6f42c1", marginBottom: "10px" }}>🟢</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{stats.activeUsers.toLocaleString()}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Active Users</div>
          </div>

          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "32px", color: "#fd7e14", marginBottom: "10px" }}>🆕</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{stats.newUsersToday}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>New Users Today</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Quick Actions</h2>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button
              onClick={() => router.push("/pages/admin/users")}
              style={{
                padding: "12px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              👥 Manage Users
            </button>
            <button
              onClick={() => router.push("/pages/admin/articles")}
              style={{
                padding: "12px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              📚 Manage Articles
            </button>
            <button
              onClick={() => router.push("/pages/admin/comments")}
              style={{
                padding: "12px 20px",
                backgroundColor: "#ffc107",
                color: "#212529",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              💬 Manage Comments
            </button>
            <button
              onClick={() => router.push("/pages/admin/settings")}
              style={{
                padding: "12px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Recent Activity</h2>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "15px 0",
                borderBottom: activity.id < recentActivity.length ? "1px solid #f8f9fa" : "none"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: `${getActivityColor(activity.type)}20`,
                  color: getActivityColor(activity.type),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px"
                }}>
                  {getActivityIcon(activity.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>
                    {activity.action}
                  </div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {activity.user && `By: ${activity.user}`}
                    {activity.article && ` | Article: ${activity.article}`}
                    {" | "}{activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem("currentUser");
              }
              router.push("/login");
            }}
            style={{
              padding: "12px 24px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

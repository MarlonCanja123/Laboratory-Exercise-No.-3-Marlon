import { useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {

  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: "🏠" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "articles", label: "Articles", icon: "📚" },
    { id: "top-articles", label: "Top Articles", icon: "🔥" },
    { id: "notifications", label: "Notifications", icon: "🔔" }
  ];

  const stats = {
    articles: 12,
    comments: 45,
    likes: 234,
    views: 1523,
    followers: 89
  };

  const recentActivity = [
    { type: "article", title: "Published: Introduction to Neural Networks", time: "2 days ago" },
    { type: "comment", title: "Commented on: NLP with Transformers", time: "3 days ago" },
    { type: "like", title: "Liked: Reinforcement Learning Guide", time: "5 days ago" }
  ];

  const logout = () => {
    alert("Logged out");
    router.push("/login");
  };

  const navigateTo = (path) => {
    router.push(`/pages/${path}`);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Machine Learning Hub</h1>
        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "30px" }}>
        <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", height: "fit-content" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>Navigation</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "overview") {
                    setActiveSection("overview");
                  } else {
                    navigateTo(item.id);
                  }
                }}
                style={{
                  padding: "12px 16px",
                  backgroundColor: activeSection === item.id ? "#007bff" : "transparent",
                  color: activeSection === item.id ? "white" : "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.backgroundColor = "#e9ecef";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          {activeSection === "overview" && (
            <div>
              <h2 style={{ marginBottom: "30px" }}>Welcome to Your Dashboard!</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>📚</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{stats.articles}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Articles</div>
                </div>

                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>💬</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>{stats.comments}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Comments</div>
                </div>

                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>❤️</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>{stats.likes}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Likes</div>
                </div>

                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>👁️</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fd7e14" }}>{stats.views}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Views</div>
                </div>

                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>👥</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#6f42c1" }}>{stats.followers}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Followers</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "25px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                  <h3 style={{ marginBottom: "20px" }}>Recent Activity</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {recentActivity.map((activity, index) => (
                      <div key={index} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        padding: "15px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px"
                      }}>
                        <div style={{
                          fontSize: "20px",
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#007bff20",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {activity.type === "article" ? "📚" : activity.type === "comment" ? "💬" : "❤️"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "500", color: "#333", marginBottom: "5px" }}>
                            {activity.title}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "25px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}>
                  <h3 style={{ marginBottom: "20px" }}>Quick Actions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                      onClick={() => navigateTo("articles")}
                      style={{
                        padding: "12px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      <span>📚</span>
                      <span>Browse Articles</span>
                    </button>

                    <button
                      onClick={() => navigateTo("top-articles")}
                      style={{
                        padding: "12px 16px",
                        backgroundColor: "#fd7e14",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      <span>🔥</span>
                      <span>Top Articles</span>
                    </button>

                    <button
                      onClick={() => navigateTo("profile")}
                      style={{
                        padding: "12px 16px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      <span>👤</span>
                      <span>Edit Profile</span>
                    </button>

                    <button
                      onClick={() => navigateTo("notifications")}
                      style={{
                        padding: "12px 16px",
                        backgroundColor: "#6f42c1",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      <span>🔔</span>
                      <span>View Notifications</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

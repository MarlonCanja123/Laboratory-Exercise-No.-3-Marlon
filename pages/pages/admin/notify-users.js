import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function AdminNotifyUsers() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    type: "general",
    priority: "normal",
    sendTo: "all",
    targetUsers: []
  });
  const [users, setUsers] = useState([
    { id: 1, username: "john_doe", name: "John Doe", email: "john@example.com", role: "user", status: "active" },
    { id: 2, username: "sarah_chen", name: "Sarah Chen", email: "sarah@example.com", role: "user", status: "active" },
    { id: 3, username: "mike_wilson", name: "Mike Wilson", email: "mike@example.com", role: "user", status: "active" },
    { id: 4, username: "emma_davis", name: "Emma Davis", email: "emma@example.com", role: "user", status: "active" },
    { id: 5, username: "alex_johnson", name: "Alex Johnson", email: "alex@example.com", role: "user", status: "inactive" }
  ]);
  const [sentNotifications, setSentNotifications] = useState([
    { id: 1, title: "Welcome to ML Hub!", message: "Get started with our new features", type: "general", sentTo: "all users", sentBy: "Admin", date: "2024-05-10" },
    { id: 2, title: "System Maintenance", message: "Scheduled maintenance this weekend", type: "system", sentTo: "all users", sentBy: "Admin", date: "2024-05-08" },
    { id: 3, title: "New Article Series", message: "Check out our new deep learning series", type: "content", sentTo: "active users", sentBy: "Admin", date: "2024-05-05" }
  ]);
  const [isSending, setIsSending] = useState(false);

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

  const handleInputChange = (field, value) => {
    setNotificationForm({ ...notificationForm, [field]: value });
  };

  const handleUserSelection = (userId) => {
    if (notificationForm.sendTo === "specific") {
      const updatedUsers = notificationForm.targetUsers.includes(userId)
        ? notificationForm.targetUsers.filter(id => id !== userId)
        : [...notificationForm.targetUsers, userId];
      setNotificationForm({ ...notificationForm, targetUsers: updatedUsers });
    }
  };

  const sendNotification = async () => {
    if (!notificationForm.title.trim() || !notificationForm.message.trim()) {
      alert("Please fill in both title and message fields");
      return;
    }

    setIsSending(true);

    // Simulate sending notification
    setTimeout(() => {
      const newNotification = {
        id: sentNotifications.length + 1,
        title: notificationForm.title,
        message: notificationForm.message,
        type: notificationForm.type,
        sentTo: notificationForm.sendTo === "all" ? "all users" : 
                notificationForm.sendTo === "active" ? "active users" : 
                `${notificationForm.targetUsers.length} selected users`,
        sentBy: currentUser.name,
        date: new Date().toISOString().split('T')[0]
      };

      setSentNotifications([newNotification, ...sentNotifications]);
      
      // Store notification in localStorage for users to see
      if (typeof window !== 'undefined') {
        const existingNotifications = JSON.parse(localStorage.getItem("userNotifications") || "[]");
        const userNotification = {
          id: Date.now(),
          type: "admin",
          title: notificationForm.title,
          message: notificationForm.message,
          time: "Just now",
          read: false
        };
        
        if (notificationForm.sendTo === "all") {
          localStorage.setItem("userNotifications", JSON.stringify([userNotification, ...existingNotifications]));
        }
      }

      // Reset form
      setNotificationForm({
        title: "",
        message: "",
        type: "general",
        priority: "normal",
        sendTo: "all",
        targetUsers: []
      });
      
      setIsSending(false);
      alert("Notification sent successfully!");
    }, 1500);
  };

  const deleteNotification = (notificationId) => {
    if (window.confirm("Are you sure you want to delete this notification record?")) {
      setSentNotifications(sentNotifications.filter(n => n.id !== notificationId));
    }
  };

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const getTypeColor = (type) => {
    switch(type) {
      case "general": return "#007bff";
      case "system": return "#dc3545";
      case "content": return "#28a745";
      case "announcement": return "#ffc107";
      default: return "#6c757d";
    }
  };

  const getTypeBadge = (type) => {
    switch(type) {
      case "general": return "📢 General";
      case "system": return "⚠️ System";
      case "content": return "📚 Content";
      case "announcement": return "📣 Announcement";
      default: return type;
    }
  };

  return (
    <div>
      <Navigation currentPage="/pages/admin/notify-users" />
      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h1>📢 Notify Users</h1>
          <p style={{ color: "#666" }}>Send announcements and notifications to all users or specific user groups</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Notification Form */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Compose Notification</h2>
            
            <div style={{ display: "grid", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                  Notification Title *
                </label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter notification title"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                  Message *
                </label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Type your message here..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                    minHeight: "120px",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Type
                  </label>
                  <select
                    value={notificationForm.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "14px"
                    }}
                  >
                    <option value="general">📢 General</option>
                    <option value="system">⚠️ System</option>
                    <option value="content">📚 Content</option>
                    <option value="announcement">📣 Announcement</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Priority
                  </label>
                  <select
                    value={notificationForm.priority}
                    onChange={(e) => handleInputChange("priority", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "14px"
                    }}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="normal">🟡 Normal</option>
                    <option value="high">🔴 High</option>
                    <option value="urgent">🚨 Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
                  Send To
                </label>
                <div style={{ display: "grid", gap: "10px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="sendTo"
                      value="all"
                      checked={notificationForm.sendTo === "all"}
                      onChange={(e) => handleInputChange("sendTo", e.target.value)}
                    />
                    <span>All Users ({users.length})</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="sendTo"
                      value="active"
                      checked={notificationForm.sendTo === "active"}
                      onChange={(e) => handleInputChange("sendTo", e.target.value)}
                    />
                    <span>Active Users Only ({users.filter(u => u.status === "active").length})</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="sendTo"
                      value="specific"
                      checked={notificationForm.sendTo === "specific"}
                      onChange={(e) => handleInputChange("sendTo", e.target.value)}
                    />
                    <span>Specific Users</span>
                  </label>
                </div>
              </div>

              {notificationForm.sendTo === "specific" && (
                <div>
                  <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
                    Select Users
                  </label>
                  <div style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    maxHeight: "150px",
                    overflowY: "auto"
                  }}>
                    {users.map(user => (
                      <label key={user.id} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px", 
                        cursor: "pointer",
                        marginBottom: "5px"
                      }}>
                        <input
                          type="checkbox"
                          checked={notificationForm.targetUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                        />
                        <span>{user.name} ({user.username}) - {user.status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={sendNotification}
                  disabled={isSending}
                  style={{
                    flex: 1,
                    padding: "12px 20px",
                    backgroundColor: isSending ? "#6c757d" : "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: isSending ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  {isSending ? "📤 Sending..." : "📤 Send Notification"}
                </button>
                <button
                  onClick={() => setNotificationForm({
                    title: "",
                    message: "",
                    type: "general",
                    priority: "normal",
                    sendTo: "all",
                    targetUsers: []
                  })}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  🔄 Clear
                </button>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Recent Notifications</h2>
            
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              {sentNotifications.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                  <div style={{ fontSize: "48px", marginBottom: "20px" }}>📭</div>
                  <h3>No notifications sent yet</h3>
                  <p>Send your first notification to all users</p>
                </div>
              ) : (
                sentNotifications.map(notification => (
                  <div key={notification.id} style={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    borderLeft: `4px solid ${getTypeColor(notification.type)}`
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                          <span style={{
                            backgroundColor: getTypeColor(notification.type),
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "bold"
                          }}>
                            {getTypeBadge(notification.type)}
                          </span>
                          <span style={{ fontSize: "12px", color: "#666" }}>{notification.date}</span>
                        </div>
                        <h4 style={{ margin: 0, color: "#333", fontSize: "16px" }}>{notification.title}</h4>
                      </div>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#999",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "5px",
                          borderRadius: "3px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#dc3545";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#999";
                        }}
                      >
                        ×
                      </button>
                    </div>
                    
                    <p style={{ margin: "0 0 10px 0", color: "#666", lineHeight: "1.4", fontSize: "14px" }}>
                      {notification.message}
                    </p>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#666" }}>
                      <span>Sent to: <strong>{notification.sentTo}</strong></span>
                      <span>By: <strong>{notification.sentBy}</strong></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

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
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>
              {sentNotifications.length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Notifications Sent</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>
              {sentNotifications.filter(n => n.type === "system").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>System Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
}

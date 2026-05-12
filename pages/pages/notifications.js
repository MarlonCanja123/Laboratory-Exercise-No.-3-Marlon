import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigation from "./navigation";

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "comment",
      title: "New comment on your article",
      message: "John Doe commented on 'Introduction to Neural Networks'",
      time: "2 hours ago",
      read: false,
      articleId: 1
    },
    {
      id: 2,
      type: "like",
      title: "Your article is trending",
      message: "'Introduction to Neural Networks' has received 50+ likes this week",
      time: "5 hours ago",
      read: false,
      articleId: 1
    },
    {
      id: 3,
      type: "reply",
      title: "New reply to your comment",
      message: "Jane Smith replied to your comment on 'NLP with Transformers'",
      time: "1 day ago",
      read: true,
      articleId: 2
    },
    {
      id: 4,
      type: "follow",
      title: "New follower",
      message: "Alice Johnson started following you",
      time: "2 days ago",
      read: true,
      userId: "alice123"
    },
    {
      id: 5,
      type: "mention",
      title: "You were mentioned",
      message: "Dr. James Wilson mentioned you in a comment on 'Reinforcement Learning'",
      time: "3 days ago",
      read: true,
      articleId: 4
    },
    {
      id: 6,
      type: "system",
      title: "Welcome to ML Hub!",
      message: "Complete your profile to get personalized article recommendations",
      time: "1 week ago",
      read: true
    }
  ]);

  // Load admin notifications from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedNotifications = JSON.parse(localStorage.getItem("userNotifications") || "[]");
      if (storedNotifications.length > 0) {
        setNotifications([...storedNotifications, ...notifications]);
      }
    }
  }, []);

  const [filter, setFilter] = useState("all");

  const filters = [
    { value: "all", label: "All", icon: "📬" },
    { value: "unread", label: "Unread", icon: "🔵" },
    { value: "admin", label: "Admin", icon: "📢" },
    { value: "comments", label: "Comments", icon: "💬" },
    { value: "likes", label: "Likes", icon: "❤️" },
    { value: "mentions", label: "Mentions", icon: "@️" }
  ];

  const getFilteredNotifications = () => {
    switch(filter) {
      case "unread":
        return notifications.filter(n => !n.read);
      case "admin":
        return notifications.filter(n => n.type === "admin");
      case "comments":
        return notifications.filter(n => n.type === "comment" || n.type === "reply");
      case "likes":
        return notifications.filter(n => n.type === "like");
      case "mentions":
        return notifications.filter(n => n.type === "mention");
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    
    if (notification.articleId) {
      router.push(`/pages/article/${notification.articleId}`);
    } else if (notification.userId) {
      router.push(`/pages/profile`);
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case "comment": return "💬";
      case "reply": return "↩️";
      case "like": return "❤️";
      case "follow": return "👤";
      case "mention": return "@️";
      case "admin": return "📢";
      case "system": return "🔔";
      default: return "📬";
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case "comment": return "#007bff";
      case "reply": return "#28a745";
      case "like": return "#dc3545";
      case "follow": return "#6f42c1";
      case "mention": return "#fd7e14";
      case "admin": return "#6f42c1";
      case "system": return "#6c757d";
      default: return "#6c757d";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <Navigation currentPage="/pages/notifications" />
      <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <p style={{ color: "#666", fontSize: "14px" }}>
              You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: "8px 16px",
                backgroundColor: filter === f.value ? "#007bff" : "#f8f9fa",
                color: filter === f.value ? "white" : "#333",
                border: "1px solid #dee2e6",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.3s ease"
              }}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
              {f.value === "unread" && unreadCount > 0 && (
                <span style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  borderRadius: "10px",
                  padding: "2px 6px",
                  fontSize: "11px",
                  fontWeight: "bold"
                }}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: "15px" }}>
        {filteredNotifications.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            color: "#666"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>📭</div>
            <h3>No notifications</h3>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              style={{
                backgroundColor: notification.read ? "#fff" : "#f8f9fa",
                border: `1px solid ${notification.read ? "#e9ecef" : "#007bff"}`,
                borderRadius: "10px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                borderLeft: `4px solid ${getNotificationColor(notification.type)}`
              }}
              onClick={() => handleNotificationClick(notification)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "15px", flex: 1 }}>
                  <div style={{
                    fontSize: "24px",
                    color: getNotificationColor(notification.type),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    backgroundColor: `${getNotificationColor(notification.type)}20`,
                    borderRadius: "50%"
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                      <h4 style={{ margin: 0, color: "#333", fontSize: "16px" }}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          borderRadius: "10px",
                          padding: "2px 6px",
                          fontSize: "10px",
                          fontWeight: "bold"
                        }}>
                          NEW
                        </span>
                      )}
                    </div>
                    
                    <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "14px", lineHeight: "1.4" }}>
                      {notification.message}
                    </p>
                    
                    <span style={{ color: "#999", fontSize: "12px" }}>
                      {notification.time}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#999",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "5px",
                    borderRadius: "5px",
                    transition: "all 0.2s ease"
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
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredNotifications.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => router.push("/pages/dashboard")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Back to Dashboard
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

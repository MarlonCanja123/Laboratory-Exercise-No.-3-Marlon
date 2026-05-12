import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navigation({ currentPage }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(user);
    }
  }, []);

  const getNavItems = () => {
    const baseItems = [
      { path: "/pages/dashboard", label: "Dashboard", icon: "🏠" },
      { path: "/pages/articles", label: "Articles", icon: "📚" },
      { path: "/pages/top-articles", label: "Top Articles", icon: "🔥" },
      { path: "/pages/profile", label: "Profile", icon: "👤" },
      { path: "/pages/notifications", label: "Notifications", icon: "🔔" }
    ];

    if (currentUser && currentUser.role === "admin") {
      return [
        { path: "/pages/admin/dashboard", label: "Admin Dashboard", icon: "👑" },
        { path: "/pages/admin/users", label: "Manage Users", icon: "👥" },
        { path: "/pages/admin/articles", label: "Manage Articles", icon: "📝" },
        { path: "/pages/admin/comments", label: "Manage Comments", icon: "💬" },
        { path: "/pages/admin/notify-users", label: "Notify Users", icon: "📢" },
        { path: "/pages/admin/settings", label: "Admin Settings", icon: "⚙️" },
        ...baseItems
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav style={{
      backgroundColor: "#fff",
      borderBottom: "1px solid #e9ecef",
      padding: "0 20px",
      position: "sticky",
      top: "0",
      zIndex: "1000",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#007bff"
        }}>
          🤖 ML Hub
        </div>

        <div style={{
          display: "flex",
          gap: "5px",
          backgroundColor: "#f8f9fa",
          padding: "4px",
          borderRadius: "25px"
        }}>
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              style={{
                padding: "8px 16px",
                backgroundColor: currentPage === item.path ? "#007bff" : "transparent",
                color: currentPage === item.path ? "white" : "#333",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.3s ease",
                fontWeight: currentPage === item.path ? "bold" : "normal"
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.path) {
                  e.currentTarget.style.backgroundColor = "#e9ecef";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.path) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <button
            onClick={() => router.push("/pages/notifications")}
            style={{
              position: "relative",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px"
            }}
          >
            🔔
            <span style={{
              position: "absolute",
              top: "0",
              right: "0",
              backgroundColor: "#dc3545",
              color: "white",
              borderRadius: "50%",
              width: "12px",
              height: "12px",
              fontSize: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              3
            </span>
          </button>

          <div style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            U
          </div>
        </div>
      </div>
    </nav>
  );
}

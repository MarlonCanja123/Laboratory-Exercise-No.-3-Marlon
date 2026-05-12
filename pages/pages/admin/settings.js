import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function AdminSettings() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [settings, setSettings] = useState({
    siteName: "Machine Learning Hub",
    siteDescription: "A platform for learning and sharing machine knowledge",
    allowRegistration: true,
    requireEmailVerification: true,
    autoApproveArticles: false,
    autoApproveComments: true,
    maxArticlesPerDay: 5,
    maxCommentsPerDay: 20,
    enableNotifications: true,
    maintenanceMode: false
  });

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

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    alert("Settings saved successfully!");
  };

  const resetSettings = () => {
    if (window.confirm("Are you sure you want to reset all settings to default?")) {
      setSettings({
        siteName: "Machine Learning Hub",
        siteDescription: "A platform for learning and sharing machine knowledge",
        allowRegistration: true,
        requireEmailVerification: true,
        autoApproveArticles: false,
        autoApproveComments: true,
        maxArticlesPerDay: 5,
        maxCommentsPerDay: 20,
        enableNotifications: true,
        maintenanceMode: false
      });
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
      <Navigation currentPage="/pages/admin/settings" />
      <div style={{ maxWidth: "1000px", margin: "50px auto", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h1>⚙️ Admin Settings</h1>
          <p style={{ color: "#666" }}>Configure system settings and platform preferences</p>
        </div>

        <div style={{ display: "grid", gap: "30px" }}>
          {/* General Settings */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>🌐 General Settings</h2>
            
            <div style={{ display: "grid", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange("siteName", e.target.value)}
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
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                    minHeight: "80px",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange("maintenanceMode", e.target.checked)}
                  style={{ width: "18px", height: "18px" }}
                />
                <label htmlFor="maintenanceMode" style={{ color: "#333", cursor: "pointer" }}>
                  🚧 Maintenance Mode (Site will be inaccessible to users)
                </label>
              </div>
            </div>
          </div>

          {/* User Registration Settings */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>👥 User Registration</h2>
            
            <div style={{ display: "grid", gap: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={(e) => handleSettingChange("allowRegistration", e.target.checked)}
                  style={{ width: "18px", height: "18px" }}
                />
                <label htmlFor="allowRegistration" style={{ color: "#333", cursor: "pointer" }}>
                  Allow New User Registration
                </label>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => handleSettingChange("requireEmailVerification", e.target.checked)}
                  style={{ width: "18px", height: "18px" }}
                />
                <label htmlFor="requireEmailVerification" style={{ color: "#333", cursor: "pointer" }}>
                  Require Email Verification
                </label>
              </div>
            </div>
          </div>

          {/* Content Moderation Settings */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>📝 Content Moderation</h2>
            
            <div style={{ display: "grid", gap: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="autoApproveArticles"
                  checked={settings.autoApproveArticles}
                  onChange={(e) => handleSettingChange("autoApproveArticles", e.target.checked)}
                  style={{ width: "18px", height: "18px" }}
                />
                <label htmlFor="autoApproveArticles" style={{ color: "#333", cursor: "pointer" }}>
                  Auto-Approve Articles (Bypass admin review)
                </label>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="autoApproveComments"
                  checked={settings.autoApproveComments}
                  onChange={(e) => handleSettingChange("autoApproveComments", e.target.checked)}
                  style={{ width: "18px", height: "18px" }}
                />
                <label htmlFor="autoApproveComments" style={{ color: "#333", cursor: "pointer" }}>
                  Auto-Approve Comments
                </label>
              </div>
            </div>
          </div>

          {/* User Limits */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>📊 User Limits</h2>
            
            <div style={{ display: "grid", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                  Max Articles Per Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={settings.maxArticlesPerDay}
                  onChange={(e) => handleSettingChange("maxArticlesPerDay", parseInt(e.target.value))}
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
                  Max Comments Per Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={settings.maxCommentsPerDay}
                  onChange={(e) => handleSettingChange("maxCommentsPerDay", parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>🔔 Notifications</h2>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="enableNotifications"
                checked={settings.enableNotifications}
                onChange={(e) => handleSettingChange("enableNotifications", e.target.checked)}
                style={{ width: "18px", height: "18px" }}
              />
              <label htmlFor="enableNotifications" style={{ color: "#333", cursor: "pointer" }}>
                Enable System Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: "flex", 
          gap: "15px", 
          justifyContent: "center", 
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px"
        }}>
          <button
            onClick={saveSettings}
            style={{
              padding: "12px 24px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            💾 Save Settings
          </button>
          
          <button
            onClick={resetSettings}
            style={{
              padding: "12px 24px",
              backgroundColor: "#ffc107",
              color: "#212529",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🔄 Reset to Default
          </button>
        </div>

        {/* System Info */}
        <div style={{
          backgroundColor: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "10px",
          padding: "25px",
          marginTop: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginBottom: "20px", color: "#333" }}>ℹ️ System Information</h2>
          
          <div style={{ display: "grid", gap: "10px", fontSize: "14px", color: "#666" }}>
            <div><strong>Version:</strong> 1.0.0</div>
            <div><strong>Last Updated:</strong> May 12, 2026</div>
            <div><strong>Environment:</strong> Development</div>
            <div><strong>Database:</strong> Mock Data</div>
            <div><strong>Authentication:</strong> Local Storage</div>
          </div>
        </div>
      </div>
    </div>
  );
}



import { useState } from "react";
import { useRouter } from "next/router";
import Navigation from "./navigation";

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "ML Enthusiast",
    email: "user@mlhub.com",
    bio: "Passionate about Machine Learning and AI",
    expertise: "Deep Learning, NLP, Computer Vision",
    joinedDate: "January 2024",
    articles: 12,
    comments: 45,
    likes: 234
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const logout = () => {
    alert("Logged out");
    router.push("/login");
  };

  return (
    <div>
      <Navigation currentPage="/pages/profile" />
      <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Profile</h1>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "48px",
            color: "white"
          }}>
            {profile.username.charAt(0).toUpperCase()}
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <h3>{profile.username}</h3>
            <p style={{ color: "#666" }}>{profile.email}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", textAlign: "center" }}>
            <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>{profile.articles}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Articles</div>
            </div>
            <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>{profile.comments}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Comments</div>
            </div>
            <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>{profile.likes}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Likes</div>
            </div>
            <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>{profile.joinedDate.split(" ")[0]}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Since</div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Edit Profile
              </button>
            ) : (
              <div>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px"
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Username</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.username}
                  onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              ) : (
                <p>{profile.username}</p>
              )}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Bio</label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px", minHeight: "80px" }}
                />
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Expertise</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.expertise}
                  onChange={(e) => setEditedProfile({ ...editedProfile, expertise: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              ) : (
                <p>{profile.expertise}</p>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Member Since</label>
              <p>{profile.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("user"); // "user" or "admin"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Mock user database
  const users = [
    { username: "user", password: "user123", role: "user", name: "Regular User" },
    { username: "admin", password: "admin123", role: "admin", name: "Administrator" },
    { username: "john", password: "john123", role: "user", name: "John Doe" },
    { username: "sarah", password: "sarah123", role: "user", name: "Sarah Chen" }
  ];

  const handleLogin = async () => {
    if (username.trim() === "") {
      setMessage("Please enter a username");
      return;
    }
    
    if (password.trim() === "") {
      setMessage("Please enter a password");
      return;
    }
    
    // Check credentials against mock database
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Store user info in localStorage (in real app, use secure auth)
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      setMessage(`${user.role === "admin" ? "Admin" : "User"} login successful! Redirecting...`);
      setTimeout(() => {
        if (user.role === "admin") {
          router.push("/pages/admin/dashboard");
        } else {
          router.push("/pages/dashboard");
        }
      }, 1000);
    } else {
      setMessage("Invalid username or password");
    }
  };

  const handleSignUp = async () => {
    if (username.trim() === "") {
      setMessage("Please enter a username");
      return;
    }
    
    if (password.trim() === "") {
      setMessage("Please enter a password");
      return;
    }
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    
    setMessage("Sign up successful! Redirecting to login...");
    setTimeout(() => {
      setIsLogin(true);
      setMessage("Account created! You can now log in.");
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px", maxWidth: "400px", margin: "100px auto" }}>

      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      
      {isLogin && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "15px" }}>
            <button
              onClick={() => setUserType("user")}
              style={{
                padding: "8px 16px",
                backgroundColor: userType === "user" ? "#007bff" : "#f8f9fa",
                color: userType === "user" ? "white" : "#333",
                border: "1px solid #dee2e6",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              👤 User Login
            </button>
            <button
              onClick={() => setUserType("admin")}
              style={{
                padding: "8px 16px",
                backgroundColor: userType === "admin" ? "#dc3545" : "#f8f9fa",
                color: userType === "admin" ? "white" : "#333",
                border: "1px solid #dee2e6",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              👑 Admin Login
            </button>
          </div>
          
          {userType === "admin" && (
            <div style={{
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "15px",
              fontSize: "12px",
              color: "#856404"
            }}>
              ⚠️ Admin Area - Restricted Access
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ccc", 
              borderRadius: "5px",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px", position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ccc", 
              borderRadius: "5px",
              fontSize: "16px",
              paddingRight: "100px"
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              color: "#666"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {!isLogin && (
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ccc", 
                borderRadius: "5px",
                fontSize: "16px",
                paddingRight: "100px"
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                color: "#666"
              }}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "10px"
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        }}
        style={{
          background: "none",
          border: "none",
          color: "#007bff",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>

      {message && (
        <p style={{ 
          marginTop: "15px", 
          color: message.includes("successful") ? "green" : "red",
          fontSize: "14px"
        }}>
          {message}
        </p>
      )}

    </div>
  );
}
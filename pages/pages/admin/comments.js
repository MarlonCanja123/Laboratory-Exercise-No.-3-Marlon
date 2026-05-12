import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function AdminComments() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([
    { id: 1, article: "Introduction to Neural Networks", author: "John Doe", content: "Great explanation of backpropagation!", status: "approved", date: "2024-05-12", likes: 12, replies: 2 },
    { id: 2, article: "NLP with Transformers", author: "Sarah Chen", content: "This helped me understand attention mechanisms.", status: "approved", date: "2024-05-11", likes: 8, replies: 1 },
    { id: 3, article: "Computer Vision Basics", author: "Mike Wilson", content: "Can you explain more about CNNs?", status: "pending", date: "2024-05-10", likes: 0, replies: 0 },
    { id: 4, article: "Reinforcement Learning", author: "Emma Davis", content: "The Q-learning example was very clear.", status: "approved", date: "2024-05-09", likes: 15, replies: 3 },
    { id: 5, article: "ML in Healthcare", author: "Alex Johnson", content: "Spam content here", status: "flagged", date: "2024-05-08", likes: 0, replies: 0 },
    { id: 6, article: "Ethical AI", author: "Lisa Park", content: "Important discussion on AI ethics.", status: "approved", date: "2024-05-07", likes: 6, replies: 1 }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || comment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const approveComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, status: "approved" } : comment
    ));
  };

  const flagComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, status: "flagged" } : comment
    ));
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "approved": return "#28a745";
      case "pending": return "#ffc107";
      case "flagged": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "approved": return "✅ Approved";
      case "pending": return "⏳ Pending";
      case "flagged": return "🚩 Flagged";
      default: return status;
    }
  };

  return (
    <div>
      <Navigation currentPage="/pages/admin/comments" />
      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h1>💬 Manage Comments</h1>
          <p style={{ color: "#666" }}>Moderate comments, approve submissions, and manage user interactions</p>
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
            placeholder="Search comments..."
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>

        {/* Comments Table */}
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
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Comment</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Author</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Article</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Status</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Stats</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Date</th>
                  <th style={{ padding: "15px", textAlign: "center", borderBottom: "1px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.map(comment => (
                  <tr key={comment.id} style={{ borderBottom: "1px solid #f8f9fa" }}>
                    <td style={{ padding: "15px" }}>
                      <div style={{ maxWidth: "300px" }}>
                        <div style={{ 
                          fontSize: "14px", 
                          color: "#333", 
                          lineHeight: "1.4",
                          marginBottom: "8px"
                        }}>
                          {comment.content.length > 100 ? comment.content.substring(0, 100) + "..." : comment.content}
                        </div>
                        {comment.replies > 0 && (
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            💬 {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ fontWeight: "bold", color: "#333" }}>{comment.author}</div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ fontSize: "14px", color: "#666" }}>{comment.article}</div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        backgroundColor: `${getStatusColor(comment.status)}20`,
                        color: getStatusColor(comment.status),
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}>
                        {getStatusBadge(comment.status)}
                      </span>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        <div>❤️ {comment.likes} likes</div>
                        <div>💬 {comment.replies} replies</div>
                      </div>
                    </td>
                    <td style={{ padding: "15px", color: "#666" }}>{comment.date}</td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "5px", justifyContent: "center", flexWrap: "wrap" }}>
                        {comment.status === "pending" && (
                          <button
                            onClick={() => approveComment(comment.id)}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              fontSize: "11px",
                              cursor: "pointer"
                            }}
                          >
                            ✅ Approve
                          </button>
                        )}
                        {comment.status === "approved" && (
                          <button
                            onClick={() => flagComment(comment.id)}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#ffc107",
                              color: "#212529",
                              border: "none",
                              borderRadius: "3px",
                              fontSize: "11px",
                              cursor: "pointer"
                            }}
                          >
                            🚩 Flag
                          </button>
                        )}
                        <button
                          onClick={() => deleteComment(comment.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredComments.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <h3>No comments found</h3>
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
              {comments.length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Comments</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>
              {comments.filter(c => c.status === "approved").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Approved</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>
              {comments.filter(c => c.status === "pending").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Pending Review</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>
              {comments.filter(c => c.status === "flagged").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Flagged</div>
          </div>
        </div>
      </div>
    </div>
  );
}

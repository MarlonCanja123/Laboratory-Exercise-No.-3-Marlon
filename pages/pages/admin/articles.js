import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function AdminArticles() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([
    { id: 1, title: "Introduction to Neural Networks", author: "Dr. Sarah Chen", category: "Deep Learning", status: "published", views: 1523, likes: 234, comments: 45, date: "2024-01-15" },
    { id: 2, title: "NLP with Transformers", author: "Prof. Michael Kumar", category: "NLP", status: "published", views: 1234, likes: 189, comments: 32, date: "2024-01-12" },
    { id: 3, title: "Computer Vision Basics", author: "Emily Rodriguez", category: "Computer Vision", status: "draft", views: 0, likes: 0, comments: 0, date: "2024-01-10" },
    { id: 4, title: "Reinforcement Learning", author: "Dr. James Wilson", category: "Reinforcement Learning", status: "published", views: 987, likes: 203, comments: 41, date: "2024-01-08" },
    { id: 5, title: "ML in Healthcare", author: "Dr. Lisa Park", category: "Applications", status: "published", views: 876, likes: 178, comments: 35, date: "2024-01-05" },
    { id: 6, title: "Ethical AI", author: "Prof. David Thompson", category: "Ethics", status: "pending", views: 0, likes: 0, comments: 0, date: "2024-01-03" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

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

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || article.status === filterStatus;
    const matchesCategory = filterCategory === "all" || article.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toggleArticleStatus = (articleId) => {
    const statusFlow = { draft: "pending", pending: "published", published: "draft" };
    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, status: statusFlow[article.status] }
        : article
    ));
  };

  const deleteArticle = (articleId) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter(article => article.id !== articleId));
    }
  };

  const featuredArticle = (articleId) => {
    setArticles(articles.map(article => 
      ({ ...article, featured: article.id === articleId ? !article.featured : false })
    ));
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
      case "published": return "#28a745";
      case "draft": return "#6c757d";
      case "pending": return "#ffc107";
      default: return "#6c757d";
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "published": return "✅ Published";
      case "draft": return "📝 Draft";
      case "pending": return "⏳ Pending";
      default: return status;
    }
  };

  return (
    <div>
      <Navigation currentPage="/pages/admin/articles" />
      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h1>📝 Manage Articles</h1>
          <p style={{ color: "#666" }}>Manage all articles, review submissions, and control publication status</p>
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
            placeholder="Search articles..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          >
            <option value="all">All Categories</option>
            <option value="Deep Learning">Deep Learning</option>
            <option value="NLP">NLP</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Reinforcement Learning">Reinforcement Learning</option>
            <option value="Applications">Applications</option>
            <option value="Ethics">Ethics</option>
          </select>

          <button
            onClick={() => router.push("/pages/articles")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            ➕ New Article
          </button>
        </div>

        {/* Articles Table */}
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
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Title</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Author</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Category</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Status</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Stats</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Date</th>
                  <th style={{ padding: "15px", textAlign: "center", borderBottom: "1px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map(article => (
                  <tr key={article.id} style={{ borderBottom: "1px solid #f8f9fa" }}>
                    <td style={{ padding: "15px" }}>
                      <div>
                        <div style={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>{article.title}</div>
                        {article.featured && (
                          <span style={{
                            backgroundColor: "#ffc107",
                            color: "#212529",
                            padding: "2px 6px",
                            borderRadius: "10px",
                            fontSize: "10px",
                            fontWeight: "bold"
                          }}>
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "15px", color: "#666" }}>{article.author}</td>
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        backgroundColor: "#e9ecef",
                        color: "#495057",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px"
                      }}>
                        {article.category}
                      </span>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        backgroundColor: `${getStatusColor(article.status)}20`,
                        color: getStatusColor(article.status),
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}>
                        {getStatusBadge(article.status)}
                      </span>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        <div>👁️ {article.views.toLocaleString()} views</div>
                        <div>❤️ {article.likes} likes</div>
                        <div>💬 {article.comments} comments</div>
                      </div>
                    </td>
                    <td style={{ padding: "15px", color: "#666" }}>{article.date}</td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "5px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button
                          onClick={() => router.push(`/pages/article/${article.id}`)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => toggleArticleStatus(article.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: getStatusColor(article.status),
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                        >
                          {article.status === "published" ? "📝 Draft" : article.status === "draft" ? "⏳ Publish" : "✅ Approve"}
                        </button>
                        <button
                          onClick={() => featuredArticle(article.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: article.featured ? "#ffc107" : "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "11px",
                            cursor: "pointer"
                          }}
                        >
                          {article.featured ? "⭐ Featured" : "☆ Feature"}
                        </button>
                        <button
                          onClick={() => deleteArticle(article.id)}
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

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <h3>No articles found</h3>
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
              {articles.length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Articles</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>
              {articles.filter(a => a.status === "published").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Published</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>
              {articles.filter(a => a.status === "draft").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Drafts</div>
          </div>
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#6c757d" }}>
              {articles.filter(a => a.status === "pending").length}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Pending Review</div>
          </div>
        </div>
      </div>
    </div>
  );
}

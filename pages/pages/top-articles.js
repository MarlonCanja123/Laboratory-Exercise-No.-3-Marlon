import { useState } from "react";
import { useRouter } from "next/router";
import Navigation from "./navigation";

export default function TopArticles() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState("all");

  const topArticles = [
    {
      id: 1,
      title: "Introduction to Neural Networks",
      excerpt: "Learn the fundamentals of neural networks and how they power modern AI applications.",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      category: "Deep Learning",
      likes: 234,
      comments: 45,
      views: 1523,
      readTime: "8 min",
      trending: true
    },
    {
      id: 2,
      title: "Natural Language Processing with Transformers",
      excerpt: "Explore the revolutionary transformer architecture and its applications in NLP.",
      author: "Prof. Michael Kumar",
      date: "2024-01-12",
      category: "NLP",
      likes: 189,
      comments: 32,
      views: 1234,
      readTime: "12 min",
      trending: true
    },
    {
      id: 3,
      title: "Reinforcement Learning: A Complete Guide",
      excerpt: "Master the concepts of reinforcement learning and build intelligent agents.",
      author: "Dr. James Wilson",
      date: "2024-01-08",
      category: "Reinforcement Learning",
      likes: 203,
      comments: 41,
      views: 987,
      readTime: "15 min",
      trending: false
    },
    {
      id: 4,
      title: "Machine Learning in Healthcare",
      excerpt: "Applications of ML in medical diagnosis, drug discovery, and personalized treatment.",
      author: "Dr. Lisa Park",
      date: "2024-01-05",
      category: "Applications",
      likes: 178,
      comments: 35,
      views: 876,
      readTime: "9 min",
      trending: false
    },
    {
      id: 5,
      title: "Computer Vision: From Pixels to Understanding",
      excerpt: "Discover how computers interpret and understand visual information from images.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      category: "Computer Vision",
      likes: 156,
      comments: 28,
      views: 765,
      readTime: "10 min",
      trending: false
    },
    {
      id: 6,
      title: "Ethical AI: Bias and Fairness in Machine Learning",
      excerpt: "Understanding the ethical implications and ensuring fairness in AI systems.",
      author: "Prof. David Thompson",
      date: "2024-01-03",
      category: "Ethics",
      likes: 145,
      comments: 29,
      views: 654,
      readTime: "7 min",
      trending: false
    }
  ];

  const timeFilters = [
    { value: "all", label: "All Time" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" }
  ];

  const getFilteredArticles = () => {
    // In a real app, this would filter based on actual dates
    // For demo purposes, we'll just return different subsets
    switch(timeFilter) {
      case "week":
        return topArticles.slice(0, 3);
      case "month":
        return topArticles.slice(0, 4);
      case "year":
        return topArticles.slice(0, 5);
      default:
        return topArticles;
    }
  };

  const filteredArticles = getFilteredArticles();

  const handleArticleClick = (articleId) => {
    router.push(`/pages/article/${articleId}`);
  };

  const shareArticle = (article, platform) => {
    const url = `${window.location.origin}/pages/article/${article.id}`;
    const text = `Check out this top article: ${article.title}`;
    
    let shareUrl = "";
    switch(platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        break;
      default:
        shareUrl = url;
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div>
      <Navigation currentPage="/pages/top-articles" />
      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>🔥 Top Articles</h1>
        <p>Discover the most popular and trending machine learning content</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <div style={{ display: "flex", gap: "10px", backgroundColor: "#f8f9fa", padding: "5px", borderRadius: "25px" }}>
          {timeFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setTimeFilter(filter.value)}
              style={{
                padding: "8px 16px",
                backgroundColor: timeFilter === filter.value ? "#007bff" : "transparent",
                color: timeFilter === filter.value ? "white" : "#333",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.3s ease"
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {filteredArticles.map((article, index) => (
          <div key={article.id} style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
          onClick={() => handleArticleClick(article.id)}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {index < 3 && (
              <div style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                width: "30px",
                height: "30px",
                backgroundColor: index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : "#cd7f32",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px"
              }}>
                {index + 1}
              </div>
            )}

            {article.trending && (
              <div style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                backgroundColor: "#ff4757",
                color: "white",
                padding: "4px 8px",
                borderRadius: "15px",
                fontSize: "11px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "3px"
              }}>
                🔥 Trending
              </div>
            )}

            <div style={{ marginLeft: index < 3 ? "40px" : "0", marginRight: article.trending ? "80px" : "0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <span style={{ 
                  backgroundColor: "#007bff", 
                  color: "white", 
                  padding: "4px 8px", 
                  borderRadius: "15px", 
                  fontSize: "12px" 
                }}>
                  {article.category}
                </span>
                <span style={{ color: "#666", fontSize: "12px" }}>{article.readTime}</span>
              </div>
              
              <h3 style={{ marginBottom: "10px", color: "#333", fontSize: "20px" }}>{article.title}</h3>
              <p style={{ color: "#666", marginBottom: "20px", lineHeight: "1.5" }}>{article.excerpt}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "20px", fontSize: "12px", color: "#666" }}>
                  <span>By {article.author}</span>
                  <span>❤️ {article.likes}</span>
                  <span>💬 {article.comments}</span>
                  <span>👁️ {article.views}</span>
                  <span>📅 {article.date}</span>
                </div>
                
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); shareArticle(article, "twitter"); }}
                    style={{ 
                      padding: "6px 10px", 
                      backgroundColor: "#1da1f2", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "5px", 
                      fontSize: "11px", 
                      cursor: "pointer",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    🐦
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); shareArticle(article, "facebook"); }}
                    style={{ 
                      padding: "6px 10px", 
                      backgroundColor: "#4267B2", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "5px", 
                      fontSize: "11px", 
                      cursor: "pointer",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    📘
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); shareArticle(article, "linkedin"); }}
                    style={{ 
                      padding: "6px 10px", 
                      backgroundColor: "#0077b5", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "5px", 
                      fontSize: "11px", 
                      cursor: "pointer",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    💼
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={() => router.push("/pages/articles")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View All Articles
        </button>
      </div>
    </div>
  </div>
);
}

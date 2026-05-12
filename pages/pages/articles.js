import { useState } from "react";
import { useRouter } from "next/router";
import Navigation from "./navigation";

export default function Articles() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles = [
    {
      id: 1,
      title: "Introduction to Neural Networks",
      excerpt: "Learn the fundamentals of neural networks and how they power modern AI applications.",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      category: "Deep Learning",
      likes: 234,
      comments: 45,
      readTime: "8 min",
      featured: true
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
      readTime: "12 min",
      featured: true
    },
    {
      id: 3,
      title: "Computer Vision: From Pixels to Understanding",
      excerpt: "Discover how computers interpret and understand visual information from images.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      category: "Computer Vision",
      likes: 156,
      comments: 28,
      readTime: "10 min",
      featured: false
    },
    {
      id: 4,
      title: "Reinforcement Learning: A Complete Guide",
      excerpt: "Master the concepts of reinforcement learning and build intelligent agents.",
      author: "Dr. James Wilson",
      date: "2024-01-08",
      category: "Reinforcement Learning",
      likes: 203,
      comments: 41,
      readTime: "15 min",
      featured: true
    },
    {
      id: 5,
      title: "Machine Learning in Healthcare",
      excerpt: "Applications of ML in medical diagnosis, drug discovery, and personalized treatment.",
      author: "Dr. Lisa Park",
      date: "2024-01-05",
      category: "Applications",
      likes: 178,
      comments: 35,
      readTime: "9 min",
      featured: false
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
      readTime: "7 min",
      featured: false
    }
  ];

  const categories = ["all", "Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning", "Applications", "Ethics"];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);

  const handleArticleClick = (articleId) => {
    router.push(`/pages/article/${articleId}`);
  };

  const shareArticle = (article, platform) => {
    const url = `${window.location.origin}/pages/article/${article.id}`;
    const text = `Check out this article: ${article.title}`;
    
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
      <Navigation currentPage="/pages/articles" />
      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Machine Learning Articles</h1>
        <p>Explore the latest insights and tutorials in machine learning</p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 15px",
              border: "1px solid #ccc",
              borderRadius: "25px",
              width: "300px",
              fontSize: "14px"
            }}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "10px 15px",
              border: "1px solid #ccc",
              borderRadius: "25px",
              fontSize: "14px"
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCategory === "all" && searchTerm === "" && (
        <div style={{ marginBottom: "40px" }}>
          <h2>Featured Articles</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
            {featuredArticles.map(article => (
              <div key={article.id} style={{
                backgroundColor: "#fff",
                border: "1px solid #e9ecef",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.2s"
              }}
              onClick={() => handleArticleClick(article.id)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ backgroundColor: "#007bff", color: "white", padding: "4px 8px", borderRadius: "15px", fontSize: "12px" }}>
                    {article.category}
                  </span>
                  <span style={{ color: "#ffc107", fontSize: "16px" }}>⭐ Featured</span>
                </div>
                
                <h3 style={{ marginBottom: "10px", color: "#333" }}>{article.title}</h3>
                <p style={{ color: "#666", marginBottom: "15px", lineHeight: "1.5" }}>{article.excerpt}</p>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#888" }}>
                  <span>By {article.author}</span>
                  <span>{article.readTime}</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
                  <div style={{ display: "flex", gap: "15px", fontSize: "12px", color: "#666" }}>
                    <span>❤️ {article.likes}</span>
                    <span>💬 {article.comments}</span>
                    <span>📅 {article.date}</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); shareArticle(article, "twitter"); }}
                      style={{ padding: "5px 8px", backgroundColor: "#1da1f2", color: "white", border: "none", borderRadius: "3px", fontSize: "10px", cursor: "pointer" }}
                    >
                      🐦
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); shareArticle(article, "facebook"); }}
                      style={{ padding: "5px 8px", backgroundColor: "#4267B2", color: "white", border: "none", borderRadius: "3px", fontSize: "10px", cursor: "pointer" }}
                    >
                      📘
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); shareArticle(article, "linkedin"); }}
                      style={{ padding: "5px 8px", backgroundColor: "#0077b5", color: "white", border: "none", borderRadius: "3px", fontSize: "10px", cursor: "pointer" }}
                    >
                      💼
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2>{selectedCategory === "all" && searchTerm === "" ? "All Articles" : "Search Results"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
          {filteredArticles.map(article => (
            <div key={article.id} style={{
              backgroundColor: "#fff",
              border: "1px solid #e9ecef",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onClick={() => handleArticleClick(article.id)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ marginBottom: "10px" }}>
                <span style={{ backgroundColor: "#6c757d", color: "white", padding: "4px 8px", borderRadius: "15px", fontSize: "12px" }}>
                  {article.category}
                </span>
              </div>
              
              <h3 style={{ marginBottom: "10px", color: "#333" }}>{article.title}</h3>
              <p style={{ color: "#666", marginBottom: "15px", lineHeight: "1.5" }}>{article.excerpt}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#888" }}>
                <span>By {article.author}</span>
                <span>{article.readTime}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
                <div style={{ display: "flex", gap: "15px", fontSize: "12px", color: "#666" }}>
                  <span>❤️ {article.likes}</span>
                  <span>💬 {article.comments}</span>
                  <span>📅 {article.date}</span>
                </div>
                
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); shareArticle(article, "twitter"); }}
                    style={{ padding: "5px 8px", backgroundColor: "#1da1f2", color: "white", border: "none", borderRadius: "3px", fontSize: "10px", cursor: "pointer" }}
                  >
                    🐦
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); shareArticle(article, "facebook"); }}
                    style={{ padding: "5px 8px", backgroundColor: "#4267B2", color: "white", border: "none", borderRadius: "3px", fontSize: "10px", cursor: "pointer" }}
                  >
                    📘
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); shareArticle(article, "linkedin"); }}
                    style={{ padding: "5px 8px", backgroundColor: "#0077b5", color: "white", border: "none", borderRadius: "3px", fontSize: "10px", cursor: "pointer" }}
                  >
                    💼
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <h3>No articles found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

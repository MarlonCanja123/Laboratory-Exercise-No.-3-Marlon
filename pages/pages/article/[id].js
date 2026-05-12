import { useState } from "react";
import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [article, setArticle] = useState({
    id: id || 1,
    title: "Introduction to Neural Networks",
    content: `
# Introduction to Neural Networks

Neural networks are a fundamental concept in machine learning and artificial intelligence. They are inspired by the structure and function of the human brain, consisting of interconnected nodes or "neurons" that process and transmit information.

## What are Neural Networks?

A neural network is a computational model that is inspired by the structure of biological neural networks. It consists of layers of interconnected nodes, each performing simple mathematical operations. These networks can learn to recognize patterns and make decisions based on input data.

## Key Components

### 1. Neurons (Nodes)
Neurons are the basic building blocks of neural networks. Each neuron receives input, processes it using an activation function, and produces an output.

### 2. Layers
- **Input Layer**: Receives the initial data
- **Hidden Layers**: Process the data through multiple levels of abstraction
- **Output Layer**: Produces the final result

### 3. Weights and Biases
Weights determine the strength of connections between neurons, while biases help shift the activation function.

## How Neural Networks Learn

Neural networks learn through a process called training, which involves:
1. **Forward Propagation**: Input data flows through the network
2. **Loss Calculation**: The network's output is compared to the expected output
3. **Backpropagation**: The error is propagated backward to adjust weights
4. **Weight Updates**: Weights are adjusted to minimize the error

## Applications

Neural networks are used in various applications:
- Image recognition and computer vision
- Natural language processing
- Speech recognition
- Autonomous vehicles
- Medical diagnosis
- Financial forecasting

## Conclusion

Understanding neural networks is crucial for anyone interested in machine learning. They form the foundation for many advanced AI systems and continue to evolve with new architectures and techniques.
    `,
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    category: "Deep Learning",
    likes: 234,
    views: 1523,
    readTime: "8 min"
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "Great article! This really helped me understand the basics of neural networks.",
      date: "2024-01-16",
      likes: 12,
      replies: [
        {
          id: 11,
          author: "Jane Smith",
          content: "I agree! The explanation was very clear and easy to follow.",
          date: "2024-01-16",
          likes: 5
        }
      ]
    },
    {
      id: 2,
      author: "Alice Johnson",
      content: "Could you explain more about backpropagation? I'm still a bit confused about how it works.",
      date: "2024-01-17",
      likes: 8,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const handleLike = () => {
    setArticle({ ...article, likes: article.likes + 1 });
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleReplyLike = (commentId, replyId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId 
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
        : comment
    ));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "Current User",
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId) => {
    if (newReply.trim()) {
      const reply = {
        id: Date.now(),
        author: "Current User",
        content: newReply,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      
      setNewReply("");
      setReplyingTo(null);
    }
  };

  const shareArticle = (platform) => {
    const url = window.location.href;
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
      <Navigation currentPage="/pages/article" />
      <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => router.push("/pages/articles")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Back to Articles
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <span style={{ backgroundColor: "#007bff", color: "white", padding: "4px 8px", borderRadius: "15px", fontSize: "12px" }}>
            {article.category}
          </span>
          <span>{article.readTime}</span>
        </div>

        <h1 style={{ marginBottom: "20px", color: "#333" }}>{article.title}</h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontSize: "14px", color: "#666" }}>
          <div>
            <span>By {article.author}</span>
            <span style={{ marginLeft: "20px" }}>📅 {article.date}</span>
            <span style={{ marginLeft: "20px" }}>👁️ {article.views} views</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <button
            onClick={handleLike}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            ❤️ {article.likes}
          </button>

          <button
            onClick={() => shareArticle("twitter")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1da1f2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            🐦 Share
          </button>

          <button
            onClick={() => shareArticle("facebook")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4267B2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            📘 Share
          </button>

          <button
            onClick={() => shareArticle("linkedin")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#0077b5",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            💼 Share
          </button>
        </div>
      </div>

      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "30px", 
        borderRadius: "10px", 
        marginBottom: "40px",
        lineHeight: "1.6",
        fontSize: "16px"
      }}>
        <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />').replace(/#{1,6}\s/g, match => {
          const level = match.trim().length;
          return `<h${level}>`;
        }) }} />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Leave a Comment</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          style={{
            width: "100%",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            minHeight: "100px",
            fontSize: "14px",
            resize: "vertical"
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Post Comment
        </button>
      </div>

      <div>
        <h3>Comments ({comments.length})</h3>
        
        {comments.map(comment => (
          <div key={comment.id} style={{
            backgroundColor: "#fff",
            border: "1px solid #e9ecef",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <strong>{comment.author}</strong>
                <span style={{ marginLeft: "10px", fontSize: "12px", color: "#666" }}>{comment.date}</span>
              </div>
              <button
                onClick={() => handleCommentLike(comment.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                ❤️ {comment.likes}
              </button>
            </div>
            
            <p style={{ marginBottom: "15px", lineHeight: "1.5" }}>{comment.content}</p>
            
            <button
              onClick={() => setReplyingTo(comment.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "12px"
              }}
            >
              Reply
            </button>

            {replyingTo === comment.id && (
              <div style={{ marginTop: "15px" }}>
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Write a reply..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    minHeight: "60px",
                    fontSize: "14px",
                    resize: "vertical"
                  }}
                />
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleAddReply(comment.id)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                  >
                    Post Reply
                  </button>
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setNewReply("");
                    }}
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
              </div>
            )}

            {comment.replies.map(reply => (
              <div key={reply.id} style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                padding: "15px",
                marginTop: "15px",
                marginLeft: "20px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div>
                    <strong>{reply.author}</strong>
                    <span style={{ marginLeft: "10px", fontSize: "12px", color: "#666" }}>{reply.date}</span>
                  </div>
                  <button
                    onClick={() => handleReplyLike(comment.id, reply.id)}
                    style={{
                      padding: "3px 8px",
                      backgroundColor: "#fff",
                      border: "1px solid #dee2e6",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "11px"
                    }}
                  >
                    ❤️ {reply.likes}
                  </button>
                </div>
                <p style={{ lineHeight: "1.4", fontSize: "14px" }}>{reply.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

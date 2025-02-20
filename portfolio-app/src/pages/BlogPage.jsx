import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BlogPage.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please enter a title and body.");
      return;
    }

    try {
      if (editingPost) {
        // Update post
        await axios.put(`http://localhost:5000/posts/${editingPost.id}`, { title, body });
        setPosts(posts.map((post) => (post.id === editingPost.id ? { ...post, title, body } : post)));
        setEditingPost(null);
      } else {
        // Create new post
        const response = await axios.post("http://localhost:5000/posts", { title, body });
        setPosts([...posts, response.data]);
      }
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditingPost(post);
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:5000/posts/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <section className="blog">
      <h1>Blog</h1>

      {/* Create/Edit Form */}
      <form onSubmit={handleSubmit} className="blog-form">
        <h2>{editingPost ? "Edit Post" : "Create New Post"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">{editingPost ? "Update Post" : "Create Post"}</button>
        {editingPost && (
          <button type="button" className="cancel-btn" onClick={() => setEditingPost(null)}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* Blog Posts */}
      <div className="blog-container">
        {posts.length === 0 ? (
          <p>No posts available. Start by creating one!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="blog-card">
              <h2>{post.title}</h2>
              <p>{post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body}</p>
              <button className="edit-btn" onClick={() => handleEdit(post)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BlogPage;

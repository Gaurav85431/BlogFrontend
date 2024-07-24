import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlog = async () => {
      // const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      const response = await axios.get(
        `https://blogbackend-1-rusp.onrender.com/api/blogs/${id}`
      );
      setBlog(response.data);
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    // await axios.post(`http://localhost:5000/api/blogs/${id}/like`);
    await axios.post(
      `https://blogbackend-1-rusp.onrender.com/api/blogs/${id}/like`
    );
    setBlog({ ...blog, likes: [...blog.likes, user._id] });
  };

  const handleComment = async () => {
    const response = await axios.post(
      // `http://localhost:5000/api/blogs/${id}/comment`,
      `https://blogbackend-1-rusp.onrender.com/api/blogs/${id}/comment`,
      { text: comment }
    );
    setBlog({ ...blog, comments: [...blog.comments, response.data] });
    setComment("");
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="mb-4">{blog.content}</p>
      {blog.media && <img src={blog.media} alt="Blog media" className="mb-4" />}
      <p className="mb-4">{blog.description}</p>
      {user && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleLike}
        >
          Like
        </button>
      )}
      <p className="mb-4">{blog.likes.length} likes</p>
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <ul className="mb-4">
        {blog.comments.map((comment) => (
          <li key={comment._id}>
            {comment.text} by {comment.user.username}
          </li>
        ))}
      </ul>
      {user && (
        <div>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

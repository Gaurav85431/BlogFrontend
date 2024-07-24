import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      // const response = await axios.get("http://localhost:5000/api/blogs");
      const response = await axios.get(
        "https://blogbackend-1-rusp.onrender.com/api/blogs"
      );
      setBlogs(response.data);
    };

    fetchBlogs();
  }, []);

  const handleAddOrUpdateBlog = async () => {
    if (editId) {
      // await axios.put(`http://localhost:5000/api/blogs/${editId}`, {
      await axios.put(
        `https://blogbackend-1-rusp.onrender.com/api/blogs/${editId}`,
        {
          title,
          content,
          description,
          media,
        }
      );
    } else {
      // await axios.post("http://localhost:5000/api/blogs", {
      await axios.post("https://blogbackend-1-rusp.onrender.com/api/blogs", {
        title,
        content,
        description,
        media,
      });
    }
    setTitle("");
    setContent("");
    setDescription("");
    setMedia("");
    setEditId(null);
    // const response = await axios.get("http://localhost:5000/api/blogs");
    const response = await axios.get(
      "https://blogbackend-1-rusp.onrender.com/api/blogs"
    );
    setBlogs(response.data);
  };

  const handleEditBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setDescription(blog.description);
    setMedia(blog.media);
    setEditId(blog._id);
  };

  const handleDeleteBlog = async (id) => {
    await axios.delete(
      `https://blogbackend-1-rusp.onrender.com/api/blogs/${id}`
    );
    const response = await axios.get(
      "https://blogbackend-1-rusp.onrender.com/api/blogs"
    );
    // await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    // const response = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(response.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder="Media URL"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddOrUpdateBlog}
      >
        {editId ? "Update" : "Add"} Blog
      </button>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="mb-4">
          <h3 className="text-xl font-bold">{blog.title}</h3>
          <p>{blog.description}</p>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleEditBlog(blog)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleDeleteBlog(blog._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;

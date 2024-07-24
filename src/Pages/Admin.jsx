import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/blogs");
        const response = await axios.get(
          "https://blogbackend-1-rusp.onrender.com/api/blogs"
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:5000/api/blogs", {
      const response = await axios.post(
        "https://blogbackend-1-rusp.onrender.com/api/blogs",
        {
          title,
          description,
          image,
        }
      );
      setBlogs([...blogs, response.data]);
      setTitle("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Failed to add blog", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      await axios.delete(
        `https://blogbackend-1-rusp.onrender.com/api/blogs/${id}`
      );
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      Register a new blog:
      <form onSubmit={handleAddBlog} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>
      <h2 className="text-2xl font-semibold mb-4">Existing Blogs</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <p className="text-gray-700 mb-4">{blog.description}</p>
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="mb-4 rounded" />
            )}
            <button
              onClick={() => handleDeleteBlog(blog._id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

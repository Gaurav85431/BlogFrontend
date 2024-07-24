import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        "https://blogbackend-1-rusp.onrender.com/api/blogs"
      );
      // const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">
              <Link
                to={`/blogs/${blog._id}`}
                className="text-blue-600 hover:underline"
              >
                {blog.title}
              </Link>
            </h2>
            <p className="text-gray-700">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

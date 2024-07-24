import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      {!user ? (
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Register
            </button>
          </Link>
        </div>
      ) : (
        <BlogList />
      )}
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userService
      .login(credentials)
      .then(() => {
        alert("Login successful!");
        navigate("/additem");
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert(
          "Login failed: " +
            (error.response?.data?.message || "Unknown error. Check console.")
        );
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with image */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-80 h-80 flex justify-center items-center">
          <img
            src="/images/pic3.jpg"
            alt="Sign up visual"
            className="max-w-full max-h-full object-cover"
          />
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-3/4 max-w-md">
          <h2 className="text-teal-600 text-3xl font-bold mb-6">
            <center>Welcome Back</center>
          </h2>
          <p className="text-gray-500">
            <center>Log in to manage your household inventory</center>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-gray-500 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
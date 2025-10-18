import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    axios
      .post("http://localhost:8080/api/auth/signup", user)
      .then((response) => {
        alert("Signup successful! Please log in.");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signup error:", error);
        alert(
          "Signup failed: " +
            (error.response?.data?.message || "Unknown error. Check console.")
        );
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with image */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-auto h-80 flex justify-center items-center">
          <img
            src="/images/pic1.jpg"
            alt="Sign up visual"
            className="max-w-full max-h-full"
          />
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-3/4 max-w-md">
          <h2 className="text-teal-600 text-3xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-gray-500 transition"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            <center>
              Already have an account?{" "}
              <a href="/login" className="text-teal-600 hover:underline">
                Log in
              </a>
            </center>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
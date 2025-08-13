import React from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior

    // Here, you can handle form data (like sending to backend)
    // Example: console.log("Form submitted!");

    // After successful submission, navigate to /login
    navigate("/dashboard");
  };
  return (
    <div className="flex h-screen  bg-gray-100">
      {/* Left side with image */}
      <div className="w-1/2 flex justify-center items-center">
  <div className=" w-80 h-80 flex justify-center items-center">
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
          <h2 className="text-teal-600 text-3xl font-bold mb-6"><center>Welcome Back</center></h2>
          <p className='text-gray-500'><center>Log in to manage your household inventory</center></p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
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

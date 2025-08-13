import React from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior

    // Here, you can handle form data (like sending to backend)
    // Example: console.log("Form submitted!");

    // After successful submission, navigate to /login
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with image */}
      <div className="w-1/2 flex justify-center items-center">
        <div className=" w-auto h-80 flex justify-center items-center">
          <img
            src="/images/pic1.jpg"
            alt="Sign up visual"
            className="max-w-full max-h-full "
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
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
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
              <a href="/login">Create Account</a>
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600"><center>
            Already have an account?<a href="/login" className="text-teal-600 hover:underline"> Log in</a></center>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

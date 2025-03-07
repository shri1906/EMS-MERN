import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/ApiHelper.jsx";
import { FiMail, FiLock } from "react-icons/fi"; // Import Icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Logged in Successfully!");
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-600 from-50% to-gray-100 to-50% px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-md">
        <h2 className="font-anton text-2xl text-center text-gray-800 mb-6">
          Employee Management System
        </h2>
        <h3 className="text-xl font-semibold text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-500">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                className="w-full px-2 focus:outline-none"
                placeholder="Enter Email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-500">
              <FiLock className="text-gray-500" />
              <input
                type="password"
                className="w-full px-2 focus:outline-none"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-cyan-600" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-cyan-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

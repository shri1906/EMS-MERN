import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";
import { HiLockClosed, HiKey, HiCheckCircle } from "react-icons/hi"; // Importing Icons

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/setting/change-password`,
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        if (user.role === "employee") {
          navigate(`/employee-dashboard/profile/${user._id}`);
          return;
        }
        navigate(`/admin-dashboard`);
      }
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Old Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Old Password</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-500">
            <HiLockClosed className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-500">
            <HiKey className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-500">
            <HiCheckCircle className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;

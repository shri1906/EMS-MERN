import React, { useState } from "react";

const Setting = () => {
  const [error, setError] = useState("");
  const handleSubmit = () => {};
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        {/* Old Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="text"
            name="oldPassword"
            placeholder="Old Password"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* New Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="text"
            name="newPassword"
            placeholder="New Password"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4 mt-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2"
            >
              Change Password
            </button>
          </div>
      </form>
    </div>
  );
};

export default Setting;

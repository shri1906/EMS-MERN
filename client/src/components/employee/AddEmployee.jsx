import React from "react";

const AddEmployee = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter EMail"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Enter Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Date of Birth*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
           {/* Marital Status */}
           <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
            </select>
          </div>
          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="************"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload Image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              
            />
          </div>
        </div>
        <button 
        type="submit"
        className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
            Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

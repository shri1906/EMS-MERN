import React from "react";
import { Link } from "react-router-dom";

const LeaveList = () => {
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-1 border rounded"
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 text-white bg-teal-600 rounded"
        >
          Add Leave
        </Link>
      </div>
    </div>
  );
};

export default LeaveList;

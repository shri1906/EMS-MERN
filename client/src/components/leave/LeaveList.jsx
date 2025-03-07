import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  let sno = 1;
  const { id } = useParams();

  const fetchLeaves = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${BACKEND_URL}/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 mt-2 py-1 border rounded"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 text-white bg-cyan-600 rounded"
          >
            Add Leave
          </Link>
        )}
      </div>

      <div className="mt-4">
        {loading ? (
          <p className="text-center text-lg font-semibold">Loading...</p>
        ) : leaves.length === 0 ? (
          <p className="text-center text-lg font-semibold">No leaves found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="py-3">SNo</th>
                  <th className="py-3">Leave Type</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Applied Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, idx) => (
                  <tr key={idx} className="bg-white border-b">
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{leave.leaveType}</td>
                    <td className="px-6 py-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{leave.reason}</td>
                    <td className="px-6 py-3">
                      {new Date(leave.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveList;

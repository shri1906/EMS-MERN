import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const LeaveDetails = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.log(error.response?.data?.error);
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.response?.data?.error);
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/uploads/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-72 h-72"
                alt="profileImage"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium mt-0.5">
                  {leave.employeeId.userId.name}
                </p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium mt-0.5">
                  {leave.employeeId.employeeId}
                </p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="font-medium mt-0.5">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium mt-0.5">{leave.reason}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium mt-0.5">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium mt-0.5">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium mt-0.5">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white rounded px-2 hover:bg-green-600"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white rounded px-2 hover:bg-red-600"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium mt-0.5">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default LeaveDetails;

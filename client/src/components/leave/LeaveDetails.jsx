import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";

const LeaveDetails = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/leave/detail/${id}`,
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
        `${BACKEND_URL}/api/leave/${id}`,
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
        <div className="max-w-4xl mx-auto mt-10 mb-6 bg-white md:p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={`${BACKEND_URL}/uploads/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover"
                alt="profileImage"
              />
            </div>
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex space-x-3">
                <p className="font-bold">Name:</p>
                <p className="font-medium">
                  {leave.employeeId.userId.name}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Employee ID:</p>
                <p className="font-medium">
                  {leave.employeeId.employeeId}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Leave Type:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Department:</p>
                <p className="font-medium">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>

              <div className="flex space-x-3">
                <p className="font-bold">Start Date:</p>
                <p className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">End Date:</p>
                <p className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">
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
                  <p className="font-medium">{leave.status}</p>
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
